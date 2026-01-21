// Custom hooks for admin data fetching
// TODO: Implement with real Supabase calls

import { useState, useEffect } from 'react';
import { Article, DashboardStats } from '../types';
import { mockArticles, mockDashboardStats } from './mockData';

// Hook to fetch all articles
export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        // TODO: Replace with Supabase query
        // const { data, error } = await supabase.from('articles').select('*');
        
        // Mock data for now
        await new Promise(resolve => setTimeout(resolve, 500));
        setArticles(mockArticles);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, loading, error };
}

// Hook to fetch single article
export function useArticle(id: string) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        // TODO: Replace with Supabase query
        // const { data, error } = await supabase
        //   .from('articles')
        //   .select('*')
        //   .eq('id', id)
        //   .single();
        
        // Mock data for now
        await new Promise(resolve => setTimeout(resolve, 500));
        const found = mockArticles.find(a => a.id === id);
        setArticle(found || null);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  return { article, loading, error };
}

// Hook to fetch dashboard stats
export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // TODO: Replace with Supabase query
        // Calculate from database or use aggregation
        
        // Mock data for now
        await new Promise(resolve => setTimeout(resolve, 300));
        setStats(mockDashboardStats);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}

// Hook to create article
export function useCreateArticle() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createArticle = async (articleData: Partial<Article>) => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Replace with Supabase insert
      // const { data, error } = await supabase
      //   .from('articles')
      //   .insert([articleData])
      //   .select()
      //   .single();

      // Mock success
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Article created:', articleData);
      
      return { success: true };
    } catch (err) {
      setError(err as Error);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return { createArticle, loading, error };
}

// Hook to update article
export function useUpdateArticle() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateArticle = async (id: string, articleData: Partial<Article>) => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Replace with Supabase update
      // const { data, error } = await supabase
      //   .from('articles')
      //   .update(articleData)
      //   .eq('id', id)
      //   .select()
      //   .single();

      // Mock success
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Article updated:', id, articleData);
      
      return { success: true };
    } catch (err) {
      setError(err as Error);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return { updateArticle, loading, error };
}

// Hook to delete article
export function useDeleteArticle() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteArticle = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Replace with Supabase delete
      // const { error } = await supabase
      //   .from('articles')
      //   .delete()
      //   .eq('id', id);

      // Mock success
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Article deleted:', id);
      
      return { success: true };
    } catch (err) {
      setError(err as Error);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return { deleteArticle, loading, error };
}
