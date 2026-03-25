-- ============================================================
-- Unified Profile Schema
-- A single "users" table serves both travellers and locals.
-- Role (local vs traveller) is DERIVED at query time:
--   local     → user.home_city matches the viewer's destination
--   traveller → user has an active trip to the viewer's destination
-- ============================================================

-- Users / Profiles table
CREATE TABLE users (
  id          uuid REFERENCES auth.users NOT NULL PRIMARY KEY,
  email       text UNIQUE NOT NULL,
  name        text,
  age         integer,
  bio         text,
  avatar      text,                          -- emoji fallback when no photo
  photos      jsonb,                         -- string[] of photo URLs
  home_city   text,                          -- "{city}, {country}" — key field for Local classification
  interests   text[],                        -- e.g. {'Photography','Street Food','Jazz'}
  is_premium  boolean DEFAULT false,
  created_at  timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Trips table
-- current_trip = WHERE is_active = true (max 1 per user)
-- past_trips   = WHERE is_active = false ORDER BY end_date DESC
CREATE TABLE trips (
  id               uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id          uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  destination_city text NOT NULL,
  country          text,
  start_date       date NOT NULL,
  end_date         date NOT NULL,
  is_active        boolean DEFAULT false,
  created_at       timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Only one active trip per user at a time
CREATE UNIQUE INDEX one_active_trip_per_user
  ON trips (user_id)
  WHERE is_active = true;

-- Swipes table
CREATE TABLE swipes (
  id               uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  swiper_id        uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  swipee_id        uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  is_right_swipe   boolean NOT NULL,
  is_premium_swipe boolean DEFAULT false,   -- true if matched from 'Local' stack
  created_at       timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(swiper_id, swipee_id)
);

-- Matches table
CREATE TABLE matches (
  id         uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user1_id   uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  user2_id   uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(least(user1_id, user2_id), greatest(user1_id, user2_id))
);
