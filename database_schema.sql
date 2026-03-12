-- Users table
CREATE TABLE users (
  id uuid REFERENCES auth.users NOT NULL PRIMARY KEY,
  email text UNIQUE NOT NULL,
  name text,
  bio text,
  photos jsonb, -- Array of photo URLs
  home_city text, -- Useful for the Local Guide premium stack
  is_premium boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Trips table
CREATE TABLE trips (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  destination_city text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Swipes table
CREATE TABLE swipes (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  swiper_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  swipee_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  is_right_swipe boolean NOT NULL,
  is_premium_swipe boolean DEFAULT false, -- True if matched from the 'Local' stack
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(swiper_id, swipee_id)
);

-- Matches table
CREATE TABLE matches (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user1_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  user2_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(least(user1_id, user2_id), greatest(user1_id, user2_id))
);
