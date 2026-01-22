/**
 * AI Content Generator - VIRAL & HUMAN MODE
 * Generates engaging, human-like articles optimized for virality
 */

export type WritingMode = 'viral' | 'educational' | 'storytelling' | 'listicle' | 'news';
export type ToneType = 'professional' | 'casual' | 'friendly' | 'authoritative';

export interface AIArticleInput {
  topic: string;
  keywords: string[];
  category: string;
  mode: WritingMode;
  tone: ToneType;
  length: 'short' | 'medium' | 'long';
}

export interface AIGeneratedArticle {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  tags: string[];
  faqSection: { question: string; answer: string }[];
  internalLinks: string[];
}

/**
 * Generate viral article title with emotional triggers
 */
function generateViralTitle(topic: string, mode: WritingMode): string {
  const viralPrefixes = [
    `${topic}: The Shocking Truth Nobody Tells You`,
    `Why ${topic} Is Actually More Important Than You Think`,
    `The Surprising Science Behind ${topic}`,
    `What Everyone Gets Wrong About ${topic}`,
    `${topic}: You Won't Believe What We Discovered`,
    `The Hidden Truth About ${topic} That Changes Everything`,
    `How ${topic} Is Quietly Transforming Our World`,
    `${topic}: What Experts Don't Want You To Know`,
  ];

  const educationalTitles = [
    `Understanding ${topic}: A Complete Guide`,
    `Everything You Need to Know About ${topic}`,
    `${topic} Explained: From Basics to Advanced`,
    `The Ultimate ${topic} Guide for 2026`,
  ];

  const listicleTitles = [
    `10 Fascinating Facts About ${topic}`,
    `7 Surprising Things About ${topic}`,
    `15 Mind-Blowing ${topic} Facts`,
    `12 Things You Didn't Know About ${topic}`,
  ];

  switch (mode) {
    case 'viral':
      return viralPrefixes[Math.floor(Math.random() * viralPrefixes.length)];
    case 'educational':
      return educationalTitles[Math.floor(Math.random() * educationalTitles.length)];
    case 'listicle':
      return listicleTitles[Math.floor(Math.random() * listicleTitles.length)];
    case 'storytelling':
      return `The Incredible Story of ${topic}`;
    case 'news':
      return `Breaking: New Discoveries About ${topic}`;
    default:
      return `${topic}: The Complete Guide`;
  }
}

/**
 * Generate engaging hook-based introduction
 */
function generateHookIntro(topic: string, mode: WritingMode): string {
  const hooks = {
    viral: `Did you know that ${topic.toLowerCase()} has been hiding secrets that could change everything you thought you knew? You're about to discover something extraordinary.`,
    educational: `If you've ever wondered about ${topic.toLowerCase()}, you're in the right place. This comprehensive guide will walk you through everything you need to know.`,
    storytelling: `Picture this: a world where ${topic.toLowerCase()} transforms the way we live, work, and think. This isn't science fiction—it's happening right now.`,
    listicle: `Ready to have your mind blown? We've compiled the most surprising facts about ${topic.toLowerCase()} that most people have no idea about.`,
    news: `Breaking news: Recent discoveries about ${topic.toLowerCase()} are making headlines, and for good reason. Here's what you need to know.`,
  };

  return hooks[mode] || hooks.viral;
}

/**
 * Generate human-like content with short paragraphs and emotional triggers
 */
function generateHumanContent(
  topic: string,
  keywords: string[],
  mode: WritingMode,
  length: 'short' | 'medium' | 'long'
): string {
  const title = generateViralTitle(topic, mode);
  const hook = generateHookIntro(topic, mode);

  // Word count targets
  const wordCounts = { short: 800, medium: 1500, long: 2500 };
  const targetWords = wordCounts[length];

  const mainKeyword = keywords[0] || topic;
  const secondaryKeywords = keywords.slice(1, 4);

  return `# ${title}

${hook}

In the next few minutes, you'll discover insights about ${mainKeyword} that most people never learn. Whether you're just curious or looking to become an expert, this article has something for everyone.

## What Makes ${topic} So Fascinating?

Here's the thing most people don't realize: ${topic} isn't just another topic you scroll past. It's deeply connected to ${secondaryKeywords[0] || 'our daily lives'} in ways that might surprise you.

Recent studies have shown something remarkable. When researchers looked closely at ${mainKeyword}, they found patterns that completely changed our understanding. This discovery has implications we're only beginning to grasp.

### The Science Behind It

Let's break this down in simple terms.

${topic} works because of three key principles:

1. **Natural Patterns**: Nature has been using these principles for millions of years
2. **Human Behavior**: Our brains are wired to respond to ${mainKeyword}
3. **Environmental Factors**: External conditions play a bigger role than we thought

What's fascinating is how these elements interact. It's not just one factor—it's the combination that creates something truly special.

## Why This Matters More Than You Think

You might be wondering, "Why should I care about ${topic}?"

Great question. Here's why it matters:

**It affects your daily life**. Even if you don't realize it, ${mainKeyword} influences decisions you make every single day. From the moment you wake up to when you go to sleep, it's there.

**It's changing rapidly**. The ${topic} landscape of 2026 looks completely different from just five years ago. If you're not keeping up, you're falling behind.

**Everyone's talking about it**. Whether it's ${secondaryKeywords[0] || 'social media'}, news outlets, or your friends—${topic} is a hot topic for a reason.

### The Hidden Benefits

Here's where it gets really interesting.

Most people know the obvious benefits of understanding ${topic}. But there are hidden advantages that researchers have only recently uncovered:

- **Improved Decision Making**: When you understand ${mainKeyword}, you make better choices
- **Time Savings**: Knowing what works saves you countless hours of trial and error
- **Confidence Boost**: Knowledge is power, and this knowledge is particularly empowering

Think about it. How many times have you wished you knew more about ${topic}? Now's your chance.

## Common Mistakes (And How to Avoid Them)

Let's be honest. Most people get this wrong.

**Mistake #1: Rushing to conclusions**

We've all been there. You learn something new about ${mainKeyword} and immediately think you've got it all figured out. Wrong. The reality is far more nuanced.

The fix? Take your time. Absorb the information slowly. Let it sink in.

**Mistake #2: Ignoring the details**

Small details make a massive difference. What seems insignificant at first often turns out to be crucial. Pay attention to the subtleties of ${secondaryKeywords[1] || topic}.

**Mistake #3: Not staying updated**

${topic} is evolving. What was true last year might not apply today. Stay current. Follow the latest research. Keep learning.

## Real-World Applications

Theory is great, but let's talk practical applications.

Here's how you can use this knowledge in your everyday life:

### For Beginners

Start with the basics. Don't overwhelm yourself. Focus on understanding the core concepts of ${mainKeyword} first. Once you've got that down, everything else becomes easier.

### For Intermediate Users

You already know the fundamentals. Now it's time to dig deeper. Explore the connections between ${topic} and ${secondaryKeywords[0] || 'related fields'}. That's where the magic happens.

### For Advanced Practitioners

Push the boundaries. Experiment with new approaches. Combine ${mainKeyword} with ${secondaryKeywords[1] || 'innovative techniques'} in ways nobody has tried before.

## The Future of ${topic}

Want to know where this is all heading?

Experts predict some fascinating developments:

**Artificial Intelligence Integration**: AI is already transforming how we understand ${mainKeyword}. In the next few years, expect even more dramatic changes.

**Personalization**: One-size-fits-all approaches are dying. The future is customized, tailored experiences with ${topic}.

**Accessibility**: What once required expensive equipment or expert knowledge is becoming available to everyone. This democratization is game-changing.

## Frequently Asked Questions

### Why is ${topic} important?

${topic} matters because it directly impacts ${secondaryKeywords[0] || 'our daily lives'}. Understanding it gives you a significant advantage in both personal and professional contexts.

### How long does it take to learn?

That depends on your goals. Basic understanding? A few hours. Deep expertise? Months or years. The good news? Every step of the journey offers valuable insights.

### Is it worth the effort?

Absolutely. The benefits of understanding ${mainKeyword} far outweigh the time investment. People who grasp these concepts consistently report better outcomes.

### Can anyone learn this?

Yes! While some aspects of ${topic} can be complex, the core concepts are accessible to everyone. You don't need special skills or background knowledge to get started.

### What's the best way to start?

Start with curiosity. Ask questions. Read articles like this one. Talk to people who know about ${topic}. Most importantly, don't be afraid to experiment.

## Key Takeaways

Let's recap what we've covered:

- ${topic} is more important than most people realize
- Understanding ${mainKeyword} provides real, tangible benefits
- Common mistakes are easily avoidable with the right knowledge
- The future holds exciting possibilities
- Anyone can learn and benefit from this information

## Final Thoughts

Here's the bottom line: ${topic} isn't going anywhere. If anything, it's becoming more relevant every day.

You have two choices. You can ignore this information and hope it doesn't matter. Or you can embrace it, learn from it, and use it to your advantage.

The smart money is on the second option.

Start applying what you've learned today. Even small steps make a difference. Before you know it, you'll be the person others turn to when they have questions about ${mainKeyword}.

Ready to dive deeper? Explore our other articles on ${secondaryKeywords[0] || 'related topics'} and ${secondaryKeywords[1] || 'advanced concepts'}. Your journey is just beginning.

---

*Stay curious, keep learning, and never stop asking questions. That's the secret to mastering ${topic}.*`;
}

/**
 * Generate FAQ section for Google rich results
 */
function generateFAQ(topic: string, keywords: string[]): { question: string; answer: string }[] {
  const mainKeyword = keywords[0] || topic;

  return [
    {
      question: `What is ${topic}?`,
      answer: `${topic} is ${mainKeyword} that has gained significant attention due to its practical applications and real-world benefits. It encompasses various aspects including research, implementation, and ongoing development.`,
    },
    {
      question: `Why is ${topic} important?`,
      answer: `${topic} is important because it directly impacts how we understand and interact with ${mainKeyword}. Understanding it provides valuable insights and practical advantages in multiple areas.`,
    },
    {
      question: `How can I learn more about ${topic}?`,
      answer: `Start by reading comprehensive guides, following expert sources, and staying updated with the latest research on ${mainKeyword}. Practical application and experimentation are also key to deep understanding.`,
    },
    {
      question: `Is ${topic} suitable for beginners?`,
      answer: `Yes! While ${topic} can be complex, the basic concepts are accessible to everyone. Starting with fundamentals and gradually building knowledge makes it manageable for beginners.`,
    },
    {
      question: `What are the main benefits of understanding ${topic}?`,
      answer: `Understanding ${topic} offers numerous benefits including improved decision-making, time savings, increased confidence, and better outcomes in areas related to ${mainKeyword}.`,
    },
  ];
}

/**
 * Generate SEO metadata
 */
function generateSEO(title: string, topic: string, keywords: string[]) {
  const mainKeyword = keywords[0] || topic;

  return {
    seoTitle: `${title.substring(0, 55)} | 2026 Guide`,
    seoDescription: `Discover everything about ${topic}. Expert insights on ${mainKeyword}, practical tips, and latest trends. Complete guide with proven strategies and real results.`,
  };
}

/**
 * Generate URL-friendly slug
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 60)
    .replace(/^-+|-+$/g, '');
}

/**
 * Main AI Article Generator
 */
export async function generateAIArticle(input: AIArticleInput): Promise<AIGeneratedArticle> {
  const { topic, keywords, mode, length } = input;

  // Generate title
  const title = generateViralTitle(topic, mode);

  // Generate content
  const content = generateHumanContent(topic, keywords, mode, length);

  // Generate FAQ
  const faqSection = generateFAQ(topic, keywords);

  // Generate SEO
  const { seoTitle, seoDescription } = generateSEO(title, topic, keywords);

  // Generate slug
  const slug = generateSlug(title);

  // Extract excerpt (first 2-3 sentences)
  const sentences = content.split('\n').filter(line => line.trim() && !line.startsWith('#'));
  const excerpt = sentences.slice(1, 3).join(' ').substring(0, 200) + '...';

  return {
    title,
    slug,
    excerpt,
    content,
    seoTitle,
    seoDescription,
    keywords,
    tags: [...keywords, topic],
    faqSection,
    internalLinks: [], // Will be populated based on existing articles
  };
}

/**
 * Suggest internal links based on existing articles
 */
export async function suggestInternalLinks(
  content: string,
  existingArticles: { title: string; slug: string; keywords: string[] }[]
): Promise<string[]> {
  const suggestions: string[] = [];
  const contentLower = content.toLowerCase();

  for (const article of existingArticles) {
    // Check if article keywords appear in content
    const hasMatchingKeyword = article.keywords.some(keyword =>
      contentLower.includes(keyword.toLowerCase())
    );

    if (hasMatchingKeyword) {
      suggestions.push(article.slug);
    }

    if (suggestions.length >= 5) break;
  }

  return suggestions;
}
