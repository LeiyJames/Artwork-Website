import { supabase } from '@/lib/supabase';
import { Artwork, ArtworkCategory, UploadFormData } from '@/types';

// Mock data for development when Supabase is not configured
const mockArtworks: Artwork[] = [
  {
    id: '1',
    title: 'Colorful Abstract',
    artist: 'Jane Doe',
    category: 'Painting',
    imageUrl: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=800',
    description: 'A vibrant abstract painting with bold colors and shapes.',
    createdAt: Date.now(),
    featured: true
  },
  {
    id: '2',
    title: 'Urban Landscape',
    artist: 'John Smith',
    category: 'Photography',
    imageUrl: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=800',
    description: 'A stunning photograph of a cityscape at night.',
    createdAt: Date.now() - 86400000,
    featured: true
  },
  {
    id: '3',
    title: 'Digital Dreams',
    artist: 'Alex Johnson',
    category: 'Digital',
    imageUrl: 'https://images.unsplash.com/photo-1633186710895-309db2dfb009?auto=format&fit=crop&w=800',
    description: 'A digital art piece exploring surreal landscapes.',
    createdAt: Date.now() - 172800000,
    featured: true
  },
  {
    id: '4',
    title: 'Marble Elegance',
    artist: 'Maria Garcia',
    category: 'Sculpture',
    imageUrl: 'https://images.unsplash.com/photo-1544413164-5f1b295af371?auto=format&fit=crop&w=800',
    description: 'A marble sculpture with flowing, elegant lines.',
    createdAt: Date.now() - 259200000,
    featured: false
  },
  {
    id: '5',
    title: 'Mixed Emotions',
    artist: 'Sam Taylor',
    category: 'Mixed Media',
    imageUrl: 'https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?auto=format&fit=crop&w=800',
    description: 'A mixed media piece combining various materials and techniques.',
    createdAt: Date.now() - 345600000,
    featured: false
  }
];

// Check if we're in development and Supabase is not properly configured
const isDevWithoutSupabase = 
  process.env.NODE_ENV !== 'production' && 
  (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Get all artworks from Supabase
export const getArtworks = async (filterCategory?: ArtworkCategory, filterArtist?: string) => {
  try {
    // Use mock data in development if Supabase is not configured
    if (isDevWithoutSupabase) {
      console.log('Using mock artwork data');
      let filteredData = [...mockArtworks];
      
      if (filterCategory && filterCategory !== 'All') {
        filteredData = filteredData.filter(artwork => artwork.category === filterCategory);
      }
      
      if (filterArtist && filterArtist !== 'All') {
        filteredData = filteredData.filter(artwork => artwork.artist === filterArtist);
      }
      
      return filteredData;
    }
    
    // Normal Supabase query
    let query = supabase
      .from('artworks')
      .select('*')
      .order('createdAt', { ascending: false });
    
    // Add filters if provided
    if (filterCategory && filterCategory !== 'All') {
      query = query.eq('category', filterCategory);
    }
    
    if (filterArtist && filterArtist !== 'All') {
      query = query.eq('artist', filterArtist);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return data as Artwork[];
  } catch (error) {
    console.error('Error getting artworks:', error);
    // Fallback to mock data on error
    return mockArtworks;
  }
};

// Get featured artworks for carousel
export const getFeaturedArtworks = async (numberOfItems = 5) => {
  try {
    // Use mock data in development if Supabase is not configured
    if (isDevWithoutSupabase) {
      console.log('Using mock featured artwork data');
      return mockArtworks.filter(artwork => artwork.featured).slice(0, numberOfItems);
    }
    
    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .eq('featured', true)
      .order('createdAt', { ascending: false })
      .limit(numberOfItems);
    
    if (error) throw error;
    
    return data as Artwork[];
  } catch (error) {
    console.error('Error getting featured artworks:', error);
    // Fallback to mock featured data on error
    return mockArtworks.filter(artwork => artwork.featured).slice(0, numberOfItems);
  }
};

// Upload an artwork image to Supabase Storage
export const uploadArtworkImage = async (file: File) => {
  try {
    // Simulate upload in development if Supabase is not configured
    if (isDevWithoutSupabase) {
      console.log('Simulating image upload in development mode');
      // Return a placeholder image URL
      return 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=800';
    }
    
    console.log('Starting image upload to Supabase...');
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `artworks/${fileName}`;
    
    console.log(`Prepared file path: ${filePath}`);
    
    const { error: uploadError, data: uploadData } = await supabase.storage
      .from('artwork-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw uploadError;
    }
    
    console.log('Upload successful:', uploadData);
    
    // Get public URL
    const { data } = supabase.storage
      .from('artwork-images')
      .getPublicUrl(filePath);
    
    console.log('Generated public URL:', data.publicUrl);
    
    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    // Return a placeholder image on error
    alert('Failed to upload image. Check console for details.');
    return 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=800';
  }
};

// Add new artwork to Supabase
export const addArtwork = async (formData: UploadFormData) => {
  try {
    if (!formData.image) throw new Error('No image provided');
    
    // Simulate adding artwork in development if Supabase is not configured
    if (isDevWithoutSupabase) {
      console.log('Simulating adding artwork in development mode');
      // Create a mock artwork
      const mockArtwork: Artwork = {
        id: `mock-${Date.now()}`,
        title: formData.title,
        artist: formData.artist,
        category: formData.category,
        description: formData.description || '',
        imageUrl: await uploadArtworkImage(formData.image),
        createdAt: Date.now(),
        featured: false
      };
      
      // Add to our mock data for this session
      mockArtworks.unshift(mockArtwork);
      
      return mockArtwork;
    }
    
    // Upload image to Supabase Storage
    const imageUrl = await uploadArtworkImage(formData.image);
    
    // Add artwork to Supabase
    const { data, error } = await supabase
      .from('artworks')
      .insert([{
        title: formData.title,
        artist: formData.artist,
        category: formData.category,
        description: formData.description || '',
        imageUrl,
        createdAt: new Date().toISOString(),
        featured: false, // Default to not featured
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    return data as Artwork;
  } catch (error) {
    console.error('Error adding artwork:', error);
    // Return created mock artwork on error
    const mockArtwork: Artwork = {
      id: `error-${Date.now()}`,
      title: formData.title,
      artist: formData.artist,
      category: formData.category,
      description: formData.description || '',
      imageUrl: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=800',
      createdAt: Date.now(),
      featured: false
    };
    
    return mockArtwork;
  }
};

// Get all unique artists
export const getArtists = async () => {
  try {
    // Use mock data in development if Supabase is not configured
    if (isDevWithoutSupabase) {
      console.log('Using mock artist data');
      const uniqueArtists = new Set(mockArtworks.map(artwork => artwork.artist));
      return Array.from(uniqueArtists);
    }
    
    const { data, error } = await supabase
      .from('artworks')
      .select('artist');
    
    if (error) throw error;
    
    // Extract unique artists
    const uniqueArtists = new Set(data.map(item => item.artist));
    return Array.from(uniqueArtists);
  } catch (error) {
    console.error('Error getting artists:', error);
    // Fallback to mock artists on error
    const uniqueArtists = new Set(mockArtworks.map(artwork => artwork.artist));
    return Array.from(uniqueArtists);
  }
}; 