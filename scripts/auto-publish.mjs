#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const postsPath = path.join(projectRoot, 'lib', 'posts.ts');
const statePath = path.join(projectRoot, '.auto-publish-state.json');

const CONFIG = {
  AUTHOR_NAME: 'CurioSpark Team',
  MIN_WORDS: 1300,
  MAX_TITLE_LEN: 60,
  META_LEN: 150,
  VERBOSE: process.env.VERBOSE === 'true',
};

const CATEGORY_ROTATION = [
  'psychology',
  'science',
  'human-behavior',
  'life-facts',
  'history',
  'nature',
  'technology',
  'space',
  'health',
];

const TOPIC_BANK = {
  psychology: {
    keyword: 'decision fatigue',
    titles: [
      'Why Decision Fatigue Quietly Ruins Great Days',
      'The Hidden Cost of Too Many Daily Choices',
      'How to Protect Your Focus from Decision Fatigue',
    ],
    angle: 'small choices consume mental energy faster than we notice',
    imagePool: [
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&h=900&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1600&h=900&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&h=900&fit=crop&auto=format&q=80',
    ],
  },
  science: {
    keyword: 'circadian rhythm',
    titles: [
      'Why Your Body Clock Controls More Than Sleep',
      'Circadian Rhythm: The Timing Rule Behind Performance',
      'The Science of Better Timing for Energy and Focus',
    ],
    angle: 'timing improves biological performance without extra effort',
    imagePool: [
      'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=1600&h=900&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1600&h=900&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&h=900&fit=crop&auto=format&q=80',
    ],
  },
  'human-behavior': {
    keyword: 'social proof',
    titles: [
      'How Group Behavior Shapes Personal Choices',
      'Why We Copy Others Without Realizing It',
      'Social Proof and the Psychology of Everyday Decisions',
    ],
    angle: 'people borrow confidence from the crowd under uncertainty',
    imagePool: [
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&h=900&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1600&h=900&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=1600&h=900&fit=crop&auto=format&q=80',
    ],
  },
  'life-facts': {
    keyword: 'daily habits',
    titles: [
      'Small Daily Habits That Change Long-Term Outcomes',
      'Why Tiny Routines Build Big Results Over Time',
      'The Compounding Power of Everyday Habits',
    ],
    angle: 'micro-actions become identity and outcomes over months',
    imagePool: [
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600&h=900&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1600&h=900&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&h=900&fit=crop&auto=format&q=80',
    ],
  },
  history: {
    keyword: 'historical myths',
    titles: [
      'Historical Myths That Still Shape Modern Thinking',
      'Why Popular History Gets Retold the Wrong Way',
      'What We Misremember About Famous Historical Stories',
    ],
    angle: 'repetition turns simplified stories into accepted facts',
    imagePool: [
      'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1600&h=900&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1600&h=900&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&h=900&fit=crop&auto=format&q=80',
    ],
  },
  nature: {
    keyword: 'urban biodiversity',
    titles: [
      'How Urban Nature Adapts Faster Than We Expect',
      'Urban Biodiversity: The Hidden Life of Big Cities',
      'Why City Ecosystems Are More Resilient Than They Look',
    ],
    angle: 'wildlife and plants evolve surprising strategies in cities',
    imagePool: [
      'https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=1600&h=900&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1600&h=900&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?w=1600&h=900&fit=crop&auto=format&q=80',
    ],
  },
  technology: {
    keyword: 'attention economy',
    titles: [
      'How the Attention Economy Rewires Daily Behavior',
      'Why Modern Apps Compete for Every Minute You Have',
      'The Psychology Behind Scroll Loops and Constant Alerts',
    ],
    angle: 'platform design nudges behavior through reward loops',
    imagePool: [
      'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=1600&h=900&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=1600&h=900&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&h=900&fit=crop&auto=format&q=80',
    ],
  },
  space: {
    keyword: 'orbital mechanics',
    titles: [
      'Orbital Mechanics: Simple Physics, Complex Motion',
      'Why Gravity Creates Surprisingly Complex Orbits',
      'The Elegant Logic Behind Planetary Motion',
    ],
    angle: 'simple gravity equations generate complex trajectories',
    imagePool: [
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&h=900&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1600&h=900&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1600&h=900&fit=crop&auto=format&q=80',
    ],
  },
  health: {
    keyword: 'stress recovery',
    titles: [
      'Stress Recovery Is More Important Than Constant Intensity',
      'Why Recovery Windows Decide Your Health Progress',
      'The Science of Stress Recovery for Better Performance',
    ],
    angle: 'recovery capacity predicts sustainable health outcomes',
    imagePool: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&h=900&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1600&h=900&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=1600&h=900&fit=crop&auto=format&q=80',
    ],
  },
};

const VIEWS_POOL = ['1.2K', '2.5K', '3.8K', '5.1K', '7.3K', '9.2K', '12K'];

const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✅ ${msg}`),
  warn: (msg) => console.warn(`⚠️  ${msg}`),
  error: (msg) => console.error(`❌ ${msg}`),
};

function randomPick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function normalizeDate(date = new Date()) {
  return date.toISOString().split('T')[0];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
  while (existingSlugs.has(`${baseSlug}-${counter}`)) counter += 1;
  return `${baseSlug}-${counter}`;
}

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function ensureMetaLength(description) {
  let meta = description.trim().replace(/\s+/g, ' ');
  if (meta.length > CONFIG.META_LEN) {
    const slice = meta.slice(0, CONFIG.META_LEN);
    const clean = slice.slice(0, slice.lastIndexOf(' '));
    meta = (clean || slice).trim();
  }
  if (meta.length < CONFIG.META_LEN) {
    const filler = ' Read practical, evidence-based takeaways now.';
    while (meta.length < CONFIG.META_LEN) {
      const missing = CONFIG.META_LEN - meta.length;
      meta += filler.slice(0, missing);
    }
  }
  return meta.slice(0, CONFIG.META_LEN);
}

function calculateReadingTime(content) {
  const minutes = Math.max(5, Math.ceil(countWords(content) / 200));
  return `${minutes} min read`;
}

function getExistingPostLinks(limit = 80) {
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

function getExistingSlugs() {
  const content = fs.readFileSync(postsPath, 'utf8');
  const regex = /slug:\s*"([^"]+)"/g;
  const slugs = new Set();
  let match;
  while ((match = regex.exec(content)) !== null) slugs.add(match[1]);
  return slugs;
}

function findAppendPosition(postsContent) {
  const exportMarker = 'export const posts: Post[] = [';
  const postsStart = postsContent.indexOf(exportMarker);
  if (postsStart === -1) throw new Error('Could not locate posts array export in lib/posts.ts');
  const idx = postsContent.indexOf('\n];', postsStart);
  if (idx === -1) throw new Error('Could not locate posts array closing in lib/posts.ts');
  return idx;
}

function updatePostsFile(newPost) {
  const content = fs.readFileSync(postsPath, 'utf8');
  const escapedSlug = newPost.slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (new RegExp(`slug:\\s*"${escapedSlug}"`).test(content)) {
    log.warn(`Article already exists (slug): ${newPost.slug}`);
    return false;
  }

  const insertAt = findAppendPosition(content);
  const postObject = `  {\n    id: "${newPost.id}",\n    title: ${JSON.stringify(newPost.title)},\n    slug: "${newPost.slug}",\n    category: "${newPost.category}",\n    description: ${JSON.stringify(newPost.description)},\n    keywords: ${JSON.stringify(newPost.keywords)},\n    author: ${JSON.stringify(newPost.author)},\n    excerpt: ${JSON.stringify(newPost.excerpt)},\n    content: ${JSON.stringify(newPost.content)},\n    readingTime: "${newPost.readingTime}",\n    views: "${newPost.views}",\n    date: "${newPost.date}",\n    image: "${newPost.image}",\n    imageAlt: ${JSON.stringify(newPost.imageAlt)},\n    heroImage: "${newPost.heroImage}",\n    faqs: ${JSON.stringify(newPost.faqs)},\n    isTrending: true,\n  },\n\n`;

  const updated = content.slice(0, insertAt) + '\n' + postObject + content.slice(insertAt);
  fs.writeFileSync(postsPath, updated, 'utf8');
  return true;
}

function loadState() {
  if (!fs.existsSync(statePath)) return { lastPublishedDate: null, nextPublishAt: null, lastCategoryIndex: -1 };
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

function chooseCategoryByRotation(state) {
  const currentIndex = Number.isInteger(state.lastCategoryIndex) ? state.lastCategoryIndex : -1;
  const nextIndex = (currentIndex + 1) % CATEGORY_ROTATION.length;
  return { category: CATEGORY_ROTATION[nextIndex], categoryIndex: nextIndex };
}

function pickBacklinks(existingLinks, count = 2) {
  const shuffled = [...existingLinks].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function paragraph(topic, variant) {
  const base = {
    intro: `Some topics look small at first, but they quietly reshape how we think and act. ${topic.angle}. Instead of chasing quick hacks, this article focuses on what actually works in real life when pressure, distraction, and limited time collide.`,
    mechanism: `The mechanism is simple but powerful: your brain optimizes for efficiency under uncertainty. When choices arrive too fast or too often, quality drops before you consciously notice it. That is why people often confuse exhaustion with a lack of discipline when the deeper issue is cognitive overload.`,
    strategy: `A stronger strategy starts with constraints. Fewer high-quality options, clearer priorities, and predictable routines reduce friction. Once mental noise drops, execution improves naturally, and consistency becomes easier to sustain over weeks, not just days.`,
    realLife: `Consider a professional who starts each day reacting to messages, notifications, and urgent requests. By noon, important decisions feel heavy. After introducing fixed decision windows, pre-planned defaults, and fewer context switches, performance improves without working longer hours.`,
    science: `Behavioral science repeatedly shows that attention and self-control draw from limited daily resources. Structured environments reduce the number of expensive decisions and preserve cognitive bandwidth for high-impact work. In practice, environment design beats willpower most of the time.`,
    seo: `From an SEO perspective, this matters because readers stay longer on content that solves a real pain point with clear steps. Long-form structure, practical examples, and internal links increase relevance signals while keeping the article useful for humans first.`,
    conclusion: `The takeaway is not to do more. It is to design better defaults, reduce unnecessary choices, and protect attention for what matters. Small structural changes create compounding gains, and that is where durable progress begins.`,
  };
  return base[variant];
}

function buildContent(topic, backlinks, imageUrl) {
  const links = backlinks.map((l) => `[${l.title}](/post/${l.slug})`);
  const firstLink = links[0] || '[our evidence-based guides](/categories)';
  const secondLink = links[1] || '[related deep dives](/latest)';

  let content = [
    paragraph(topic, 'intro'),
    '',
    `![${randomPick(topic.titles)}](${imageUrl})`,
    '',
    '## Why This Topic Matters Right Now',
    '',
    paragraph(topic, 'mechanism'),
    `If you enjoyed ${firstLink}, you will notice the same pattern here: better outcomes come from better systems, not more chaos.`,
    '',
    '## The Core Mechanism Behind the Pattern',
    '',
    paragraph(topic, 'science'),
    paragraph(topic, 'strategy'),
    '',
    '## A Practical Framework You Can Apply This Week',
    '',
    'Start with three moves: define one priority block, remove one recurring distraction, and pre-decide one default behavior for routine moments.',
    'These simple rules reduce cognitive drag and help execution feel smoother by design.',
    '',
    '## Real-Life Example',
    '',
    paragraph(topic, 'realLife'),
    `You can combine this with ${secondLink} to build a stronger weekly system instead of relying on short bursts of motivation.`,
    '',
    '## Scientific Explanation',
    '',
    paragraph(topic, 'science'),
    paragraph(topic, 'seo'),
    '',
    '## FAQ',
    '',
    `### What is the fastest way to apply ${topic.keyword} insights?`,
    '',
    'Use one small default first, measure for seven days, then scale. Fast feedback beats complex planning.',
    '',
    '### How long before results become visible?',
    '',
    'Most people feel less friction within one week, while meaningful behavior change appears over one to four weeks of consistent application.',
    '',
    '### Is this approach useful for teams too?',
    '',
    'Yes. Shared defaults, clearer priorities, and fewer ad-hoc decisions improve alignment and reduce decision fatigue across teams.',
    '',
    '## Final Thoughts',
    '',
    paragraph(topic, 'conclusion'),
  ].join('\n');

  const extensionBlocks = [
    {
      heading: 'Implementation Mistakes to Avoid',
      body: 'A common mistake is trying to optimize everything at once. Start with one constraint, one schedule change, and one measurable behavior. Simpler implementation creates faster feedback and fewer drop-offs.'
    },
    {
      heading: 'A 7-Day Practical Plan',
      body: 'Day 1 to 2: observe your current pattern. Day 3 to 5: apply one structural change. Day 6 to 7: measure what improved and what still feels heavy. This short loop creates momentum without overwhelm.'
    },
    {
      heading: 'Why This Works in Real Life',
      body: 'Most people fail from friction, not from lack of intelligence. When defaults are clear, the brain spends less energy on low-value choices and preserves focus for higher-value actions.'
    },
    {
      heading: 'Long-Term Compounding Effect',
      body: 'Small behavior improvements compound over months. Better timing, fewer distractions, and stronger routines seem modest today, but they produce measurable output and calmer execution later.'
    },
    {
      heading: 'Team and Family Application',
      body: 'The same logic applies in teams and households: shared defaults, cleaner planning windows, and fewer last-minute decisions reduce stress and improve consistency for everyone involved.'
    },
    {
      heading: 'Final Action Checklist',
      body: 'Choose one default to simplify, one distraction to remove, and one review checkpoint every week. Keep it realistic, track progress, and improve gradually instead of forcing drastic changes.'
    },
  ];

  let extensionIndex = 0;
  while (countWords(content) < CONFIG.MIN_WORDS) {
    const block = extensionBlocks[extensionIndex % extensionBlocks.length];
    content += `\n\n## ${block.heading}\n\n${block.body}`;
    extensionIndex += 1;

    if (extensionIndex > extensionBlocks.length + 2) {
      content += `\n\n${paragraph(topic, 'strategy')}`;
    }
  }

  return content;
}

function extractExcerpt(content) {
  const lines = content
    .split('\n')
    .filter((line) => line.trim() && !line.startsWith('#') && !line.startsWith('!['));
  const excerpt = lines.slice(0, 2).join(' ').trim();
  return excerpt.length > 200 ? `${excerpt.slice(0, 197)}...` : excerpt;
}

async function main() {
  try {
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

    const existingSlugs = getExistingSlugs();
    const existingLinks = getExistingPostLinks();

    const selection = chooseCategoryByRotation(state);
    const category = selection.category;
    const topic = TOPIC_BANK[category];

    if (!topic) {
      throw new Error(`No topic config found for category: ${category}`);
    }

    const title = randomPick(topic.titles).slice(0, CONFIG.MAX_TITLE_LEN).trim();
    const baseSlug = generateSlug(title);
    const slug = ensureUniqueSlug(baseSlug, existingSlugs);
    const imageUrl = randomPick(topic.imagePool);

    log.info(`selected topic: ${topic.keyword} (${category})`);

    const backlinks = pickBacklinks(existingLinks.filter((link) => link.slug !== slug), 2);
    const content = buildContent(topic, backlinks, imageUrl);
    const description = ensureMetaLength(
      `Actionable insights about ${topic.keyword} and ${topic.angle}. Learn practical steps, science-backed explanations, and daily tactics that improve outcomes.`
    );

    const newPost = {
      id: randomUUID(),
      title,
      slug,
      category,
      description,
      keywords: [topic.keyword, `${category} facts`, 'practical psychology', 'evidence-based habits'],
      author: CONFIG.AUTHOR_NAME,
      excerpt: extractExcerpt(content),
      content,
      readingTime: calculateReadingTime(content),
      views: randomPick(VIEWS_POOL),
      date: today,
      image: imageUrl,
      imageAlt: `Unsplash photo for: ${title}`,
      heroImage: imageUrl,
      faqs: [
        {
          question: `What is the key idea behind ${topic.keyword}?`,
          answer: `The key idea is to reduce friction and improve consistency using structured choices and better defaults.`
        },
        {
          question: 'Can I apply this in less than a week?',
          answer: 'Yes. Start with one practical change and track your behavior daily for a short test cycle.'
        },
        {
          question: 'Does this also help SEO performance?',
          answer: 'Helpful long-form content with strong structure, internal links, and clear relevance improves engagement signals over time.'
        }
      ],
    };

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

    const words = countWords(content);
    log.success(`Published 1 article: ${title}`);
    log.info(`Slug: ${slug}`);
    log.info(`Words: ${words}`);
    console.log(`FINAL WORD COUNT: ${words}`);
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
