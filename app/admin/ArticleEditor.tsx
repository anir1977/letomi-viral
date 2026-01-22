'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeftIcon,
  PhotoIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Card from './components/Card';
import { getCategories } from '@/lib/supabase/categories';
import { createArticle, updateArticle } from '@/lib/supabase/articles';
import { supabase } from '@/lib/supabase/client';
import type { Category } from '@/types/database';
import { Article } from './types';

interface ArticleEditorProps {
  initialData?: Partial<Article>;
  isEditing?: boolean;
}

export default function ArticleEditor({ initialData, isEditing = false }: ArticleEditorProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState(initialData?.category || '');
  const [formData, setFormData] = useState<Partial<Article>>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category: initialData?.category || '',
    tags: initialData?.tags || [],
    coverImage: initialData?.coverImage || '',
    content: initialData?.content || '',
    metaTitle: initialData?.metaTitle || '',
    metaDescription: initialData?.metaDescription || '',
    status: initialData?.status || 'draft',
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data || []);
      // Set default category if not editing and no category selected
      if (!isEditing && !categoryId && data && data.length > 0) {
        setCategoryId(data[0].id);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  }

  // Auto-generate slug from title
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    setFormData({
      ...formData,
      title,
      slug,
      metaTitle: title ? `${title} | CurioSpark` : '',
    });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter(tag => tag !== tagToRemove),
    });
  };

  const handleSubmit = async (e: FormEvent, status: 'draft' | 'published') => {
    e.preventDefault();
    
    // Validation
    if (!formData.title?.trim()) {
      alert('Le titre est requis');
      return;
    }
    
    if (!formData.slug?.trim()) {
      alert('Le slug est requis');
      return;
    }
    
    if (!formData.content?.trim()) {
      alert('Le contenu est requis');
      return;
    }
    
    if (!categoryId) {
      alert('Veuillez sélectionner une catégorie');
      return;
    }

    setIsSaving(true);
    console.log('💾 Saving article...', { isEditing, status, categoryId });

    try {
      // Check if user is authenticated
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('❌ Session error:', sessionError);
        throw new Error(`Session error: ${sessionError.message}`);
      }

      if (!session) {
        console.error('❌ No active session - user not authenticated');
        throw new Error(
          'Vous devez être connecté pour sauvegarder un article. ' +
          'Veuillez vous déconnecter et vous reconnecter à /admin/login'
        );
      }

      console.log('✅ User authenticated:', session.user.email);

      // Prepare article data matching DB schema
      const articleData = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        excerpt: formData.content.substring(0, 200), // Generate excerpt from content
        content: formData.content.trim(),
        category_id: categoryId, // UUID (REQUIRED)
        tags: formData.tags || [],
        seo_title: formData.metaTitle || formData.title,
        seo_description: formData.metaDescription || formData.content.substring(0, 160),
        keywords: formData.tags || [], // Use tags as keywords
        status,
        cover_image_url: formData.coverImage || null,
      };

      console.log('📝 Article data:', {
        ...articleData,
        content: articleData.content.substring(0, 100) + '...',
      });

      let savedArticle;

      if (isEditing && initialData?.id) {
        // UPDATE existing article
        console.log('🔄 Updating article:', initialData.id);
        savedArticle = await updateArticle(initialData.id, articleData);
        console.log('✅ Article updated successfully');
      } else {
        // INSERT new article
        console.log('➕ Creating new article');
        savedArticle = await createArticle(articleData);
        console.log('✅ Article created successfully:', savedArticle.id);
      }

      // Success - redirect to articles list
      router.push('/admin/articles');
    } catch (error) {
      console.error('❌ Error saving article:', error);
      
      // Log full error object for debugging
      console.error('Full error object:', {
        error,
        errorType: typeof error,
        isErrorInstance: error instanceof Error,
        errorKeys: error ? Object.keys(error) : [],
      });
      
      // Detailed error logging
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      
      // Extract detailed error message
      let errorMessage = 'Erreur inconnue';
      let errorHint = '';
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Add specific hints based on error message
        if (errorMessage.includes('new row violates row-level security policy') || 
            errorMessage.includes('RLS') ||
            errorMessage.includes('policy')) {
          errorHint = '\n\n🔒 PROBLÈME DE SÉCURITÉ RLS:\n' +
            'Les policies Supabase bloquent la sauvegarde.\n\n' +
            'SOLUTION:\n' +
            '1. Allez dans Supabase SQL Editor\n' +
            '2. Exécutez le fichier: supabase/ARTICLES_RLS_SETUP.sql\n' +
            '3. Vérifiez que les policies sont créées\n' +
            '4. Réessayez de sauvegarder';
        } else if (errorMessage.includes('Session') || errorMessage.includes('connecté')) {
          errorHint = '\n\n🔑 PROBLÈME D\'AUTHENTIFICATION:\n' +
            'Votre session a expiré.\n\n' +
            'SOLUTION:\n' +
            '1. Déconnectez-vous\n' +
            '2. Reconnectez-vous à /admin/login\n' +
            '3. Réessayez';
        } else if (errorMessage.includes('Slug') && errorMessage.includes('exists')) {
          errorHint = '\n\n📝 Le slug sera modifié automatiquement';
        }
      } else if (typeof error === 'object' && error !== null) {
        // @ts-ignore - Handle Supabase error object
        errorMessage = error.message || JSON.stringify(error);
      }
      
      // Show specific error message to user
      alert(
        `❌ ÉCHEC DE LA SAUVEGARDE\n\n` +
        `Erreur: ${errorMessage}${errorHint}\n\n` +
        `📋 Détails dans la console (F12)`
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/articles"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isEditing ? 'Edit Article' : 'New Article'}
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {isEditing ? 'Update your article' : 'Create a new article'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={(e) => handleSubmit(e, 'draft')}
            disabled={isSaving}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={(e) => handleSubmit(e, 'published')}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Publish'}
          </button>
        </div>
      </div>

      <form className="space-y-6">
        {/* Main Content */}
        <Card title="Content">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleTitleChange}
                required
                placeholder="Enter article title..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Slug *
              </label>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                  curiospark.org/post/
                </span>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  placeholder="article-slug"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category and Tags Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    placeholder="Add tag..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Add
                  </button>
                </div>
                {formData.tags && formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 hover:text-blue-900 dark:hover:text-blue-300"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cover Image
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleInputChange}
                  placeholder="Image URL or upload..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center"
                >
                  <PhotoIcon className="w-5 h-5 mr-2" />
                  Upload
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                TODO: Implement Supabase Storage upload
              </p>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={16}
                placeholder="Write your article content here (Markdown supported)..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              />
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Supports Markdown formatting
              </p>
            </div>
          </div>
        </Card>

        {/* SEO Settings */}
        <Card title="SEO & Meta">
          <div className="space-y-6">
            {/* Meta Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Meta Title
              </label>
              <input
                type="text"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleInputChange}
                placeholder="SEO title..."
                maxLength={60}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {formData.metaTitle?.length || 0}/60 characters
              </p>
            </div>

            {/* Meta Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Meta Description
              </label>
              <textarea
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleInputChange}
                placeholder="SEO description..."
                maxLength={160}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {formData.metaDescription?.length || 0}/160 characters
              </p>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
}
