'use client';

import TestUpload from '@/components/TestUpload';

export default function TestUploadPage() {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8 text-center">Supabase Storage Test Page</h1>
      <TestUpload />
    </div>
  );
} 