# Supabase Setup Instructions

## 1. Create Storage Bucket

In Supabase Dashboard:
1. Go to **Storage** section
2. Click **Create a new bucket**
3. Name it: `challenges`
4. Make it **public** (allow unauthenticated access)
5. Click **Create bucket**

## 2. Create Database Table

Run this SQL query in your Supabase SQL Editor:

```sql
-- Create submissions table
CREATE TABLE submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL,
  challenge_id INTEGER NOT NULL,
  challenge_title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('image', 'video', 'audio')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add indexes for faster queries
CREATE INDEX idx_submissions_user_id ON submissions(user_id);
CREATE INDEX idx_submissions_challenge_id ON submissions(challenge_id);
CREATE INDEX idx_submissions_created_at ON submissions(created_at DESC);

-- Enable Row Level Security (Optional - for public access without auth)
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read/write
CREATE POLICY "Allow public access" ON submissions
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

## 3. Storage Bucket Policies

In the **Storage** section, click on the `challenges` bucket and go to **Policies**:

Create a new policy:
- Allow: `SELECT, INSERT, UPDATE, DELETE`
- For: `Public`
- Targets: `All`

Or run this SQL:

```sql
CREATE POLICY "Allow public uploads" ON storage.objects
  FOR ALL
  USING (bucket_id = 'challenges')
  WITH CHECK (bucket_id = 'challenges');
```

## 4. Environment Variables

Make sure your `.env.local` file has:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Features Implemented

✅ **Challenge Selection Page** - Browse 6 different challenges
✅ **Recording Features** - Audio and video recording built-in
✅ **File Upload** - Upload images, audio, and video files
✅ **Anonymous Submissions** - No authentication required
✅ **User History** - View all your submissions with stats
✅ **Supabase Integration** - Storage + Database
✅ **Responsive Design** - Mobile-friendly UI
✅ **Media Preview** - See your recordings before uploading

## How It Works

1. User clicks "Start Today's 10-Minute Challenge" → Goes to `/challenges`
2. User selects a challenge → Goes to `/challenges/[id]`
3. User records/uploads media → File stored in Supabase Storage
4. Submission saved to database with user_id, challenge_id, file_url
5. User can view history at `/history` → Shows all submissions
6. User ID stored in localStorage (no authentication needed)

## Database Schema

```
submissions table:
- id (UUID, Primary Key)
- user_id (TEXT) - Anonymous user identifier
- challenge_id (INTEGER) - Challenge number (1-6)
- challenge_title (TEXT) - Challenge name
- file_url (TEXT) - Public URL to file in storage
- file_type (TEXT) - 'image', 'video', or 'audio'
- created_at (TIMESTAMP) - When submitted
- updated_at (TIMESTAMP) - Last modified
```

## Testing

1. Go to `http://localhost:3000`
2. Click "Start Today's 10-Minute Challenge"
3. Select a challenge (e.g., "Record a 1-Minute Video")
4. Record or upload a file
5. Click "Submit Entry"
6. View your submission at `/history`