#!/usr/bin/env node

/**
 * Reddit/Forum Content Generator
 * Génère des posts optimisés pour Reddit, forums, et communautés
 * 
 * MANUEL - Copy/paste dans les subreddits appropriés
 * Build karma first, then share naturally!
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://curiospark.org';

// Reddit-friendly subreddits for your content
const TARGET_SUBREDDITS = [
  { name: 'r/psychology', minKarma: 50 },
  { name: 'r/science', minKarma: 100 },
  { name: 'r/todayilearned', minKarma: 50 },
  { name: 'r/interestingasfuck', minKarma: 100 },
  { name: 'r/DidYouKnow', minKarma: 10 },
  { name: 'r/coolguides', minKarma: 50 },
  { name: 'r/productivity', minKarma: 20 },
  { name: 'r/GetMotivated', minKarma: 50 }
];

// Generate Reddit-style post
function generateRedditPost(post) {
  return `
╔══════════════════════════════════════════════════════════════╗
║  REDDIT POST - ${post.title.substring(0, 40)}...
╚══════════════════════════════════════════════════════════════╝

📝 TITLE (Short & catchy):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TIL: ${post.title}

📄 POST BODY (Conversational):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
I just learned something mind-blowing that I had to share!

${post.excerpt}

This completely changed my perspective. If you're curious about the 
full explanation with science-backed sources, I wrote a detailed 
breakdown here: [Full Article](${SITE_URL}/post/${post.slug})

What do you think? Have you experienced this yourself?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 BEST SUBREDDITS:
${TARGET_SUBREDDITS.map(s => `   • ${s.name} (min karma: ${s.minKarma})`).join('\n')}

⚠️  REDDIT RULES:
   • Don't spam - space out posts (1-2 per week max)
   • Participate in comments genuinely
   • Build karma FIRST by commenting helpfully
   • Never use the same post multiple times
   • Follow each subreddit's specific rules

`;
}

// Generate forum post (like Quora style)
function generateForumPost(post) {
  return `
╔══════════════════════════════════════════════════════════════╗
║  FORUM/QUORA ANSWER
╚══════════════════════════════════════════════════════════════╝

🤔 QUESTION TO ANSWER:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(Find relevant questions about: ${post.title.split(':')[0]})

💬 YOUR ANSWER:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Great question! Here's what recent research shows:

${post.excerpt}

I've written a comprehensive breakdown of this topic with all the 
science-backed sources and practical applications if you want to 
dive deeper: ${SITE_URL}/post/${post.slug}

Hope this helps! Let me know if you have other questions.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 BEST PLATFORMS:
   • Quora (answer existing questions)
   • Medium (republish with canonical link)
   • LinkedIn Articles
   • Psychology Today forums
   • HackerNews (Show HN for tech topics)

`;
}

function generateContent() {
  // Read posts
  const postsPath = path.join(__dirname, '../lib/posts.ts');
  const content = fs.readFileSync(postsPath, 'utf8');
  
  const posts = [];
  const postRegex = /title:\s*"([^"]+)",[^]*?slug:\s*"([^"]+)",[^]*?excerpt:\s*"([^"]+)"/g;
  
  let match;
  while ((match = postRegex.exec(content)) !== null && posts.length < 3) {
    posts.push({
      title: match[1],
      slug: match[2],
      excerpt: match[3].substring(0, 300) + '...'
    });
  }
  
  // Generate output
  const outputDir = path.join(__dirname, '../promotion');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const date = new Date().toISOString().split('T')[0];
  const filePath = path.join(outputDir, `reddit-forum-posts-${date}.txt`);
  
  let output = `
╔════════════════════════════════════════════════════════════════════╗
║        REDDIT & FORUM PROMOTION GUIDE - ${date}                 
║        CurioSpark Content Distribution Strategy                    
╚════════════════════════════════════════════════════════════════════╝

⚡ QUICK START:
   1. Build karma first (comment genuinely on other posts)
   2. Pick ONE post to promote per week
   3. Customize for each community
   4. Engage with comments authentically
   5. NEVER spam or copy-paste blindly

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

`;
  
  posts.forEach((post, i) => {
    output += `\n\n${'═'.repeat(70)}\n`;
    output += `ARTICLE ${i + 1} / ${posts.length}\n`;
    output += `${'═'.repeat(70)}\n`;
    output += generateRedditPost(post);
    output += '\n' + generateForumPost(post);
  });
  
  output += `

╔════════════════════════════════════════════════════════════════════╗
║  TRAFFIC GROWTH TIPS                                               
╚════════════════════════════════════════════════════════════════════╝

📈 SHORT-TERM (1-2 weeks):
   • Post in 2-3 relevant subreddits per week
   • Answer 5 Quora questions per week
   • Share on Twitter/X daily
   • Cross-post to Medium with canonical link

🚀 MEDIUM-TERM (1-3 months):
   • Build email list (newsletter)
   • Guest post on other blogs
   • Collaborate with similar creators
   • Pinterest pins for visual content

🎯 LONG-TERM (3-6 months):
   • SEO will kick in (you're already doing this!)
   • Build YouTube shorts with article content
   • Podcast appearances
   • Influencer outreach

💡 GOLDEN RULE:
   Quality > Quantity. One genuine engagement beats 100 spam posts.
   Build real relationships in communities first.

`;
  
  fs.writeFileSync(filePath, output);
  
  console.log('✅ Promotion guide generated!');
  console.log(`📁 Location: promotion/reddit-forum-posts-${date}.txt`);
  console.log('\n🎯 Next steps:');
  console.log('   1. Read the guide carefully');
  console.log('   2. Create Reddit account if needed');
  console.log('   3. Build karma by helping others first');
  console.log('   4. Share ONE article per week naturally');
  console.log('   5. Engage with every comment you get');
}

// Run
try {
  console.log('🚀 Generating Reddit & Forum content...\n');
  generateContent();
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
