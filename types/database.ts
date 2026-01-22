export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          icon: string | null
          color: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          icon?: string | null
          color?: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          icon?: string | null
          color?: string
          description?: string | null
          created_at?: string
        }
      }
      articles: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          cover_image_url: string | null
          category_id: string | null
          tags: string[]
          seo_title: string | null
          seo_description: string | null
          keywords: string[]
          author_id: string | null
          status: 'draft' | 'published' | 'scheduled'
          views: number
          created_at: string
          updated_at: string
          published_at: string | null
          scheduled_for: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt: string
          content: string
          cover_image_url?: string | null
          category_id?: string | null
          tags?: string[]
          seo_title?: string | null
          seo_description?: string | null
          keywords?: string[]
          author_id?: string | null
          status?: 'draft' | 'published' | 'scheduled'
          views?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
          scheduled_for?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          cover_image_url?: string | null
          category_id?: string | null
          tags?: string[]
          seo_title?: string | null
          seo_description?: string | null
          keywords?: string[]
          author_id?: string | null
          status?: 'draft' | 'published' | 'scheduled'
          views?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
          scheduled_for?: string | null
        }
      }
      article_images: {
        Row: {
          id: string
          article_id: string
          image_url: string
          source: 'ai' | 'unsplash' | 'pexels' | 'custom'
          alt_text: string
          position: number
          created_at: string
        }
        Insert: {
          id?: string
          article_id: string
          image_url: string
          source?: 'ai' | 'unsplash' | 'pexels' | 'custom'
          alt_text: string
          position?: number
          created_at?: string
        }
        Update: {
          id?: string
          article_id?: string
          image_url?: string
          source?: 'ai' | 'unsplash' | 'pexels' | 'custom'
          alt_text?: string
          position?: number
          created_at?: string
        }
      }
      article_views: {
        Row: {
          id: string
          article_id: string
          created_at: string
        }
        Insert: {
          id?: string
          article_id: string
          created_at?: string
        }
        Update: {
          id?: string
          article_id?: string
          created_at?: string
        }
      }
      analytics_daily: {
        Row: {
          id: string
          date: string
          page_views: number
          unique_visitors: number
          source_google: number
          source_social: number
          source_direct: number
          created_at: string
        }
        Insert: {
          id?: string
          date: string
          page_views?: number
          unique_visitors?: number
          source_google?: number
          source_social?: number
          source_direct?: number
          created_at?: string
        }
        Update: {
          id?: string
          date?: string
          page_views?: number
          unique_visitors?: number
          source_google?: number
          source_social?: number
          source_direct?: number
          created_at?: string
        }
      }
      article_relations: {
        Row: {
          id: string
          article_id: string
          related_article_id: string
          relevance_score: number
          created_at: string
        }
        Insert: {
          id?: string
          article_id: string
          related_article_id: string
          relevance_score?: number
          created_at?: string
        }
        Update: {
          id?: string
          article_id?: string
          related_article_id?: string
          relevance_score?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_article_views: {
        Args: {
          article_uuid: string
        }
        Returns: void
      }
      get_trending_articles: {
        Args: {
          limit_count?: number
        }
        Returns: {
          article_id: string
          title: string
          slug: string
          views_count: number
        }[]
      }
      get_related_articles: {
        Args: {
          article_uuid: string
          limit_count?: number
        }
        Returns: {
          id: string
          title: string
          slug: string
          excerpt: string
          cover_image_url: string | null
        }[]
      }
      calculate_seo_score: {
        Args: {
          article_uuid: string
        }
        Returns: number
      }
    }
    Enums: {
      article_status: 'draft' | 'published' | 'scheduled'
    }
  }
}

// Type aliases for convenience
export type Category = Database['public']['Tables']['categories']['Row']
export type CategoryInsert = Database['public']['Tables']['categories']['Insert']
export type CategoryUpdate = Database['public']['Tables']['categories']['Update']

export type Article = Database['public']['Tables']['articles']['Row']
export type ArticleInsert = Database['public']['Tables']['articles']['Insert']
export type ArticleUpdate = Database['public']['Tables']['articles']['Update']

export type ArticleImage = Database['public']['Tables']['article_images']['Row']
export type ArticleImageInsert = Database['public']['Tables']['article_images']['Insert']

export type ArticleView = Database['public']['Tables']['article_views']['Row']
export type ArticleViewInsert = Database['public']['Tables']['article_views']['Insert']

export type AnalyticsDaily = Database['public']['Tables']['analytics_daily']['Row']
export type AnalyticsDailyInsert = Database['public']['Tables']['analytics_daily']['Insert']

export type ArticleRelation = Database['public']['Tables']['article_relations']['Row']
export type ArticleRelationInsert = Database['public']['Tables']['article_relations']['Insert']

