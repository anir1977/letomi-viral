#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..', '..');
const draftsDir = path.join(projectRoot, 'CONTENT', 'drafts');
const postsPath = path.join(projectRoot, 'lib', 'posts.ts');

const count = Math.max(1, Math.min(Number(process.argv[2] || 2), 3));

const TOPICS = [
  {
    title: 'Why Your Brain Loves Before and After Photos',
    category: 'psychology',
    focusKeyword: 'before and after photos psychology',
    angle: 'visual contrast gives the brain a fast story with a clear beginning and ending',
    image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1600&h=900&fit=crop&auto=format&q=80',
    imageAlt: 'Notebook and photo cards on a desk showing visual comparison',
    sources: [
      { title: 'Visual perception overview', url: 'https://www.ncbi.nlm.nih.gov/books/NBK92800/', publisher: 'NCBI Bookshelf' },
      { title: 'Memory and emotion research', url: 'https://www.apa.org/topics/memory', publisher: 'American Psychological Association' },
    ],
  },
  {
    title: 'Why Tiny Delays Make Apps Feel Slower Than They Are',
    category: 'technology',
    focusKeyword: 'why apps feel slow',
    angle: 'people judge digital speed through expectation, feedback, and perceived control',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&h=900&fit=crop&auto=format&q=80',
    imageAlt: 'Laptop screen with interface design work on a desk',
    sources: [
      { title: 'Response times: the 3 important limits', url: 'https://www.nngroup.com/articles/response-times-3-important-limits/', publisher: 'Nielsen Norman Group' },
      { title: 'Human-computer interaction overview', url: 'https://www.interaction-design.org/literature/topics/human-computer-interaction', publisher: 'Interaction Design Foundation' },
    ],
  },
  {
    title: 'Why You Notice Your Name in a Noisy Room',
    category: 'human-behavior',
    focusKeyword: 'cocktail party effect',
    angle: 'attention filters noise but keeps listening for personally important signals',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&h=900&fit=crop&auto=format&q=80',
    imageAlt: 'Group of people talking in a bright social setting',
    sources: [
      { title: 'Auditory attention research', url: 'https://www.ncbi.nlm.nih.gov/pmc/?term=cocktail+party+effect', publisher: 'National Institutes of Health' },
      { title: 'Attention overview', url: 'https://dictionary.apa.org/attention', publisher: 'American Psychological Association' },
    ],
  },
  {
    title: 'Why Short Walks Make Hard Problems Feel Easier',
    category: 'health',
    focusKeyword: 'walking and creative thinking',
    angle: 'movement changes attention, mood, and mental flexibility in small but useful ways',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1600&h=900&fit=crop&auto=format&q=80',
    imageAlt: 'Person walking on a quiet path during daylight',
    sources: [
      { title: 'Give your ideas some legs', url: 'https://news.stanford.edu/2014/04/24/walking-vs-sitting-042414/', publisher: 'Stanford News' },
      { title: 'Physical activity and health', url: 'https://www.cdc.gov/physical-activity-basics/benefits/', publisher: 'CDC' },
    ],
  },
  {
    title: 'Why Old Myths Survive Even After Being Corrected',
    category: 'history',
    focusKeyword: 'why myths survive',
    angle: 'familiar stories are easier to repeat than complicated corrections',
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1600&h=900&fit=crop&auto=format&q=80',
    imageAlt: 'Old books and documents arranged on a wooden table',
    sources: [
      { title: 'Illusory truth effect research', url: 'https://www.ncbi.nlm.nih.gov/pmc/?term=illusory+truth+effect', publisher: 'National Institutes of Health' },
      { title: 'Misinformation and memory', url: 'https://www.apa.org/topics/journalism-facts/misinformation', publisher: 'American Psychological Association' },
    ],
  },
];

function slugify(title) {
  return title
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function existingSlugs() {
  const slugs = new Set();
  if (fs.existsSync(postsPath)) {
    const postText = fs.readFileSync(postsPath, 'utf8');
    for (const match of postText.matchAll(/slug:\s*"([^"]+)"/g)) slugs.add(match[1]);
  }
  if (fs.existsSync(draftsDir)) {
    for (const file of fs.readdirSync(draftsDir).filter((item) => item.endsWith('.json'))) {
      const draft = JSON.parse(fs.readFileSync(path.join(draftsDir, file), 'utf8'));
      if (draft.slug) slugs.add(draft.slug);
    }
  }
  return slugs;
}

function words(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function readingTime(content) {
  return `${Math.max(4, Math.ceil(words(content) / 210))} min read`;
}

function buildContent(topic) {
  return [
    `${topic.title.replace(/\?$/, '')} is not just a small curiosity. ${topic.angle}. Once you notice that pattern, a lot of everyday behavior starts to make more sense.`,
    '',
    `The useful part is that this idea is easy to test in real life. You do not need a lab or a complicated theory. You only need to watch how attention changes when the brain receives a clear signal.`,
    '',
    '## The hidden trigger',
    '',
    `The main trigger behind ${topic.focusKeyword} is contrast. The mind pays attention when something changes, interrupts expectation, or creates a clean before-and-after feeling.`,
    '',
    'That is why ordinary information can become memorable when it is framed with a sharper comparison. The fact itself matters, but the shape of the explanation matters too.',
    '',
    '## Why the brain responds so quickly',
    '',
    'Your brain is constantly sorting information. Most details are ignored because they do not seem urgent, useful, or emotionally relevant. A strong cue breaks through that filter.',
    '',
    `In the case of ${topic.focusKeyword}, the cue feels useful because it reduces effort. Instead of slowly analyzing every detail, the brain can understand the situation through one simple pattern.`,
    '',
    '## A real-life example',
    '',
    'Imagine reading two explanations of the same idea. One gives a flat definition. The other starts with a moment you recognize from daily life, then explains what is happening underneath. The second version usually sticks because it gives your memory a place to attach the idea.',
    '',
    'That is also why good educational content often feels almost conversational. It does not throw facts at you. It builds a small bridge between what you already know and what you are about to learn.',
    '',
    '## What people often misunderstand',
    '',
    'The common mistake is assuming that attention means intelligence or willpower. In reality, attention is heavily shaped by design, timing, emotion, and context.',
    '',
    'If something feels easy to notice, it may simply have better cues. If something feels hard to remember, it may need a clearer structure rather than more repetition.',
    '',
    '## How to use this idea',
    '',
    'You can apply the same principle when learning, writing, teaching, or explaining a point to someone else:',
    '',
    '- Start with a concrete example before the abstract idea.',
    '- Use contrast to show why the idea matters.',
    '- Keep the explanation focused on one clear takeaway.',
    '- Add a short real-world scene so the reader can picture it.',
    '',
    '## Why it matters for everyday decisions',
    '',
    'Small attention patterns shape what people remember, share, and act on. A useful idea can disappear if it is presented poorly, while a modest fact can travel far when it is simple, surprising, and easy to retell.',
    '',
    'That does not mean we should exaggerate. The better lesson is to respect the reader. Clear writing helps good information survive.',
    '',
    '## Final thought',
    '',
    `${topic.title.replace(/\?$/, '')} because the brain is always looking for meaning with the least possible effort. When an idea has contrast, emotion, and a practical connection, it becomes easier to keep.`,
  ].join('\n');
}

function makeDraft(topic) {
  const content = buildContent(topic);
  const slug = slugify(topic.title);
  return {
    id: randomUUID(),
    title: topic.title,
    slug,
    category: topic.category,
    status: 'draft',
    seoTitle: `${topic.title} | CurioSpark`,
    metaDescription: `${topic.title.replace(/\?$/, '')}. A clear, human explanation of the psychology and science behind this everyday pattern.`,
    focusKeyword: topic.focusKeyword,
    excerpt: `A practical explanation of ${topic.focusKeyword}, why it happens, and how this small pattern shapes attention, memory, and daily choices.`,
    readingTime: readingTime(content),
    image: topic.image,
    imageAlt: topic.imageAlt,
    sources: topic.sources,
    content,
    faqs: [
      {
        question: `What is the simple idea behind ${topic.focusKeyword}?`,
        answer: `The simple idea is that ${topic.angle}.`,
      },
      {
        question: 'Why does this matter in daily life?',
        answer: 'Because small attention patterns influence what people remember, trust, and repeat.',
      },
      {
        question: 'Is this based on real research?',
        answer: 'Yes. The draft includes source links so the article can be checked before publishing.',
      },
    ],
    qualityNotes: [
      'Evergreen topic suitable for AdSense review.',
      'Avoids fake urgency, fake views, and unsupported claims.',
      'Needs human review before publishing.',
    ],
  };
}

fs.mkdirSync(draftsDir, { recursive: true });

const used = existingSlugs();
const selected = TOPICS.filter((topic) => !used.has(slugify(topic.title))).slice(0, count);

if (selected.length === 0) {
  console.log('No new draft topics available. Add more topics to scripts/drafts/generate-drafts.mjs.');
  process.exit(0);
}

for (const topic of selected) {
  const draft = makeDraft(topic);
  const filePath = path.join(draftsDir, `${draft.slug}.json`);
  fs.writeFileSync(filePath, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
  console.log(`Created draft: ${draft.title}`);
  console.log(`File: CONTENT/drafts/${draft.slug}.json`);
}
