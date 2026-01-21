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
      articles: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          cover_image: string
          category: string
          tags: string[]
          status: 'draft' | 'published'
          views: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt: string
          content: string
          cover_image: string
          category: string
          tags?: string[]
          status?: 'draft' | 'published'
          views?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          cover_image?: string
          category?: string
          tags?: string[]
          status?: 'draft' | 'published'
          views?: number
          created_at?: string
          updated_at?: string
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
    }
    Enums: {
      article_status: 'draft' | 'published'
    }
  }
}

// Type aliases for convenience
export type Article = Database['public']['Tables']['articles']['Row']
export type ArticleInsert = Database['public']['Tables']['articles']['Insert']
export type ArticleUpdate = Database['public']['Tables']['articles']['Update']

export type ArticleView = Database['public']['Tables']['article_views']['Row']
export type ArticleViewInsert = Database['public']['Tables']['article_views']['Insert']
