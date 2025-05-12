/*
  # Create artworks table and security policies

  1. New Tables
    - `artworks`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `artist` (text, not null)
      - `category` (text, not null)
      - `description` (text)
      - `imageUrl` (text, not null)
      - `createdAt` (timestamptz, not null)
      - `featured` (boolean, not null)

  2. Security
    - Enable RLS on `artworks` table
    - Add policies for:
      - Public read access
      - Authenticated users can create artworks
      - Owners can update their artworks
      - Owners can delete their artworks
*/

-- Create artworks table
CREATE TABLE IF NOT EXISTS artworks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  artist text NOT NULL,
  category text NOT NULL,
  description text,
  imageUrl text NOT NULL,
  createdAt timestamptz NOT NULL DEFAULT now(),
  featured boolean NOT NULL DEFAULT false,
  user_id uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view artworks"
  ON artworks
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create artworks"
  ON artworks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own artworks"
  ON artworks
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own artworks"
  ON artworks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS artworks_user_id_idx ON artworks(user_id);
CREATE INDEX IF NOT EXISTS artworks_category_idx ON artworks(category);
CREATE INDEX IF NOT EXISTS artworks_featured_idx ON artworks(featured);