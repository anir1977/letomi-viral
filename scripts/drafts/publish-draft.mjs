#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..', '..');
const draftsDir = path.join(projectRoot, 'CONTENT', 'drafts');
const publishedDir = path.join(projectRoot, 'CONTENT', 'published');
const postsPath = path.join(projectRoot, 'lib', 'posts.ts');
const slug = process.argv[2];

if (!slug) {
  console.error('Usage: npm run drafts:publish -- article-slug');
  process.exit(1);
}

const draftPath = path.join(draftsDir, `${slug}.json`);
if (!fs.existsSync(draftPath)) {
  console.error(`Draft not found: CONTENT/drafts/${slug}.json`);
  process.exit(1);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function findAppendPosition(postsContent) {
  const exportMarker = 'export const posts: Post[] = [';
  const postsStart = postsContent.indexOf(exportMarker);
  if (postsStart === -1) throw new Error('Could not locate posts array in lib/posts.ts');
  const idx = postsContent.indexOf('\n];', postsStart);
  if (idx === -1) throw new Error('Could not locate posts array closing in lib/posts.ts');
  return idx;
}

const draft = JSON.parse(fs.readFileSync(draftPath, 'utf8'));
const postsText = fs.readFileSync(postsPath, 'utf8');

if (new RegExp(`slug:\\s*"${draft.slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(postsText)) {
  console.error(`Post already exists: ${draft.slug}`);
  process.exit(1);
}

const post = {
  id: draft.id,
  title: draft.title,
  slug: draft.slug,
  category: draft.category,
  description: draft.metaDescription,
  keywords: [draft.focusKeyword, `${draft.category} facts`, 'curiosity', 'science explained'],
  author: 'CurioSpark Team',
  excerpt: draft.excerpt,
  content: draft.content,
  readingTime: draft.readingTime,
  views: '0',
  date: today(),
  image: draft.image,
  imageAlt: draft.imageAlt,
  heroImage: draft.image,
  faqs: draft.faqs || [],
  sources: draft.sources || [],
  lastUpdated: today(),
};

const postObject = `  {\n    id: ${JSON.stringify(post.id)},\n    title: ${JSON.stringify(post.title)},\n    slug: ${JSON.stringify(post.slug)},\n    category: ${JSON.stringify(post.category)},\n    description: ${JSON.stringify(post.description)},\n    keywords: ${JSON.stringify(post.keywords)},\n    author: ${JSON.stringify(post.author)},\n    excerpt: ${JSON.stringify(post.excerpt)},\n    content: ${JSON.stringify(post.content)},\n    readingTime: ${JSON.stringify(post.readingTime)},\n    views: ${JSON.stringify(post.views)},\n    date: ${JSON.stringify(post.date)},\n    image: ${JSON.stringify(post.image)},\n    imageAlt: ${JSON.stringify(post.imageAlt)},\n    heroImage: ${JSON.stringify(post.heroImage)},\n    faqs: ${JSON.stringify(post.faqs)},\n    sources: ${JSON.stringify(post.sources)},\n    lastUpdated: ${JSON.stringify(post.lastUpdated)},\n  },\n\n`;

const insertAt = findAppendPosition(postsText);
fs.writeFileSync(postsPath, `${postsText.slice(0, insertAt)}\n${postObject}${postsText.slice(insertAt)}`, 'utf8');

fs.mkdirSync(publishedDir, { recursive: true });
fs.renameSync(draftPath, path.join(publishedDir, `${slug}.json`));

console.log(`Published draft: ${post.title}`);
console.log(`URL: /post/${post.slug}`);
