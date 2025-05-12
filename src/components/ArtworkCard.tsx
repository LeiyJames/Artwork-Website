import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Artwork } from '@/types';

interface ArtworkCardProps {
  artwork: Artwork;
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative h-0 pb-[100%]">
        <Image
          src={artwork.imageUrl}
          alt={artwork.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
            isHovered ? 'opacity-70' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute inset-0 p-4 flex flex-col justify-end transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h3 className="text-xl font-bold text-white">{artwork.title}</h3>
          <p className="text-sm text-white">by {artwork.artist}</p>
          <div className="mt-2">
            <span className="inline-block bg-white bg-opacity-20 text-white text-xs px-2 py-1 rounded">
              {artwork.category}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 dark:text-white">
        <h3 className="text-lg font-semibold">{artwork.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">by {artwork.artist}</p>
      </div>
    </motion.div>
  );
} 