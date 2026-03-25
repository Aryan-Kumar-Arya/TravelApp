# Recommendation Research Template

This document captures the format, structure, and research methodology used to create authentic, high-quality recommendation cards for each city. Derived from the Hampi and Varkala research — the first two cities completed with real, verified data.

---

## Overview

Each city gets **30 recommendation cards** split evenly across 3 categories:
- **10 Cuisine** — real restaurants, street food, and local dishes
- **10 Experience** — must-do activities, temples, treks, cultural experiences
- **10 Stays** — hostels, guesthouses, homestays, and hotels (budget to luxury)

---

## Data Structure (per card)

```javascript
{
  uniqueId: '{city-slug}-{tag}-{###}',       // e.g. 'hampi-cuisine-001'
  city: 'City Name',
  region: 'Region',                           // e.g. 'South India'
  country: 'India',
  coordinates: { lat: 00.0000, lng: 00.0000 },  // actual lat/lng of the specific spot
  timezone: 'Asia/Kolkata',
  recNumber: 1,                               // 1-10 within each tag
  tag: 'cuisine' | 'experience' | 'stays',
  source: 'local' | 'traveller',             // who would recommend this
  title: 'Short Name',                        // minimalistic — just the dish/activity/property name
  location: 'Venue Name',                     // minimalistic — just the venue or spot name, no area/neighbourhood
  description: '...',                         // 1-3 sentence vivid description (include pricing info here)
  photo: 'https://images.unsplash.com/...',   // Unsplash image URL (600x900 crop)
  webLink: 'https://...',                     // real, verifiable link (TripAdvisor, Booking, official site, etc.)
}
```

**Important — no additional fields.** Do not add price, pricePerNight, or any other fields beyond those listed above. All pricing information goes inside the `description` field.

---

## Field Guidelines: title & location

Keep both fields **minimalistic**. They appear as card headings, so brevity matters.

### title
- Just the dish name, activity name, or property name
- Do NOT include the venue/location in the title (it has its own field)
- Do NOT include redundant info that repeats in `location`
- Examples:
  - Good: `'Karimeen Pollichathu'`, `'Learn to Surf'`, `'Zostel Varkala'`
  - Bad: `'Karimeen Pollichathu at Karimbumkala Toddy Shop'`, `'Holy Dip at Papanasam'`

### location
- Just the venue or spot name — no neighbourhood/area suffix unless it IS the name
- Examples:
  - Good: `'Juicy Cafe'`, `'Papanasam Beach'`, `'North Cliff'`
  - Bad: `'Juicy Cafe, North Middle Cliff'`, `'Papanasam Beach, Varkala'`

---

## Research Process (per city)

### Step 1: Cuisine (10 cards)

Research the top-rated and most-loved food experiences. Aim for a mix of:

| Slot | Type | Example (Hampi) | Example (Varkala) |
|------|------|-----------------|-------------------|
| 1-3 | Iconic local dishes at real restaurants | Banana Leaf Thali @ Mango Tree, Masala Dosa @ Taste of Brahmins | Kerala Fish Curry @ Juicy Cafe, Karimeen Pollichathu @ Karimbumkala |
| 4-5 | Traveller-favourite cafes/restaurants | Falafel @ Laughing Buddha | Seafood Platter @ Clafouti, Snickers Shake @ Sun Francisco |
| 6-7 | Hyper-local snacks only locals know | Paddu @ Sagar Hotel, Khaara Mandakki @ Yankappa Chai Point | Puttu & Kadala @ Local Tea Shops, Appam & Egg Curry @ Tickety Boo |
| 8-9 | Unique/unexpected finds | Wood-Fired Pizza @ The Goan Corner | Wood-Fired Pizza @ Inda Cafe, Momos @ Little Tibet |
| 10 | Street food / drink | Fresh Sugarcane Juice @ Street Carts | Pazham Pori & Chai @ Street Carts |

**Sources to search:**
- TripAdvisor top restaurants for the city
- Google Maps reviews (sort by rating)
- Travel blogs (e.g. "best food in [city]", "where locals eat in [city]")
- Local food blog articles (e.g. crazymasalafood.com, storiesofraku.com)
- Reddit threads (r/IndiaTravelAdvice, r/solotravel)

**What to capture per entry:**
- Exact restaurant/stall name
- Specific dish to highlight (not just the restaurant)
- What makes it special (story, history, technique, ingredient)
- Approximate price in INR (goes in description, not a separate field)
- Actual TripAdvisor/Google/blog link

### Step 2: Experiences (10 cards)

Research the top activities and must-do experiences. Aim for a mix of:

| Slot | Type | Example (Hampi) | Example (Varkala) |
|------|------|-----------------|-------------------|
| 1-2 | Iconic/bucket-list experiences | Matanga Hill Sunrise Trek, Vittala Temple Stone Chariot | Cliff Walk at Sunset, Sacred Dip at Papanasam |
| 3-4 | Active/adventure activities | Coracle Ride, Bouldering | Learn to Surf, Backwater Kayaking |
| 5-6 | Cultural/historical/spiritual | Morning Puja at Virupaksha, Cycle the Ruins | Morning Puja at Janardhana Temple, Hilltop Ashram at Sivagiri |
| 7-8 | Offbeat/chill vibes | Cross to Hippie Island, Royal Enclosure | Island Temple at Ponnumthuruthu, Sunrise Yoga |
| 9-10 | Sunset/nature/day-trip | Sunset at Hemakuta Hill, Sanapur Lake | Giant Bird Sculpture at Jatayu, Black Beach Bonfire |

**Sources to search:**
- TripAdvisor "Top Things to Do" for the city
- Incredible India / state tourism sites (incredibleindia.gov.in, keralatourism.org)
- Travel blogs ("top experiences in [city]", "hidden gems [city]")
- Hostelworld/Lonely Planet city guides

**What to capture per entry:**
- Exact location name
- What you actually do there (not just "visit")
- Practical details: entry fee, timing, difficulty, duration (in description)
- Why it's worth it — the emotional hook
- Official website or TripAdvisor attraction link

### Step 3: Stays (10 cards)

Research accommodations across the full budget spectrum:

| Slot | Type | Example (Hampi) | Example (Varkala) |
|------|------|-----------------|-------------------|
| 1-3 | Budget hostels/dorms | Zostel Hampi, Cocogreen Hampi, Hearthspace | Zostel Varkala, The Lost Hostel, Barefoot Hostels |
| 4-5 | Mid-range hostels/homestays | Thilak Home Stay, Gopi Guest House | Cliff & Coral, Kulture KonnectT |
| 6-7 | Character stays / homestays | Archana Guest House, Waterfall Guesthouse | Nirrvaan Homestay, Maadathil Cottages |
| 8 | Heritage / unique property | Hotel Gowri | Palm Tree Heritage |
| 9 | Mid-premium / retreat | Kishkinda Heritage Resort | Soul & Surf |
| 10 | Luxury splurge | Evolve Back Kamalapura Palace | Gateway Varkala (Taj) |

**Sources to search:**
- Hostelworld (for hostels, sorted by rating)
- Booking.com (sorted by rating, filtered by budget tiers)
- TripAdvisor hotels (sorted by traveller ranked)
- Google Maps reviews

**What to capture per entry:**
- Exact property name
- Neighbourhood/area within the city
- What makes it stand out (host, view, vibe, community)
- Starting price per night in INR (goes in description, not a separate field)
- Booking.com, Hostelworld, or TripAdvisor link

---

## Presentation Format (for review before writing)

Before writing to `recommendations.js`, present research as **3 tables** (cuisine, experience, stays) with these columns:

| # | Source | Title | Location | Description |
|---|--------|-------|----------|-------------|

- No price column (pricing is inside description)
- No webLink column in the review table (saves space; links go in the JS)
- User reviews and approves before any code is written

---

## Writing Guide for Descriptions

Descriptions should feel like a **knowledgeable friend** telling you where to go — not a guidebook or ad copy.

### Tone
- Vivid but concise (1-3 sentences)
- Specific details over generic praise ("thick jowar flatbread on a banana leaf" not "delicious local food")
- Include sensory language (taste, sound, smell, visual)
- Mention prices in INR where relevant (this is where pricing lives — in the description)
- Include practical tips (timing, what to order, what to avoid)

### Patterns to replicate

**Cuisine:**
> "The most authentic Kerala-style food on the cliff at rock-bottom prices. Rice, fish curry, thoran, sambar, and rasam on a steel plate — exactly how locals eat lunch."

> "Pearl spot fish marinated in red chilli-turmeric paste, wrapped in banana leaf, and slow-grilled — Kerala's signature seafood dish."

> "The real taste of North Karnataka — thick jowar flatbread on a banana leaf with dal, vegetable palya, buttermilk, and rice."

**Experience:**
> "Walk the laterite cliff edge as the Arabian Sea turns gold below. The 2 km path runs past cafes, shops, and Ayurveda parlours with an unbroken ocean panorama."

> "A 2,000-year-old Vishnu temple perched on the cliff overlooking the sea — often called 'Dakshin Kashi' (Varanasi of the South)."

> "Wake at 5 AM and trek 30 minutes up Hampi's highest point. At the top, a full 360-degree panorama."

**Stays:**
> "Vibrant native wall art, breezy terrace with sea views, rooftop loungers, coconut-tree setting. India's biggest hostel chain. Dorm beds from ₹500/night."

> "Taj property overlooking the Arabian Sea — infinity pool, spa, tennis court, multi-cuisine restaurant. The luxury option. From ₹7,000/night."

> "The splurge option — a luxury palace recreating Vijayanagara grandeur with stone-paved boulevards and regal chambers. From ₹31,000/night."

### Anti-patterns (avoid)
- "Ask any food lover in [city] where to find the best X, and they will point you here" (generic template)
- "This soul-warming version of the classic dish" (vague)
- "Arrive early before they sell out" (filler when you don't know the place)
- "Get off the beaten path with this [adjective] [noun]" (generic template)
- "The ultimate [property type] for anyone spending time in India" (generic template)
- Recommending North Indian dishes (Butter Chicken, Chole Bhature, Rogan Josh) in South Indian cities
- Using the same description template with swapped nouns
- Adding price as a separate field (it goes in description)

---

## Source Tags

- `source: 'local'` — a dish/spot that locals frequent; may not appear on top tourist lists
- `source: 'traveller'` — popular with backpackers/tourists; well-reviewed on travel platforms

Aim for roughly 50/50 split between local and traveller sources per category.

---

## Photo URLs

Use Unsplash images that visually match the dish/experience/property. Format:
```
https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=600&h=900&q=80
```

Choose photos that are:
- Vertically oriented (portrait) or work well when cropped to 600x900
- Authentic-looking (not overly styled stock photography)
- Relevant to the specific item (a thali photo for a thali card, cliffs for a cliff experience, etc.)

---

## Coordinates

Use **specific coordinates** for each spot, not just the city centre. This matters for map pin accuracy:
- For restaurants: the actual restaurant location
- For experiences: the trailhead/entrance/viewpoint
- For stays: the property location

Get coordinates from Google Maps (right-click > "What's here?").

---

## Checklist Before Finalizing a City

- [ ] 10 cuisine cards with real restaurant names and verified links
- [ ] 10 experience cards with real locations and verified links
- [ ] 10 stays cards across budget tiers with verified links
- [ ] All descriptions are unique, vivid, and specific (no template repetition)
- [ ] Cuisine reflects the actual local food culture (not generic Indian dishes)
- [ ] Coordinates are specific to each spot (not all pointing to city centre)
- [ ] Source tags are roughly 50/50 local/traveller
- [ ] recNumbers run 1-10 within each tag
- [ ] uniqueIds follow pattern: `{city-slug}-{tag}-{###}`
- [ ] All webLinks are real URLs (TripAdvisor, Booking, official sites)
- [ ] Photo URLs are valid Unsplash links
- [ ] Title and location fields are minimalistic (no redundancy between them)
- [ ] Pricing info is in description only (no separate price field)
- [ ] Tables presented to user for review before writing to recommendations.js
