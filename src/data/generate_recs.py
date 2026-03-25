import json
import random
import re
import math
import os

js_path = '/Users/aryankumararya/Documents/Antigravity Workspace/TravelApp/src/data/locations.js'
with open(js_path, 'r', encoding='utf-8') as f:
    js_content = f.read()

# Extract locations
locations = []
city_blocks = re.split(r'id:\s*[\'"]', js_content)[1:]
for block in city_blocks:
    id_match = block.split("'", 1)[0]
    city_match = re.search(r"city:\s*'([^']+)'", block)
    region_match = re.search(r"region:\s*'([^']+)'", block)
    country_match = re.search(r"country:\s*'([^']+)'", block)
    lat_match = re.search(r"lat:\s*([-\d.]+)", block)
    lng_match = re.search(r"lng:\s*([-\d.]+)", block)
    tz_match = re.search(r"timezone:\s*'([^']+)'", block)
    
    if city_match and lat_match and lng_match:
        locations.append({
            'id': id_match,
            'city': city_match.group(1),
            'region': region_match.group(1),
            'country': country_match.group(1),
            'lat': float(lat_match.group(1)),
            'lng': float(lng_match.group(1)),
            'timezone': tz_match.group(1)
        })

# --- Localized Data Dictionaries ---
CUISINES = {
    'Southeast Asia': ['Pad Thai', 'Khao Soi', 'Nasi Lemak', 'Char Kway Teow', 'Pho', 'Banh Mi', 'Hainanese Chicken Rice', 'Satay', 'Papaya Salad', 'Mango Sticky Rice'],
    'East Asia': ['Ramen', 'Sushi', 'Dim Sum', 'Xiao Long Bao', 'Bibimbap', 'Korean BBQ', 'Takoyaki', 'Peking Duck', 'Tonkatsu', 'Boba Tea'],
    'Western Europe': ['Croissant', 'Pastéis de Nata', 'Fish and Chips', 'Paella', 'Tapas', 'Raclette', 'Currywurst', 'Full English Breakfast', 'Stroopwafel', 'Macarons'],
    'Southern Europe': ['Pizza Margherita', 'Gelato', 'Cevapi', 'Souvlaki', 'Moussaka', 'Bolognese', 'Tiramisu', 'Cacio e Pepe', 'Fresh Seafood', 'Gyros'],
    'Central Europe': ['Goulash', 'Schnitzel', 'Pierogi', 'Trdelnik', 'Bratwurst', 'Pretzel', 'Sausage', 'Apple Strudel', 'Langos', 'Pilsner Beer'],
    'Latin America': ['Tacos al Pastor', 'Ceviche', 'Arepas', 'Empanadas', 'Feijoada', 'Asado', 'Churros', 'Pisco Sour', 'Moqueca', 'Tamales'],
    'North America': ['New York Slice', 'Mission Burrito', 'Poutine', 'Street Tacos', 'Bagel with Lox', 'Avocado Toast', 'Clam Chowder', 'Cheeseburger', 'Craft IPA', 'Pancakes'],
    'Africa': ['Tagine', 'Bunny Chow', 'Nyama Choma', 'Jollof Rice', 'Braai', 'Bobotie', 'Couscous', 'Biltong', 'Zanzibar Pizza', 'Mint Tea'],
    'Middle East': ['Shawarma', 'Falafel', 'Hummus', 'Shakshuka', 'Baklava', 'Kebab', 'Baba Ganoush', 'Kunafa', 'Pita Bread', 'Turkish Delight'],
    'Oceania': ['Meat Pie', 'Lamington', 'Flat White', 'Fish and Chips', 'Pavlova', 'Avocado Smash', 'Barramundi', 'Kangaroo Steak', 'Vegemite Toast', 'Tim Tams'],
    'India': ['Butter Chicken', 'Masala Dosa', 'Biryani', 'Chole Bhature', 'Pani Puri', 'Vada Pav', 'Rogan Josh', 'Palak Paneer', 'Filter Coffee', 'Samosa'],
}

def get_dishes(region, country):
    base = CUISINES.get(region, CUISINES['Southeast Asia'])
    if 'India' in country or 'India' in region:
        base = CUISINES['India']
    return base

ADJECTIVES = ['legendary', 'hidden', 'unassuming', 'bustling', 'beloved', 'secret', 'vibrant', 'historic', 'trendsetting', 'authentic', 'family-run', 'iconic', 'award-winning', 'cozy', 'minimalist']
FOOD_VENUES = ['stall', 'shophouse', 'bistro', 'night market', 'cafe', 'roastery', 'taverna', 'trattoria', 'dhaba', 'street cart', 'izakaya', 'cantina']
EXP_TYPES = ['sunrise viewpoint', 'ancient temple', 'local market', 'hidden waterfall', 'art district', 'hiking trail', 'cooking class', 'nightlife street', 'co-working hub', 'heritage walk']
STAY_TYPES = ['boutique hotel', 'backpacker hostel', 'coliving space', 'eco-lodge', 'heritage guesthouse', 'luxury resort', 'riverside cabin', 'city-center loft', 'artisan bed & breakfast']

PHOTOS = {
    'cuisine': ['1569050467447-ce54b3bbc37d', '1561651823-34feb02250e4', '1495474472287-4d71bcdd2085', '1512621776951-a57141f2eefd', '1555396273-367ea4eb4db5'],
    'experience': ['1528360983277-13d401cdc186', '1555597673-b21d5c935865', '1558618666-fcd25c85cd64', '1519389950473-47ba0277781c', '1563492065599-3520f775eeed'],
    'stays': ['1555854877-bab0e564b8d5', '1566073771259-6a8506099945', '1582719508461-905c673771fd', '1520250497591-112f2f40a3f4', '1497366216548-37526070297c']
}

def generate_offset_coords(lat, lng, max_km=45):
    # 1 degree lat is ~111km. 
    # offset by up to max_km
    r = max_km / 111.0
    u = random.uniform(0, 1)
    v = random.uniform(0, 1)
    w = r * math.sqrt(u)
    t = 2 * math.pi * v
    x = w * math.cos(t)
    y = w * math.sin(t)
    
    # adjust longitude for latitude
    x = x / math.cos(math.radians(lat))
    
    return round(lat + y, 4), round(lng + x, 4)

recommendations = []

for loc in locations:
    city = loc['city']
    region = loc['region']
    country = loc['country']
    dishes = get_dishes(region, country)
    
    for i in range(1, 31):
        if i <= 10:
            tag = 'cuisine'
            dish = random.choice(dishes)
            venue = random.choice(FOOD_VENUES)
            adj = random.choice(ADJECTIVES)
            name = f"{dish} at The {adj.capitalize()} {venue.capitalize()}"
            desc = f"Ask any food lover in {city} where to find the best {dish}, and they will point you here. This {adj} {venue} serves a soul-warming version of the classic dish. Arrive early before they sell out."
            source = random.choice(['local', 'local', 'traveller']) # skewed local
        elif i <= 20:
            tag = 'experience'
            exp = random.choice(EXP_TYPES)
            adj = random.choice(ADJECTIVES)
            name = f"The {adj.capitalize()} {exp.title()}"
            desc = f"Get off the beaten path with this {adj} {exp} just outside the bustling center of {city}. Whether you are catching the golden hour light or exploring the deep culture, this is an unforgettable addition to your itinerary."
            source = random.choice(['traveller', 'traveller', 'local']) # skewed traveller
        else:
            tag = 'stays'
            stay = random.choice(STAY_TYPES)
            adj = random.choice(ADJECTIVES)
            name = f"{city} {adj.capitalize()} {stay.title()}"
            amenity = random.choice(['fast fibre Wi-Fi', 'a vibrant social rooftop', 'a quiet jungle courtyard', 'free community dinners'])
            desc = f"The ultimate {stay} for anyone spending time in {country}. Featuring {amenity} and a perfect location for exploring, it blends comfort with the raw energy of {city}. Stays start at reasonable nomad-friendly rates."
            source = 'traveller'
            
        lat, lng = generate_offset_coords(loc['lat'], loc['lng'])
        photo_id = random.choice(PHOTOS[tag])
        
        # Unique ID format: tokyo-cuisine-001
        slug = re.sub(r'[^a-z0-9]+', '-', city.lower()).strip('-')
        str_i = str(i if i <= 10 else (i-10 if i <= 20 else i-20)).zfill(3)
        uid = f"{slug}-{tag}-{str_i}"
        
        recommendations.append({
            'uniqueId': uid,
            'city': city,
            'region': region,
            'country': country,
            'coordinates': {'lat': lat, 'lng': lng},
            'timezone': loc['timezone'],
            'recNumber': i if i <= 10 else (i-10 if i <= 20 else i-20),
            'tag': tag,
            'source': source,
            'title': name,
            'description': desc,
            'photo': f"https://images.unsplash.com/photo-{photo_id}?auto=format&fit=crop&w=600&h=900&q=80"
        })

# Write to file
out_path = '/Users/aryankumararya/Documents/Antigravity Workspace/TravelApp/src/data/recommendations.js'

js_output = [
    "// ─────────────────────────────────────────────────────────────────────────────",
    "// recommendations.js",
    "// 3000 Travel Recommendations (100 cities x 30 recs)",
    "// Generated with 50km offset coordinates and categorized by local vs traveller.",
    "// ─────────────────────────────────────────────────────────────────────────────",
    "",
    f"export const RECOMMENDATION_COUNT = {len(recommendations)};",
    "",
    "export const RECOMMENDATIONS = ["
]

for rec in recommendations:
    js_output.append("  {")
    js_output.append(f"    uniqueId: '{rec['uniqueId']}',")
    js_output.append(f"    city: '{rec['city'].replace(chr(39), chr(92)+chr(39))}',")
    js_output.append(f"    region: '{rec['region'].replace(chr(39), chr(92)+chr(39))}',")
    js_output.append(f"    country: '{rec['country'].replace(chr(39), chr(92)+chr(39))}',")
    js_output.append(f"    coordinates: {{ lat: {rec['coordinates']['lat']}, lng: {rec['coordinates']['lng']} }},")
    js_output.append(f"    timezone: '{rec['timezone']}',")
    js_output.append(f"    recNumber: {rec['recNumber']},")
    js_output.append(f"    tag: '{rec['tag']}',")
    js_output.append(f"    source: '{rec['source']}',")
    js_output.append(f"    title: '{rec['title'].replace(chr(39), chr(92)+chr(39))}',")
    js_output.append(f"    description: '{rec['description'].replace(chr(39), chr(92)+chr(39))}',")
    js_output.append(f"    photo: '{rec['photo']}',")
    js_output.append("  },")

js_output.append("];")
js_output.append("")
js_output.append("export const getRecommendationsByCity = (cityName) => RECOMMENDATIONS.filter(r => r.city.toLowerCase() === cityName.toLowerCase());")
js_output.append("export const getRecommendationsByTag = (tag) => RECOMMENDATIONS.filter(r => r.tag === tag);")

with open(out_path, 'w', encoding='utf-8') as f:
    f.write('\\n'.join(js_output))

print(f"Successfully generated {len(recommendations)} recommendations into recommendations.js")
