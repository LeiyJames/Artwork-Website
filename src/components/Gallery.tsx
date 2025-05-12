import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { motion, AnimatePresence } from 'framer-motion';
import ArtworkCard from '@/components/ArtworkCard';
import { Artwork, ArtworkCategory, FilterOptions } from '@/types';
import { getArtworks, getArtists } from '@/utils/supabaseHelpers';

const breakpointColumns = {
  default: 3,
  1100: 2,
  700: 1
};

const categories: ArtworkCategory[] = ['All', 'Painting', 'Digital', 'Sculpture', 'Photography', 'Mixed Media'];

export default function Gallery() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
  const [artists, setArtists] = useState<string[]>(['All']);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    artist: 'All',
    category: 'All'
  });
  const [loading, setLoading] = useState(true);

  // Load artworks and artists
  useEffect(() => {
    const fetchData = async () => {
      try {
        const artworksData = await getArtworks();
        setArtworks(artworksData);
        setFilteredArtworks(artworksData);
        
        const artistsData = await getArtists();
        setArtists(['All', ...artistsData]);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters when filter options change
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...artworks];
      
      if (filterOptions.category !== 'All') {
        filtered = filtered.filter(artwork => artwork.category === filterOptions.category);
      }
      
      if (filterOptions.artist !== 'All') {
        filtered = filtered.filter(artwork => artwork.artist === filterOptions.artist);
      }
      
      setFilteredArtworks(filtered);
    };
    
    applyFilters();
  }, [filterOptions, artworks]);

  const handleFilterChange = (type: keyof FilterOptions, value: string) => {
    setFilterOptions(prev => ({
      ...prev,
      [type]: value
    }));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 min-h-[50vh] flex items-center justify-center">
        <div className="animate-pulse text-2xl">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold">Gallery</h2>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Category filter */}
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium mb-1">
              Category
            </label>
            <select
              id="category-filter"
              value={filterOptions.category}
              onChange={(e) => handleFilterChange('category', e.target.value as ArtworkCategory)}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 dark:text-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          {/* Artist filter */}
          <div>
            <label htmlFor="artist-filter" className="block text-sm font-medium mb-1">
              Artist
            </label>
            <select
              id="artist-filter"
              value={filterOptions.artist}
              onChange={(e) => handleFilterChange('artist', e.target.value)}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 dark:text-white"
            >
              {artists.map((artist) => (
                <option key={artist} value={artist}>
                  {artist}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {filteredArtworks.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl">No artworks found matching your filters.</p>
          <button 
            onClick={() => setFilterOptions({ artist: 'All', category: 'All' })}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <AnimatePresence>
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex -ml-4 w-auto"
            columnClassName="pl-4 bg-clip-padding mb-4"
          >
            {filteredArtworks.map((artwork) => (
              <div key={artwork.id} className="mb-4">
                <ArtworkCard artwork={artwork} />
              </div>
            ))}
          </Masonry>
        </AnimatePresence>
      )}
    </div>
  );
} 