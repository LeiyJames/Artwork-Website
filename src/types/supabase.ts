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
      artworks: {
        Row: {
          id: string
          title: string
          artist: string
          category: string
          description: string | null
          imageUrl: string
          createdAt: string
          featured: boolean
          user_id: string | null
        }
        Insert: {
          id?: string
          title: string
          artist: string
          category: string
          description?: string | null
          imageUrl: string
          createdAt?: string
          featured?: boolean
          user_id?: string | null
        }
        Update: {
          id?: string
          title?: string
          artist?: string
          category?: string
          description?: string | null
          imageUrl?: string
          createdAt?: string
          featured?: boolean
          user_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}