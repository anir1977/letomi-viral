'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  SparklesIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import Card from '../components/Card';
import { mockCategories } from '../lib/mockData';

interface GeneratedArticle {
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  excerpt: string;
}

export default function AIWriterPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState<'input' | 'preview' | 'saved'>('input');
  
  // Form inputs
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [category, setCategory] = useState('');
  const [tone, setTone] = useState<'professional' | 'casual' | 'educational'>('professional');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  
  // Generated article
  const [generatedArticle, setGeneratedArticle] = useState<GeneratedArticle | null>(null);

  // Generate article with AI (mock implementation - replace with real AI)
  const generateArticle = async () => {
    if (!topic.trim()) {
      alert('Please enter article topic');
      return;
    }

    setIsGenerating(true);
    setStep('input');

    // Simulate AI generation (2-3 seconds)
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock generated article - TODO: Replace with real AI API call
    const keywordsList = keywords.split(',').map(k => k.trim()).filter(k => k);
    const slug = topic
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const article: GeneratedArticle = {
      title: topic,
      slug: slug,
      content: generateMockContent(topic, keywordsList, length),
      metaTitle: `${topic} | Complete Guide 2026`,
      metaDescription: `Discover everything you need to know about ${topic}. Comprehensive guide with reliable information and practical tips about ${keywordsList.slice(0, 2).join(', ')}.`,
      tags: keywordsList.length > 0 ? keywordsList : [topic],
      excerpt: `A comprehensive and detailed article about ${topic} providing valuable and reliable information with practical tips and real examples.`,
    };

    setGeneratedArticle(article);
    setIsGenerating(false);
    setStep('preview');
  };

  // Generate mock content (replace with real AI)
  const generateMockContent = (topic: string, keywords: string[], length: string) => {
    const wordCount = length === 'short' ? 500 : length === 'medium' ? 1000 : 1500;
    
    return `# ${topic}

## Introduction

In today's world, ${topic} has become one of the most important and influential subjects in our daily lives. This article provides a comprehensive and detailed guide about ${topic}, with reliable information and practical tips.

## What is ${topic}?

${topic} is a subject worth attention and study, as it directly affects ${keywords.length > 0 ? keywords[0] : 'our daily lives'}. Through a deep understanding of this topic, we can improve ${keywords.length > 1 ? keywords[1] : 'our quality of life'}.

## Key Benefits

### 1. First Important Benefit
${topic} offers numerous advantages that make it an excellent choice. Through proper implementation, tangible results can be achieved in a short time.

### 2. Performance Improvement
One of the most important aspects of ${topic} is its ability to improve performance and efficiency. Studies indicate that proper use can make a significant difference.

### 3. Time and Effort Savings
By understanding ${topic} correctly, you can save a lot of time and effort, allowing you to focus on other important matters.

## How to Benefit from ${topic}

### Step One: Basic Understanding
Before starting, it's important to understand the basics. ${topic} requires knowledge of ${keywords.length > 0 ? keywords[0] : 'fundamental concepts'}.

### Step Two: Practical Application
After theoretical understanding comes practical application. Start with small steps and develop gradually.

### Step Three: Evaluation and Improvement
Monitor results continuously and make necessary improvements to achieve the best outcomes.

## Expert Tips

- **Tip 1**: Start with the basics and don't rush for results
- **Tip 2**: Continue learning and developing
- **Tip 3**: Share your experience with others
- **Tip 4**: Be patient and persistent

## Common Mistakes and How to Avoid Them

### Mistake 1: Rushing at the Beginning
Many people make the mistake of rushing. Take your time and learn properly.

### Mistake 2: Neglecting Details
Small details can make a big difference. Pay attention to all details.

### Mistake 3: Lack of Consistency
Success requires consistency. Don't stop after the beginning.

## Conclusion

${topic} is an important subject that deserves attention and study. By following the tips and guidelines in this article, you can achieve excellent results. Remember that success comes with patience and perseverance.

## Frequently Asked Questions

**Q: Why is ${topic} important?**
A: ${topic} is very important because it directly affects ${keywords.length > 0 ? keywords[0] : 'our daily lives'}.

**Q: How long does it take to learn?**
A: It depends on the level of commitment, but generally, initial results can be seen within a few weeks.

**Q: Is it suitable for everyone?**
A: Yes, ${topic} can benefit everyone regardless of their level.

---

*This article was created with great care to provide accurate and reliable information. We hope you find it helpful!*
`;
  };

  // Save article
  const saveArticle = async () => {
    if (!generatedArticle) return;

    // TODO: Implement Supabase save
    console.log('Saving article:', generatedArticle);

    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setStep('saved');
    
    // Redirect to articles list after 2 seconds
    setTimeout(() => {
      router.push('/admin/articles');
    }, 2000);
  };

  // Edit in full editor
  const editInEditor = () => {
    if (!generatedArticle) return;
    
    // Store in localStorage for the editor to pick up
    localStorage.setItem('ai_generated_article', JSON.stringify(generatedArticle));
    router.push('/admin/articles/new?from=ai');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <SparklesIcon className="w-8 h-8 mr-3 text-purple-600" />
            AI Article Writer
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Create professional, high-quality articles optimized for SEO
          </p>
        </div>
      </div>

      {/* Input Form */}
      {step === 'input' && (
        <Card>
          <div className="space-y-6">
            {/* Topic */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Article Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Benefits of Meditation for Mental Health"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Keywords (comma separated)
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="meditation, mental health, wellness, mindfulness"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>

            {/* Category and Length */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select category</option>
                  {mockCategories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Length */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Article Length
                </label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="short">Short (~500 words)</option>
                  <option value="medium">Medium (~1000 words)</option>
                  <option value="long">Long (~1500 words)</option>
                </select>
              </div>
            </div>

            {/* Tone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Writing Tone
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'professional', label: 'Professional', icon: '👔' },
                  { value: 'casual', label: 'Casual', icon: '😊' },
                  { value: 'educational', label: 'Educational', icon: '📚' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setTone(option.value as any)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      tone === option.value
                        ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-purple-400'
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.icon}</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {option.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateArticle}
              disabled={isGenerating}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                  Generating article...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  Generate Article with AI
                </>
              )}
            </button>

            {/* Info Box */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                💡 <strong>Pro tip:</strong> The more specific your keywords are, the better and more SEO-optimized the article will be
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Preview */}
      {step === 'preview' && generatedArticle && (
        <>
          {/* Preview Header */}
          <Card>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-green-600 dark:text-green-400">
                <CheckCircleIcon className="w-6 h-6 mr-2" />
                <span className="font-medium">Article generated successfully!</span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setStep('input')}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Create New Article
                </button>
                <button
                  onClick={editInEditor}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Edit in Full Editor
                </button>
                <button
                  onClick={saveArticle}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center"
                >
                  <CheckCircleIcon className="w-5 h-5 mr-2" />
                  Save Article
                </button>
              </div>
            </div>
          </Card>

          {/* Article Preview */}
          <Card title="Article Preview">
            <div className="space-y-6">
              {/* Meta Info */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Title:</span>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{generatedArticle.title}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Slug:</span>
                  <p className="text-gray-700 dark:text-gray-300">{generatedArticle.slug}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tags:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {generatedArticle.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="whitespace-pre-wrap leading-relaxed">
                {generatedArticle.content}
              </div>
            </div>
          </Card>

          {/* SEO Score */}
          <Card title="SEO Score">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">95%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">SEO Optimization</div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">88%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Readability</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">92%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Content Quality</div>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {generatedArticle.content.split(' ').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Word Count</div>
              </div>
            </div>
          </Card>
        </>
      )}

      {/* Saved State */}
      {step === 'saved' && (
        <Card>
          <div className="text-center py-12">
            <CheckCircleIcon className="w-16 h-16 mx-auto text-green-600 dark:text-green-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Article saved successfully!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Redirecting to articles list...
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
