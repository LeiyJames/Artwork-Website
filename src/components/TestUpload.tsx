'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export default function TestUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      // Upload file to Supabase
      const fileExt = file.name.split('.').pop();
      const fileName = `test_${Date.now()}.${fileExt}`;
      const filePath = `test-uploads/${fileName}`;

      console.log('Uploading to:', filePath);

      const { error: uploadError } = await supabase.storage
        .from('artwork-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        setError(`Upload failed: ${uploadError.message}`);
        return;
      }

      // Get URL
      const { data } = supabase.storage
        .from('artwork-images')
        .getPublicUrl(filePath);

      console.log('URL generated:', data.publicUrl);
      setImageUrl(data.publicUrl);
    } catch (error) {
      console.error('Error:', error);
      setError(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 border rounded-lg bg-white dark:bg-gray-800 max-w-md mx-auto my-8">
      <h2 className="text-xl font-bold mb-4">Supabase Storage Test</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Test Image Upload
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Test Upload'}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {imageUrl && (
        <div className="mt-4">
          <p className="mb-2 text-sm">Uploaded Image URL:</p>
          <div className="mb-2 text-xs break-all overflow-x-auto p-2 bg-gray-100 dark:bg-gray-700 rounded">
            {imageUrl}
          </div>
          <div className="relative h-48 w-full rounded overflow-hidden">
            <Image
              src={imageUrl}
              alt="Uploaded image"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
} 