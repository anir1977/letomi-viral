'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  SparklesIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import Card from '../components/Card';
import { generateAIArticle, type WritingMode, type ToneType } from '@/lib/ai-generator';
import { getCategories } from '@/lib/supabase/categories';
import { supabase } from '@/lib/supabase/client';
import type { Category } from '@/types/database';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function AIWriterPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [step, setStep] = useState<'input' | 'preview'>('input');
  
  // Categories from DB
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Form inputs
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [mode, setMode] = useState<WritingMode>('viral');
  const [tone, setTone] = useState<ToneType>('casual');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  
  // Generated article
  const [generatedArticle, setGeneratedArticle] = useState<any | null>(null);
  const [seoScore, setSeoScore] = useState(0);

  useEffect(() => {
    console.log('🔄 Component mounted, loading categories...');
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      console.log('📂 Fetching categories from database...');
      const data = await getCategories();
      console.log('✅ Categories loaded:', data);
      setCategories(data || []);
      if (data && data.length > 0) {
        setCategoryId(data[0].id);
        console.log('✓ Default category set:', data[0].name);
      } else {
        console.warn('⚠️ No categories found in database!');
      }
    } catch (error) {
      console.error('❌ Error loading categories:', error);
      alert('Erreur lors du chargement des catégories. Vérifiez votre connexion Supabase.');
    }
  }

  // Generate article with AI
  const generateArticle = async () => {
    console.log('🚀 Generate button clicked!');
    console.log('Topic:', topic);
    console.log('Category ID:', categoryId);
    console.log('Keywords:', keywords);
    
    if (!topic.trim()) {
      alert('Veuillez entrer un sujet d\'article');
      return;
    }

    if (!categoryId) {
      alert('Veuillez sélectionner une catégorie');
      return;
    }

    setIsGenerating(true);
    console.log('🎯 Starting AI generation...');

    try {
      // Parse keywords
      const keywordsList = keywords.split(',').map(k => k.trim()).filter(k => k);
      
      if (keywordsList.length === 0) {
        keywordsList.push(topic);
      }

      console.log('📝 Keywords list:', keywordsList);
      console.log('📂 Category:', categories.find(c => c.id === categoryId)?.name);

      // Generate article using AI engine
      const article = await generateAIArticle({
        topic,
        keywords: keywordsList,
        category: categories.find(c => c.id === categoryId)?.name || 'General',
        mode,
        tone,
        length,
      });

      console.log('✅ Article generated successfully!', article);
      setGeneratedArticle(article);
      
      // Calculate SEO score
      const wordCount = article.content.split(/\s+/).length;
      let score = 0;
      if (article.seoTitle) score += 15;
      if (article.seoDescription) score += 15;
      if (article.keywords.length >= 3) score += 15;
      if (wordCount >= 800) score += 25;
      else if (wordCount >= 500) score += 15;
      if (article.tags.length >= 3) score += 10;
      if (article.faqSection.length > 0) score += 10;
      score += 10; // Bonus for AI generation
      
      setSeoScore(score);
      console.log('📊 SEO Score:', score);
      setStep('preview');
    } catch (error) {
      console.error('❌ Error generating article:', error);
      alert(`Échec de la génération de l'article: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setIsGenerating(false);
      console.log('🏁 Generation process completed');
    }
  };

  // Create draft article - Simple and reliable
  const createDraft = async () => {
    if (!generatedArticle) {
      console.error('❌ No generated article to save');
      alert('Aucun article généré à sauvegarder');
      return;
    }

    // NOTE: Category validation removed - will be set in Article Editor
    // if (!categoryId) {
    //   console.error('❌ No category selected');
    //   alert('Veuillez sélectionner une catégorie avant de créer le brouillon');
    //   return;
    // }

    setIsSaving(true);
    console.log('📝 Creating draft article (category will be set in editor)...');

    try {
      // Get authenticated user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Vous devez être connecté. Allez à /admin/login');
      }

      console.log('✅ User:', session.user.email);

      // Generate unique slug with timestamp to avoid conflicts
      const baseSlug = generatedArticle.slug;
      const timestamp = Date.now().toString(36); // Base36 timestamp (shorter)
      const uniqueSlug = `${baseSlug}-${timestamp}`;

      // Minimal draft data - only required fields
      // NOTE: category_id temporarily removed due to Supabase schema cache issue
      // Users can set the category in the Article Editor after creation
      const draftData = {
        title: generatedArticle.title,
        slug: uniqueSlug, // Guaranteed unique with timestamp
        excerpt: generatedArticle.excerpt,
        content: generatedArticle.content,
        // category_id: categoryId, // TEMPORARILY DISABLED - schema cache not updated
        author_id: session.user.id, // Set author
        status: 'draft' as const,
        // Optional: preserve AI-generated metadata
        tags: generatedArticle.tags || [],
        seo_title: generatedArticle.seoTitle || generatedArticle.title,
        seo_description: generatedArticle.seoDescription || generatedArticle.excerpt,
        keywords: generatedArticle.keywords || [],
      };

      console.log('📤 Saving draft:', { 
        title: draftData.title, 
        slug: draftData.slug,
        author_id: draftData.author_id,
        note: 'Category will be set in Article Editor'
      });

      // Save to database
      // @ts-ignore - Supabase type inference issue
      const { data, error } = await supabase
        .from('articles')
        // @ts-ignore
        .insert(draftData)
        .select()
        .single();

      if (error) {
        console.error('❌ Supabase error:', error);
        throw new Error(error.message || 'Échec de la sauvegarde');
      }

      // @ts-ignore - Type assertion for data
      console.log('✅ Draft created:', data?.id);
      
      // Show success and redirect to articles dashboard
      alert(
        '✅ Brouillon créé avec succès!\n\n' +
        '📝 N\'oubliez pas de définir la CATÉGORIE dans l\'éditeur d\'articles.\n\n' +
        'Vous allez être redirigé vers le tableau de bord.'
      );
      router.push('/admin/articles');
      
    } catch (error) {
      console.error('❌ Error creating draft:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      
      alert(
        `❌ Échec de la création du brouillon\n\n` +
        `Erreur: ${errorMessage}\n\n` +
        `Vérifiez la console (F12) pour plus de détails.`
      );
    } finally {
      setIsSaving(false);
      console.log('🏁 Save process completed');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <SparklesIcon className="w-8 h-8 mr-3 text-purple-600" />
            AI Article Writer - VIRAL MODE
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Generate human-like, engaging articles optimized for virality and SEO
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
                Article Topic *
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., The Surprising Truth About Sleep"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Keywords (comma separated) *
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="sleep science, health benefits, productivity, sleep patterns"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Add 3-5 keywords for best SEO results
              </p>
            </div>

            {/* Category and Length */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category - TEMPORARILY DISABLED due to Supabase schema cache */}
              {/* Will be set in Article Editor after draft creation */}
              {/*
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              */}

              {/* Info message about category */}
              <div className="md:col-span-2 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  ℹ️ <strong>Note:</strong> Vous définirez la catégorie de l'article dans l'éditeur après création du brouillon.
                </p>
              </div>
            </div>

            {/* Length - Full width now */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Article Length
                </label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value as any)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                >
                  <option value="short">Short (~800 words)</option>
                  <option value="medium">Medium (~1500 words)</option>
                  <option value="long">Long (~2500 words)</option>
                </select>
              </div>
            </div>

            {/* Writing Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Writing Mode
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { value: 'viral' as WritingMode, label: 'Viral', icon: '🔥', desc: 'Hook-based, emotional' },
                  { value: 'educational' as WritingMode, label: 'Educational', icon: '📚', desc: 'Informative, clear' },
                  { value: 'storytelling' as WritingMode, label: 'Storytelling', icon: '📖', desc: 'Narrative-driven' },
                  { value: 'listicle' as WritingMode, label: 'Listicle', icon: '📝', desc: 'List format' },
                  { value: 'news' as WritingMode, label: 'News', icon: '📰', desc: 'Breaking news style' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setMode(option.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      mode === option.value
                        ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 ring-2 ring-purple-200 dark:ring-purple-800'
                        : 'border-gray-300 dark:border-gray-600 hover:border-purple-400'
                    }`}
                  >
                    <div className="text-3xl mb-1">{option.icon}</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {option.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {option.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Writing Tone
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'professional' as ToneType, label: 'Professional', icon: '👔' },
                  { value: 'casual' as ToneType, label: 'Casual', icon: '😊' },
                  { value: 'friendly' as ToneType, label: 'Friendly', icon: '🤝' },
                  { value: 'authoritative' as ToneType, label: 'Authoritative', icon: '🎓' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setTone(option.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      tone === option.value
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
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
              type="button"
              onClick={(e) => {
                e.preventDefault();
                console.log('🔘 Button clicked - starting generation');
                generateArticle();
              }}
              disabled={isGenerating || !topic || !categoryId}
              className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white rounded-lg font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              {isGenerating ? (
                <>
                  <ArrowPathIcon className="w-6 h-6 mr-3 animate-spin" />
                  Génération de l'article viral...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-6 h-6 mr-3" />
                  Générer l'Article avec l'IA
                </>
              )}
            </button>

            {/* Info Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <p className="text-sm text-purple-800 dark:text-purple-300">
                  <strong>🔥 Viral Mode:</strong> Creates hook-based intros, emotional triggers, and curiosity gaps
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>📸 Auto Images:</strong> Cover + inline images generated automatically
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Preview */}
      {step === 'preview' && generatedArticle && (
        <>
          {/* Preview Header */}
          <Card>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center text-green-600 dark:text-green-400">
                <CheckCircleIcon className="w-6 h-6 mr-2 flex-shrink-0" />
                <span className="font-semibold">Article generated successfully!</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setStep('input')}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                  New Article
                </button>
                <button
                  onClick={createDraft}
                  disabled={isSaving}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all flex items-center font-semibold disabled:opacity-50 shadow-md"
                >
                  {isSaving ? (
                    <>
                      <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                      Création...
                    </>
                  ) : (
                    <>
                      <DocumentTextIcon className="w-5 h-5 mr-2" />
                      Créer un brouillon
                    </>
                  )}
                </button>
              </div>
            </div>
          </Card>

          {/* SEO Score Dashboard */}
          <Card title="📊 SEO & Quality Metrics">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">{seoScore}%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-medium">SEO Score</div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {generatedArticle.content.split(/\s+/).length}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-medium">Words</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {generatedArticle.keywords.length}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-medium">Keywords</div>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {generatedArticle.faqSection.length}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-medium">FAQs</div>
              </div>
              <div className="text-center p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-200 dark:border-pink-800">
                <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">A+</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-medium">Readability</div>
              </div>
            </div>

            {/* SEO Checklist */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">✅ SEO Optimizations</h4>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                  Viral title with emotional hook
                </div>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                  SEO-optimized meta description
                </div>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                  Keyword-rich content
                </div>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                  FAQ section for Google rich results
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">🔥 Viral Features</h4>
                <div className="flex items-center text-sm text-purple-600 dark:text-purple-400">
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  Hook-based introduction
                </div>
                <div className="flex items-center text-sm text-purple-600 dark:text-purple-400">
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  Short, scannable paragraphs
                </div>
                <div className="flex items-center text-sm text-purple-600 dark:text-purple-400">
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  Emotional triggers & curiosity gaps
                </div>
                <div className="flex items-center text-sm text-purple-600 dark:text-purple-400">
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  Natural, human-like tone
                </div>
              </div>
            </div>
          </Card>

          {/* Metadata */}
          <Card title="📝 Article Metadata">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Title</span>
                <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{generatedArticle.title}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Slug</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 font-mono bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded">
                    {generatedArticle.slug}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">SEO Title</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{generatedArticle.seoTitle}</p>
                </div>
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">SEO Description</span>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{generatedArticle.seoDescription}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Excerpt</span>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{generatedArticle.excerpt}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Tags & Keywords</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {generatedArticle.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Content Preview */}
          <Card title="📄 Article Content">
            <div className="prose prose-lg dark:prose-invert max-w-none 
              prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
              prose-a:text-blue-600 dark:prose-a:text-blue-400
              prose-strong:text-gray-900 dark:prose-strong:text-white
              prose-ul:list-disc prose-ol:list-decimal
              prose-li:text-gray-700 dark:prose-li:text-gray-300
              prose-code:text-purple-600 dark:prose-code:text-purple-400
              prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {generatedArticle.content}
              </ReactMarkdown>
            </div>
          </Card>

          {/* FAQ Section */}
          {generatedArticle.faqSection.length > 0 && (
            <Card title="❓ FAQ Section (Google Rich Results Ready)">
              <div className="space-y-4">
                {generatedArticle.faqSection.map((faq: any, index: number) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
