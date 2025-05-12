import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';
import { Artwork } from '@/types';
import { getFeaturedArtworks } from '@/utils/supabaseHelpers';
import Image from 'next/image';

export default function HeroCarousel() {
  const [featuredArtworks, setFeaturedArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedArtworks = async () => {
      try {
        const artworks = await getFeaturedArtworks(5);
        setFeaturedArtworks(artworks);
      } catch (error) {
        console.error('Error loading featured artworks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedArtworks();
  }, []);

  if (loading) {
    return (
      <div className="h-[50vh] bg-black flex items-center justify-center">
        <div className="animate-pulse text-white text-2xl">Loading featured artwork...</div>
      </div>
    );
  }

  // If no featured artworks, show placeholder
  if (featuredArtworks.length === 0) {
    return (
      <div className="h-[50vh] bg-black flex items-center justify-center">
        <div className="text-white text-2xl">No featured artwork available</div>
      </div>
    );
  }

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Parallax]}
        effect="fade"
        parallax={{
          enabled: true,
        }}
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-full"
      >
        {featuredArtworks.map((artwork) => (
          <SwiperSlide key={artwork.id} className="relative w-full h-full">
            <div className="w-full h-full relative">
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                fill
                className="object-cover"
                data-swiper-parallax="-30%"
                priority
              />
              <div
                className="absolute inset-0 bg-black bg-opacity-30"
                data-swiper-parallax="-20%"
              />
              <div
                className="absolute bottom-0 left-0 p-8 w-full md:max-w-2xl text-white"
                data-swiper-parallax="-300"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-2">{artwork.title}</h2>
                <p className="text-xl md:text-2xl mb-4">by {artwork.artist}</p>
                {artwork.description && (
                  <p className="text-sm md:text-base opacity-80">{artwork.description}</p>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
} 