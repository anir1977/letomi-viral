#!/usr/bin/env node

/**
 * Auto Social Media Script
 * Génère des posts prêts pour réseaux sociaux automatiquement
 * 
 * GRATUIT - Pas d'API payante
 * Compatible avec: Twitter/X, Facebook, LinkedIn, Pinterest
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://curiospark.org';

// Social media templates
const TEMPLATES = {
  twitter: (title, slug) => 
    `🧠 ${title}\n\n` +
    `Mind-blowing facts backed by science!\n\n` +
    `👉 ${SITE_URL}/post/${slug}\n\n` +
    `#Psychology #Science #DidYouKnow`,
  
  facebook: (title, excerpt, slug) =>
    `${title}\n\n` +
    `${excerpt}\n\n` +
    `Read the full article: ${SITE_URL}/post/${slug}\n\n` +
    `#CurioSpark #ScienceFacts #Learning`,
  
  linkedin: (title, excerpt, slug) =>
    `${title}\n\n` +
    `${excerpt}\n\n` +
    `Discover more fascinating insights: ${SITE_URL}/post/${slug}\n\n` +
    `#ProfessionalDevelopment #Psychology #Science`,
  
  pinterest: (title, slug) =>
    `${title} | CurioSpark\n\n` +
    `Fascinating science-backed facts that will change how you see the world!\n\n` +
    `${SITE_URL}/post/${slug}\n\n` +
    `#facts #science #psychology #learning`
};

// Get latest posts
function getLatestPosts() {
  const postsPath = path.join(__dirname, '../lib/posts.ts');
  const content = fs.readFileSync(postsPath, 'utf8');
  
  // Extract posts with regex (simple approach)
  const posts = [];
  const postRegex = /title:\s*"([^"]+)",[^]*?slug:\s*"([^"]+)",[^]*?excerpt:\s*"([^"]+)"/g;
  
  let match;
  while ((match = postRegex.exec(content)) !== null && posts.length < 5) {
    posts.push({
      title: match[1],
      slug: match[2],
      excerpt: match[3]
    });
  }
  
  return posts;
}

// Generate social posts
function generateSocialPosts() {
  const latestPosts = getLatestPosts();
  const outputDir = path.join(__dirname, '../social-posts');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const date = new Date().toISOString().split('T')[0];
  
  latestPosts.forEach((post, index) => {
    const filename = `${date}-post-${index + 1}.txt`;
    const filePath = path.join(outputDir, filename);
    
    const content = `
==============================================
ARTICLE: ${post.title}
==============================================

📱 TWITTER/X (280 chars):
${'-'.repeat(46)}
${TEMPLATES.twitter(post.title, post.slug)}

📘 FACEBOOK:
${'-'.repeat(46)}
${TEMPLATES.facebook(post.title, post.excerpt, post.slug)}

💼 LINKEDIN:
${'-'.repeat(46)}
${TEMPLATES.linkedin(post.title, post.excerpt, post.slug)}

📌 PINTEREST:
${'-'.repeat(46)}
${TEMPLATES.pinterest(post.title, post.slug)}

==============================================
IMAGE URL: ${SITE_URL}/og-default.svg
LINK: ${SITE_URL}/post/${post.slug}
==============================================
`;
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Generated: ${filename}`);
  });
  
  console.log(`\n🎯 ${latestPosts.length} social posts ready in: social-posts/`);
  console.log(`📋 Copy-paste these to your social media accounts!`);
}

// Run
try {
  console.log('🚀 Generating social media posts...\n');
  generateSocialPosts();
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
