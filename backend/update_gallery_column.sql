-- Update events table for gallery folder feature
-- Run this SQL in your Supabase SQL Editor

-- If you previously added 'gallery' column, drop it (optional, only if you want to start fresh)
ALTER TABLE public.events DROP COLUMN IF EXISTS gallery;

-- Add gallery_folder_url column to store Google Drive folder share link
ALTER TABLE public.events 
ADD COLUMN IF NOT EXISTS gallery_folder_url text NULL;

-- Add a comment to describe the column
COMMENT ON COLUMN public.events.gallery_folder_url IS 'Google Drive folder share link containing event photos and videos. Format: https://drive.google.com/drive/folders/FOLDER_ID';

-- Example gallery_folder_url value:
-- "https://drive.google.com/drive/folders/1abc123xyz456..."
