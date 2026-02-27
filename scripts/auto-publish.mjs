#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const postsPath = path.join(projectRoot, 'lib', 'posts.ts');
const statePath = path.join(projectRoot, '.auto-publish-state.json');

function sanitizeOpenAIKey(rawValue) {
  const raw = String(rawValue || '').trim();
  if (!raw) return '';

  const withExportMatch = raw.match(/^export\s+OPENAI_API_KEY\s*=\s*(.+)$/i);
  const withoutExportMatch = raw.match(/^OPENAI_API_KEY\s*=\s*(.+)$/i);
  const candidate = withExportMatch
    ? withExportMatch[1].trim()
    : withoutExportMatch
      ? withoutExportMatch[1].trim()
      : raw;

  return candidate.replace(/^['"]|['"]$/g, '').trim();
}

const normalizedOpenAIKey = sanitizeOpenAIKey(process.env.OPENAI_API_KEY);

const CONFIG = {
  OPENAI_API_KEY: normalizedOpenAIKey,
  OPENAI_TEXT_MODEL: process.env.OPENAI_TEXT_MODEL || 'gpt-4o-mini',
  OPENAI_IMAGE_MODEL: process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1',
  AUTHOR_NAME: 'CurioSpark Team',
  MIN_WORDS: 1400,
  MAX_TITLE_LEN: 60,
  META_LEN: 150,
  VERBOSE: process.env.VERBOSE === 'true',
  MAX_GENERATION_RETRIES: 5,
  SAFE_PROMPT_MIN_WORDS: 1500,
  SAFE_PROMPT_MAX_WORDS: 1900,
  OPENAI_MAX_TOKENS: 4200,
};

const IMAGE_STYLES = ['photorealistic editorial photography', 'documentary realism', 'cinematic realistic photo'];

const VISUAL_CONTEXTS = [
  'golden-hour natural light',
  'soft indoor editorial lighting',
  'clean modern workspace background',
  'subtle documentary atmosphere',
  'high-contrast magazine look',
  'calm minimalist composition',
  'street-level candid perspective',
  'studio-style depth and texture',
];

const TOPIC_ANGLES = [
  { category: 'psychology', keyword: 'decision fatigue', angle: 'how small choices drain mental energy' },
  { category: 'science', keyword: 'circadian rhythm', angle: 'why timing changes biological performance' },
  { category: 'technology', keyword: 'attention economy', angle: 'how apps compete for focus and behavior' },
  { category: 'health', keyword: 'stress recovery', angle: 'why recovery windows matter more than intensity' },
  { category: 'business', keyword: 'deep work', angle: 'how fewer meetings increase quality output' },
  { category: 'history', keyword: 'historical myths', angle: 'what popular stories get wrong and why' },
  { category: 'nature', keyword: 'urban biodiversity', angle: 'how city ecosystems adapt and survive' },
  { category: 'human-behavior', keyword: 'social proof', angle: 'how group behavior influences personal choices' },
  { category: 'life-facts', keyword: 'daily habits', angle: 'micro-habits that quietly change long-term outcomes' },
  { category: 'space', keyword: 'orbital mechanics', angle: 'why simple gravity rules create complex motion' },
];

const CATEGORY_ROTATION = ['psychology', 'science', 'technology', 'health', 'history', 'nature', 'human-behavior', 'life-facts', 'space', 'business'];

const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✅ ${msg}`),
  warn: (msg) => console.warn(`⚠️  ${msg}`),
  error: (msg) => console.error(`❌ ${msg}`),
  debug: (msg) => CONFIG.VERBOSE && console.log(`🔍 ${msg}`),
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function normalizeDate(date = new Date()) {
  return date.toISOString().split('T')[0];
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 100);
}

function ensureUniqueSlug(baseSlug, existingSlugs) {
  if (!existingSlugs.has(baseSlug)) return baseSlug;

  let counter = 2;
  while (existingSlugs.has(`${baseSlug}-${counter}`)) {
    counter++;
  }
  return `${baseSlug}-${counter}`;
}

function mapTopicToCategory(topicCategory) {
  const normalized = String(topicCategory || '').toLowerCase().trim();

  const mapping = {
    history: 'science',
    psychology: 'human-behavior',
    'human-behavior': 'human-behavior',
    technology: 'technology',
    health: 'health',
    space: 'space',
    nature: 'nature',
    science: 'science',
    business: 'science',
    'life-facts': 'science',
  };

  return mapping[normalized] || 'science';
}

function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.max(4, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
}

function getRandomViews() {
  const views = ['1.2K', '2.5K', '3.8K', '5.1K', '7.3K', '9.2K', '12K', '15K'];
  return views[Math.floor(Math.random() * views.length)];
}

function ensureMetaLength(description) {
  const target = CONFIG.META_LEN;
  let meta = description.trim().replace(/\s+/g, ' ');

  if (meta.length > target) {
    const slice = meta.slice(0, target);
    const clean = slice.slice(0, slice.lastIndexOf(' '));
    meta = (clean || slice).trim();
  }

  if (meta.length < target) {
    const filler = ' Read practical, evidence-based takeaways now.';
    while (meta.length < target && filler.length > 0) {
      const missing = target - meta.length;
      meta += filler.slice(0, missing);
    }
  }

  if (meta.length > target) {
    meta = meta.slice(0, target);
  }

  return meta;
}

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function buildFaqMarkdown(faqs) {
  return [
    '## FAQ',
    '',
    ...faqs.flatMap((faq) => [`### ${faq.question}`, '', faq.answer, '']),
  ].join('\n');
}

function getExistingPostLinks(limit = 30) {
  const content = fs.readFileSync(postsPath, 'utf8');
  const regex = /title:\s*"([^"]+)"[\s\S]*?slug:\s*"([^"]+)"/g;
  const links = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    links.push({ title: match[1], slug: match[2] });
    if (links.length >= limit) break;
  }

  return links;
}

function pickInternalLinks(existingLinks, topicSlug) {
  const eligible = existingLinks.filter((item) => item.slug !== topicSlug);
  const shuffled = [...eligible].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 2);
}

function loadState() {
  if (!fs.existsSync(statePath)) {
    return { lastPublishedDate: null, nextPublishAt: null, lastCategoryIndex: -1 };
  }

  try {
    const parsed = JSON.parse(fs.readFileSync(statePath, 'utf8'));
    return {
      lastPublishedDate: parsed.lastPublishedDate || null,
      nextPublishAt: parsed.nextPublishAt || null,
      lastCategoryIndex: Number.isInteger(parsed.lastCategoryIndex) ? parsed.lastCategoryIndex : -1,
    };
  } catch {
    return { lastPublishedDate: null, nextPublishAt: null, lastCategoryIndex: -1 };
  }
}

function saveState(state) {
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2), 'utf8');
}

function computeNextPublishAt(fromDate = new Date()) {
  const next = new Date(fromDate);
  next.setUTCDate(next.getUTCDate() + 1);
  next.setUTCHours(randomInt(6, 22), randomInt(0, 59), 0, 0);
  return next.toISOString();
}

async function callOpenAIJson({ system, user }) {
  if (!CONFIG.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is missing');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CONFIG.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: CONFIG.OPENAI_TEXT_MODEL,
      temperature: 0.95,
      max_tokens: CONFIG.OPENAI_MAX_TOKENS,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    console.error('OPENAI FAILED:', message);
    throw new Error(`OpenAI text error ${response.status}: ${message}`);
  }

  const data = await response.json();
  const raw = data?.choices?.[0]?.message?.content;

  if (!raw) {
    throw new Error('OpenAI text response is empty');
  }

  return JSON.parse(raw);
}

async function generateImageFromOpenAI(prompt) {
  if (!CONFIG.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is missing');
  }

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CONFIG.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: CONFIG.OPENAI_IMAGE_MODEL,
      prompt,
      size: '1536x1024',
      quality: 'high',
      output_format: 'png',
      background: 'opaque',
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    console.error('OPENAI FAILED:', message);
    throw new Error(`OpenAI image error ${response.status}: ${message}`);
  }

  const data = await response.json();
  const b64 = data?.data?.[0]?.b64_json;

  if (!b64) {
    throw new Error('OpenAI image response is empty');
  }

  const slug = `auto-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.png`;
  const relPath = path.join('public', 'images', 'generated', slug);
  const absPath = path.join(projectRoot, relPath);

  fs.mkdirSync(path.dirname(absPath), { recursive: true });
  fs.writeFileSync(absPath, Buffer.from(b64, 'base64'));

  return `/images/generated/${slug}`;
}

async function generateArticleDraft(topic, internalLinks) {
  const styleVariant = randomPick(['narrative', 'analytical', 'story-led', 'myth-vs-fact']);
  const transitionCue = randomPick([
    'You might be surprised…',
    'Here’s the strange part…',
    'At first glance, this feels counterintuitive…',
    'Now here is where it gets practical…',
  ]);

  const linksPrompt = internalLinks
    .map((item) => `- ${item.title} -> /post/${item.slug}`)
    .join('\n');

  const schema = {
    title: 'string <= 60 chars',
    description: 'string exactly 150 chars',
    mainKeyword: 'string',
    secondaryKeywords: ['string', 'string', 'string'],
    intro: 'markdown paragraph(s) with human voice',
    sections: [
      { heading: 'H2 heading', body: 'markdown paragraph(s)' },
    ],
    realLifeExample: 'markdown paragraph(s)',
    scientificExplanation: 'markdown paragraph(s)',
    conclusion: 'markdown paragraph(s)',
    faqs: [{ question: 'string', answer: 'string' }],
    imagePrompt: 'string unique detailed image prompt based on topic, no artist names',
  };

  const system = [
    'You are a senior editorial writer for a science + curiosity blog.',
    'Write in natural, human tone with occasional first-person perspective.',
    'Prioritize originality, usefulness, and accuracy. Avoid robotic repetition.',
    'Return strict JSON only.',
  ].join(' ');

  const user = `Create ONE original long-form article draft in English.

Constraints:
- Topic category: ${topic.category}
- Main topic angle: ${topic.angle}
- Main keyword to include naturally: ${topic.keyword}
- Secondary keyword ideas should be relevant and natural.
- Title max ${CONFIG.MAX_TITLE_LEN} chars.
- Description exactly ${CONFIG.META_LEN} characters.
- Body target: ${CONFIG.SAFE_PROMPT_MIN_WORDS}-${CONFIG.SAFE_PROMPT_MAX_WORDS} words.
- Use this style variation: ${styleVariant}
- Include at least one rhetorical question and soft transitions.
- Include this casual phrase somewhere naturally: "${transitionCue}"
- Writing style must feel clearly human: varied sentence rhythm, natural transitions, specific examples, and no repetitive template tone.
- Structure is REQUIRED and must include all of these:
  1) Intro with natural human hook
  2) At least 3 H2 sections
  3) Real-world example section
  4) Scientific explanation section
  5) FAQ section with 2-3 questions
  6) Conclusion section
- Build sections with short/medium varied paragraph lengths.
- FAQ must include 2 to 3 entries.
- Add 2 to 4 internal backlinks using markdown links from this list:
${linksPrompt || '- (no links available)'}
- Do NOT mention AI, prompts, automation, or SEO in the body.
- Do NOT use this phrase: "In this article we will explore".
- Do NOT use identical intro or conclusion patterns from generic templates.

Return JSON schema:
${JSON.stringify(schema, null, 2)}`;

  return callOpenAIJson({ system, user });
}

function validateDraft(draft) {
  const required = ['title', 'description', 'intro', 'sections', 'realLifeExample', 'scientificExplanation', 'conclusion', 'faqs', 'imagePrompt'];
  for (const key of required) {
    if (!draft[key]) {
      throw new Error(`Generated draft is missing: ${key}`);
    }
  }

  if (!Array.isArray(draft.sections) || draft.sections.length < 3) {
    throw new Error('Generated draft has too few sections');
  }

  if (!Array.isArray(draft.faqs) || draft.faqs.length < 2 || draft.faqs.length > 3) {
    throw new Error('Generated draft has invalid FAQ count');
  }
}

function composeContent({ draft, imageUrl }) {
  const intro = draft.intro.trim();
  const sections = draft.sections
    .map((section) => `## ${section.heading.trim()}\n\n${section.body.trim()}`)
    .join('\n\n');

  const faqMarkdown = buildFaqMarkdown(draft.faqs.slice(0, 3));

  const allText = [intro, sections, draft.realLifeExample, draft.scientificExplanation, draft.conclusion].join('\n').toLowerCase();
  if (allText.includes('in this article we will explore')) {
    throw new Error('Generated draft contains banned generic phrasing');
  }

  return [
    intro,
    '',
    `![${draft.title}](${imageUrl})`,
    '',
    sections,
    '',
    '## Real-Life Example',
    '',
    draft.realLifeExample.trim(),
    '',
    '## Scientific Explanation',
    '',
    draft.scientificExplanation.trim(),
    '',
    faqMarkdown,
    '',
    '## Final Thoughts',
    '',
    draft.conclusion.trim(),
  ].join('\n');
}

function isValidStructure(draft) {
  try {
    validateDraft(draft);
    return true;
  } catch {
    return false;
  }
}

function findAppendPosition(postsContent) {
  const exportMarker = 'export const posts: Post[] = [';
  const postsStart = postsContent.indexOf(exportMarker);
  if (postsStart === -1) {
    throw new Error('Could not locate posts array export in lib/posts.ts');
  }

  const endToken = '\n];';
  const idx = postsContent.indexOf(endToken, postsStart);
  if (idx === -1) {
    throw new Error('Could not locate posts array closing in lib/posts.ts');
  }

  return idx;
}

function updatePostsFile(newPost) {
  if (!fs.existsSync(postsPath)) {
    throw new Error(`posts.ts not found at: ${postsPath}`);
  }

  const content = fs.readFileSync(postsPath, 'utf8');

  const escapedSlug = newPost.slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const slugPattern = new RegExp(`slug:\\s*"${escapedSlug}"`);
  if (slugPattern.test(content)) {
    log.warn(`Article already exists (slug): ${newPost.slug}`);
    return false;
  }

  const insertAt = findAppendPosition(content);

  const postObject = `  {\n    id: "${newPost.id}",\n    title: ${JSON.stringify(newPost.title)},\n    slug: "${newPost.slug}",\n    category: "${newPost.category}",\n    description: ${JSON.stringify(newPost.description)},\n    keywords: ${JSON.stringify(newPost.keywords)},\n    author: ${JSON.stringify(newPost.author)},\n    excerpt: ${JSON.stringify(newPost.excerpt)},\n    content: ${JSON.stringify(newPost.content)},\n    readingTime: "${newPost.readingTime}",\n    views: "${newPost.views}",\n    date: "${newPost.date}",\n    image: "${newPost.image}",\n    imageAlt: ${JSON.stringify(newPost.imageAlt)},\n    heroImage: "${newPost.heroImage}",\n    faqs: ${JSON.stringify(newPost.faqs)},\n    isTrending: true,\n  },\n\n`;

  const updated = content.slice(0, insertAt) + '\n' + postObject + content.slice(insertAt);
  fs.writeFileSync(postsPath, updated, 'utf8');
  return true;
}

function extractExcerpt(content) {
  const lines = content.split('\n').filter((line) => line.trim() && !line.startsWith('#') && !line.startsWith('!['));
  const excerpt = lines.slice(0, 2).join(' ').trim();
  return excerpt.length > 200 ? `${excerpt.slice(0, 197)}...` : excerpt;
}

function chooseTodayTopic(today, usedSlugs) {
  const daySeed = new Date(today).getDate();
  const pool = [...TOPIC_ANGLES].sort((a, b) => (a.keyword > b.keyword ? 1 : -1));

  for (let i = 0; i < pool.length; i += 1) {
    const topic = pool[(daySeed + i) % pool.length];
    const candidateSlug = generateSlug(`${topic.keyword}-${topic.angle}`);
    if (!usedSlugs.has(candidateSlug)) {
      return topic;
    }
  }

  return randomPick(TOPIC_ANGLES);
}

function chooseRotatingTopic(state, usedSlugs) {
  const currentIndex = Number.isInteger(state.lastCategoryIndex) ? state.lastCategoryIndex : -1;

  for (let i = 1; i <= CATEGORY_ROTATION.length; i += 1) {
    const index = (currentIndex + i) % CATEGORY_ROTATION.length;
    const wantedCategory = CATEGORY_ROTATION[index];
    const candidates = TOPIC_ANGLES.filter((topic) => topic.category === wantedCategory);
    if (candidates.length === 0) continue;

    for (const topic of candidates) {
      const candidateSlug = generateSlug(`${topic.keyword}-${topic.angle}`);
      if (!usedSlugs.has(candidateSlug)) {
        return { topic, categoryIndex: index };
      }
    }

    return { topic: randomPick(candidates), categoryIndex: index };
  }

  return { topic: chooseTodayTopic(normalizeDate(), usedSlugs), categoryIndex: currentIndex };
}

function getExistingSlugs() {
  const content = fs.readFileSync(postsPath, 'utf8');
  const regex = /slug:\s*"([^"]+)"/g;
  const set = new Set();
  let match;

  while ((match = regex.exec(content)) !== null) {
    set.add(match[1]);
  }

  return set;
}

async function main() {
  try {
    if (!CONFIG.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is required to generate text and images.');
    }

    const today = normalizeDate();
    const state = loadState();

    const nowIso = new Date().toISOString();
    if (state.nextPublishAt && nowIso < state.nextPublishAt) {
      log.info(`Not publish window yet. Next publish at ${state.nextPublishAt}`);
      process.exit(0);
    }

    if (state.lastPublishedDate === today) {
      log.info(`Already published today (${today}). Skipping.`);
      process.exit(0);
    }

    const existingLinks = getExistingPostLinks();
    const existingSlugs = getExistingSlugs();

    const selection = chooseRotatingTopic(state, existingSlugs);
    const topic = selection.topic;
    console.log('selected topic:', `${topic.keyword} (${topic.category})`);

    const internalLinks = pickInternalLinks(existingLinks, generateSlug(topic.keyword));

    const humanDelayMs = randomInt(1000, 4000);
    log.info(`Waiting ${humanDelayMs}ms before generation...`);
    await sleep(humanDelayMs);

    let selectedDraft = null;
    let selectedWordCount = 0;
    let lastError = null;
    let bestFallback = null;

    for (let attempt = 1; attempt <= CONFIG.MAX_GENERATION_RETRIES; attempt += 1) {
      try {
        console.log('generating article');
        const draft = await generateArticleDraft(topic, internalLinks);

        if (!isValidStructure(draft)) {
          throw new Error('Generated draft has missing required sections');
        }

        const previewContent = composeContent({ draft, imageUrl: '/images/generated/preview-placeholder.png' });
        const wordCount = countWords(previewContent);

        if (!bestFallback || wordCount > bestFallback.wordCount) {
          bestFallback = { draft, wordCount };
        }

        if (wordCount >= CONFIG.MIN_WORDS) {
          selectedDraft = draft;
          selectedWordCount = wordCount;
          break;
        }

        lastError = new Error(`Generated article is too short (${wordCount} words).`);
      } catch (error) {
        lastError = error;
      }

      if (attempt < CONFIG.MAX_GENERATION_RETRIES) {
        console.log(`RETRYING GENERATION (attempt ${attempt + 1})`);
        await sleep(randomInt(1000, 4000));
      }
    }

    if (!selectedDraft && bestFallback) {
      selectedDraft = bestFallback.draft;
      selectedWordCount = bestFallback.wordCount;
      log.warn(`All retries completed below target. Using longest version (${selectedWordCount} words).`);
    }

    if (!selectedDraft) {
      throw new Error(lastError instanceof Error ? lastError.message : 'Failed to generate article after retries');
    }

    const title = selectedDraft.title.trim().slice(0, CONFIG.MAX_TITLE_LEN);
    let slug = generateSlug(title);
    slug = ensureUniqueSlug(slug, existingSlugs);

    const imageStyle = randomPick(IMAGE_STYLES);
    const visualContext = randomPick(VISUAL_CONTEXTS);
    const imagePrompt = `${selectedDraft.imagePrompt.trim()}. Style: ${imageStyle}. Context: ${visualContext}. Unique composition variant ${Date.now()}-${Math.random().toString(36).slice(2, 7)}. Editorial quality, no text overlay.`;
    console.log('generating image');
    const imageUrl = await generateImageFromOpenAI(imagePrompt);

    const content = composeContent({ draft: selectedDraft, imageUrl });
    const finalWordCount = countWords(content);
    selectedWordCount = finalWordCount;

    if (finalWordCount < CONFIG.MIN_WORDS) {
      log.warn(`Generated article is below target (${finalWordCount} words < ${CONFIG.MIN_WORDS}). Proceeding with publish.`);
    }

    const description = ensureMetaLength(selectedDraft.description.trim());
    const keywords = Array.isArray(selectedDraft.secondaryKeywords)
      ? [selectedDraft.mainKeyword, ...selectedDraft.secondaryKeywords].filter(Boolean).slice(0, 8)
      : [selectedDraft.mainKeyword].filter(Boolean);

    const newPost = {
      id: randomUUID(),
      title,
      slug,
      category: mapTopicToCategory(topic.category),
      description,
      keywords,
      author: CONFIG.AUTHOR_NAME,
      excerpt: extractExcerpt(content),
      content,
      readingTime: calculateReadingTime(content),
      views: getRandomViews(),
      date: today,
      image: imageUrl,
      imageAlt: `Illustration for: ${title}`,
      heroImage: imageUrl,
      faqs: selectedDraft.faqs.slice(0, 3),
    };

    const writeDelayMs = randomInt(1000, 4000);
    log.info(`Waiting ${writeDelayMs}ms before publishing...`);
    await sleep(writeDelayMs);

    console.log('writing posts.ts');
    const inserted = updatePostsFile(newPost);
    if (!inserted) {
      log.warn('No article inserted.');
      process.exit(0);
    }

    saveState({
      lastPublishedDate: today,
      nextPublishAt: computeNextPublishAt(new Date()),
      lastCategoryIndex: selection.categoryIndex,
    });

    log.success(`Published 1 article: ${title}`);
    log.info(`Slug: ${slug}`);
    log.info(`Words: ${selectedWordCount}`);
    log.info(`Image style: ${imageStyle}`);
    console.log(`FINAL WORD COUNT: ${selectedWordCount}`);
    console.log('ARTICLE ACCEPTED');
    console.log('completed');
    console.log('ARTICLE CREATED:', slug);
    process.exit(0);
  } catch (error) {
    log.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();
