-- Supabase SQL Schema for AI Trips
-- Run this in your Supabase SQL Editor

-- 1. Create the trips table
CREATE TABLE public.trips (
    id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    destination TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    interests TEXT[],
    itinerary_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Setup Row Level Security (RLS)
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own trips
CREATE POLICY "Users can insert their own trips" 
ON public.trips FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- Allow users to read their own trips
CREATE POLICY "Users can view their own trips" 
ON public.trips FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- Allow users to delete their own trips
CREATE POLICY "Users can delete their own trips" 
ON public.trips FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);
