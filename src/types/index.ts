export interface Artwork {
  id: string;
  title: string;
  artist: string;
  category: string;
  imageUrl: string;
  description?: string;
  createdAt: number;
  featured?: boolean;
}

export type ArtworkCategory = 'Painting' | 'Digital' | 'Sculpture' | 'Photography' | 'Mixed Media' | 'All';

export interface FilterOptions {
  artist: string;
  category: ArtworkCategory;
}

export interface UploadFormData {
  title: string;
  artist: string;
  category: ArtworkCategory;
  description?: string;
  image: File | null;
} 