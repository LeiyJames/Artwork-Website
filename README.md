# Art Gallery Showcase Website

A fully responsive art gallery website with a stylish UI, filtering options, artwork upload functionality, and an engaging carousel with parallax effects.

## Features

- **Responsive Design:** Mobile-first approach with fluid grids and media queries
- **Dynamic Gallery Layout:** Masonry grid layout for beautiful artwork display
- **Advanced Filtering:** Filter artworks by artist and category
- **Artwork Upload:** User-friendly modal for uploading new artwork
- **Engaging Carousel:** Hero section with Swiper.js and parallax effects
- **Dark/Light Mode:** Theme toggle for optimal viewing experience
- **Supabase Integration:** Database and Storage for artwork management

## Tech Stack

- **Frontend:** React.js with Next.js
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Carousel:** Swiper.js with parallax plugin
- **Layout:** React Masonry CSS
- **Backend:** Supabase (PostgreSQL + Storage)

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/art-gallery-website.git
cd art-gallery-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your Supabase configuration:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)

2. In your Supabase project dashboard, go to Settings > API to find your project URL and anon key:
   - Copy the URL (looks like: `https://xxxxxxxxxxxx.supabase.co`)
   - Copy the `anon` public API key

3. Create a new table called `artworks` with the following columns:
   - `id` (uuid, primary key, default: `uuid_generate_v4()`)
   - `title` (text, not null)
   - `artist` (text, not null)
   - `category` (text, not null)
   - `description` (text)
   - `imageUrl` (text, not null)
   - `createdAt` (timestamp with time zone, not null, default: `now()`)
   - `featured` (boolean, not null, default: `false`)

4. Create a storage bucket:
   - Go to Storage in your Supabase dashboard
   - Create a new bucket called `artwork-images`
   - Set the public access to "true" in the bucket settings

5. Set up storage policies:
   - In your bucket settings, create a new policy
   - Allow uploads from authenticated and anonymous users
   - Allow downloads by everyone

6. Add your Supabase URL and anon key to the `.env.local` file:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Development Mode without Supabase

For development purposes, the application will use mock data if Supabase is not properly configured. This allows you to develop and test the UI without setting up a Supabase project immediately.

## Troubleshooting

### "supabaseUrl is required" Error

If you see this error, it means that the application is not finding your Supabase URL. Make sure you:

1. Have created a `.env.local` file in the root directory
2. Have added the correct `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` values
3. Have restarted the development server after adding the environment variables

Example `.env.local` file:
```
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Cannot Insert Data

If you're having issues inserting data into your Supabase database, check:

1. That your table structure matches the expected structure
2. That your Row Level Security (RLS) policies are correctly configured
3. That your anon key has the correct permissions

## Project Structure

```
├── src/
│   ├── app/                    # Next.js app directory
│   ├── components/             # React components
│   │   ├── ArtworkCard.tsx     # Individual artwork card
│   │   ├── ClientWrapper.tsx   # Client-side wrapper
│   │   ├── Gallery.tsx         # Main gallery with filtering
│   │   ├── HeroCarousel.tsx    # Hero carousel with parallax
│   │   ├── Navbar.tsx          # Navigation with theme toggle
│   │   └── UploadModal.tsx     # Upload artwork modal
│   ├── contexts/               # React contexts
│   │   └── DarkModeContext.tsx # Dark mode context
│   ├── lib/                    # Library code
│   │   └── supabase.ts         # Supabase configuration
│   ├── types/                  # TypeScript types
│   │   └── index.ts            # Type definitions
│   └── utils/                  # Utility functions
│       └── supabaseHelpers.ts  # Supabase helper functions
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
