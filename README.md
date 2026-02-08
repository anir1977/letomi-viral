# CurioSpark

A lightweight editorial content site built with Next.js 14, Tailwind CSS, and static JSON data.

## Features
- Editorial article pages with hero images, drop caps, and table of contents
- Responsive article index with image cards
- Static content sourced from local JSON and markdown/JSX
- SEO-friendly metadata and clean routing

## Quick Start
```bash
npm install
npm run dev
```

## Content Data
- Articles index: app/articles/articleIndex.json
- Long-form posts: lib/posts.ts

## Environment Variables
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your-unsplash-access-key
```

## Project Structure (Highlights)
```
/app
  /articles           # Article index + article pages
  /components         # Reusable UI components
  /post/[slug]        # Long-form post pages
  /category/[slug]    # Category pages

/lib
  articles.ts         # JSON-based article helpers
  posts.ts            # Static post data
  seo.ts              # SEO utilities
```

## Build
```bash
npm run build
npm run start
```
