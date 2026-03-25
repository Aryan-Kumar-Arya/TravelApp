// ─────────────────────────────────────────────────────────────────────────────
// mockItineraries.js
// Location Master List — One-day timelines for 40 cities
// Solo Travelers & Digital Nomads (25-30 yrs)
// Format: { time, icon, title, subtitle }
// icon options: 'sun' | 'laptop' | 'food' | 'moon' | 'outdoors' | 'cultural'
// ─────────────────────────────────────────────────────────────────────────────

export const CITY_ITINERARIES = {

  // ─── INTERNATIONAL (20) ────────────────────────────────────────────────────

  "Chiang Mai": [
    { time: "08:00 AM", icon: "laptop", title: "Morning Work at Thesis Coffee", subtitle: "Nimman area • Fast Wi-Fi, outlets, specialty brews" },
    { time: "10:30 AM", icon: "cultural", title: "Old City Temple Trail", subtitle: "Wat Phra Singh + Wat Chedi Luang • Golden Lanna ruins" },
    { time: "01:00 PM", icon: "food", title: "Khao Soi — Northern Thai Curry", subtitle: "Authentic curry noodles • Old city street stalls" },
    { time: "06:00 PM", icon: "moon", title: "Sunday Night Walking Market", subtitle: "Ratchadamnoen Road • Crafts, live music, street food" },
  ],

  "Lisbon": [
    { time: "08:00 AM", icon: "sun", title: "Tram 28 Ride + Alfama Wander", subtitle: "Historic yellow tram • Cobblestone alleys, viewpoints" },
    { time: "11:00 AM", icon: "laptop", title: "Work at Quase Café", subtitle: "Alfama • Riverside views, specialty coffee" },
    { time: "02:00 PM", icon: "sun", title: "Miradouros Viewpoint Walk", subtitle: "Santa Luzia + Senhora do Monte • Tagus River panoramas" },
    { time: "07:30 PM", icon: "moon", title: "Fado Evening in Bairro Alto", subtitle: "Authentic Portuguese music • Local wine + petiscos" },
  ],

  "Bali (Canggu)": [
    { time: "06:30 AM", icon: "outdoors", title: "Sunrise Surf at Batu Bolong", subtitle: "Beginner-friendly waves • Catch the golden hour" },
    { time: "09:30 AM", icon: "laptop", title: "Work at Crate Cafe", subtitle: "Co-working upstairs • Açaí bowls, fast Wi-Fi" },
    { time: "01:00 PM", icon: "outdoors", title: "Rice Field Scooter Ride", subtitle: "Green paddies inland from Canggu • Serene and scenic" },
    { time: "06:30 PM", icon: "moon", title: "Sunset at Echo Beach + Old Man's", subtitle: "Happy hour cocktails • Surf culture + social vibes" },
  ],

  "Bangkok": [
    { time: "08:00 AM", icon: "cultural", title: "Wat Pho & Wat Arun Temples", subtitle: "Reclining Buddha + Temple of Dawn • Chao Phraya ferry" },
    { time: "12:00 PM", icon: "laptop", title: "Work at Kaizen Coffee Co.", subtitle: "Modern cafe • Iced latte, Wi-Fi, creative crowd" },
    { time: "02:30 PM", icon: "food", title: "Wang Lang Market Street Food", subtitle: "Local riverside market • Pad Thai, mango sticky rice" },
    { time: "07:00 PM", icon: "moon", title: "Yaowarat Chinatown Night Feast", subtitle: "Night street food paradise • Grilled seafood & noodles" },
  ],

  "Medellín": [
    { time: "09:00 AM", icon: "cultural", title: "Comuna 13 Guided Street Art Tour", subtitle: "Escalators + street art • Stories of resilience" },
    { time: "12:30 PM", icon: "food", title: "Arepas + Local Bites in Comunas", subtitle: "Colombian street food • Empanadas, fresh juices" },
    { time: "02:00 PM", icon: "outdoors", title: "Metrocable Panoramic Ride", subtitle: "Line K to Santo Domingo • City hillside views" },
    { time: "07:00 PM", icon: "laptop", title: "Pergamino Café + El Poblado", subtitle: "Specialty coffee work session • Trendy nomad neighborhood" },
  ],

  "Mexico City": [
    { time: "08:00 AM", icon: "laptop", title: "Cafe Nin Morning Work", subtitle: "Roma Norte • Guava roll at Panadería Rosetta" },
    { time: "12:00 PM", icon: "food", title: "Al Pastor Street Tacos", subtitle: "Tacos Álvaro al pastor • Roma Norte food trail" },
    { time: "01:30 PM", icon: "cultural", title: "Chapultepec Castle + Park", subtitle: "Historic palace on a hill • Panoramic city views" },
    { time: "07:00 PM", icon: "moon", title: "Roma Norte Taco Hop + Bars", subtitle: "Taquería Orinoco + Birrería • Lively neighbourhood nights" },
  ],

  "Cape Town": [
    { time: "08:00 AM", icon: "outdoors", title: "Table Mountain Summit via Cable Car", subtitle: "Early morning summit • 360° views of the Cape" },
    { time: "12:30 PM", icon: "laptop", title: "Work at Bootlegger Coffee", subtitle: "V&A Waterfront Silo District • Great espresso & Wi-Fi" },
    { time: "02:00 PM", icon: "cultural", title: "V&A Waterfront + Zeitz MOCAA", subtitle: "Contemporary African art + Nobel Square views" },
    { time: "07:00 PM", icon: "food", title: "Sunset Seafood Dinner", subtitle: "Willoughby & Co • Mountain backdrop, freshest catch" },
  ],

  "Taipei": [
    { time: "09:00 AM", icon: "cultural", title: "Longshan Temple & CKS Memorial", subtitle: "Ancient Buddhist temple + guard ceremony, grand monument" },
    { time: "11:30 AM", icon: "laptop", title: "Work at Fika Fika Cafe", subtitle: "Scandinavian-style • Minimalist interior, great lattes" },
    { time: "01:00 PM", icon: "food", title: "Yongkang Street Dumplings", subtitle: "Din Tai Fung + noodle street • Foodie paradise" },
    { time: "07:00 PM", icon: "moon", title: "Raohe Street Night Market", subtitle: "Pepper pork buns + stinky tofu • Ciyou Temple lit up" },
  ],

  "Budapest": [
    { time: "09:00 AM", icon: "cultural", title: "Buda Castle + Fisherman's Bastion", subtitle: "Gothic towers + Parliament views • Danube panoramas" },
    { time: "12:30 PM", icon: "sun", title: "Chain Bridge Walk + Parliament", subtitle: "Iconic Széchenyi bridge + Shoes on the Danube memorial" },
    { time: "02:30 PM", icon: "laptop", title: "Szimpla Kert Afternoon Work", subtitle: "Ruin bar atmosphere • Eclectic decor, cold brew" },
    { time: "07:00 PM", icon: "moon", title: "Jewish Quarter Ruin Bar Crawl", subtitle: "Mazel Tov dinner + Instant-Fogas megabar" },
  ],

  "Tbilisi": [
    { time: "09:00 AM", icon: "cultural", title: "Old Town + Narikala Fortress", subtitle: "Cable car to fortress • Ancient sulphur bath district" },
    { time: "11:30 AM", icon: "laptop", title: "Work at Mtatsminda Summit Cafe", subtitle: "Mountain-top cafe views • Georgian coffee culture" },
    { time: "02:00 PM", icon: "food", title: "Georgian Wine + Khinkali Dumplings", subtitle: "Authentic dumplings + local natural wine tasting" },
    { time: "07:00 PM", icon: "moon", title: "Rustaveli Ave + Craft Bar Scene", subtitle: "Vibrant evenings • Open-air terraces, creative crowd" },
  ],

  "Valencia": [
    { time: "09:00 AM", icon: "cultural", title: "City of Arts & Sciences", subtitle: "Futuristic Calatrava architecture • Planetarium + opera" },
    { time: "11:00 AM", icon: "laptop", title: "Work at Café Berlin", subtitle: "Central Valencia • Good Wi-Fi, strong espresso, locals" },
    { time: "02:00 PM", icon: "food", title: "Authentic Valencian Paella", subtitle: "Malvarrosa Beach restaurant • Original paella birthplace" },
    { time: "07:00 PM", icon: "moon", title: "El Carmen Tapas & Rooftop Wine", subtitle: "Historic quarter • Rooftop bars, live music, sangria" },
  ],

  "Kuala Lumpur": [
    { time: "08:30 AM", icon: "cultural", title: "Batu Caves + Petronas Towers", subtitle: "Hindu temple + iconic skyline • Dawn at the cave stairs" },
    { time: "11:00 AM", icon: "laptop", title: "Work at Common Ground KLCC", subtitle: "Premium co-working • Views, café below, fast internet" },
    { time: "01:30 PM", icon: "food", title: "Jalan Alor Hawker Street", subtitle: "Malaysia's best hawker street • Char kway teow, satay" },
    { time: "07:00 PM", icon: "moon", title: "Heli Lounge Rooftop Bar", subtitle: "KLCC views from rooftop helipad • Cocktails + city glow" },
  ],

  "Porto": [
    { time: "09:00 AM", icon: "cultural", title: "Ribeira District + Douro Riverfront", subtitle: "UNESCO riverfront • Colorful azulejo tile facades" },
    { time: "11:00 AM", icon: "laptop", title: "Work at Moustache Café", subtitle: "Specialty coffee • Laptop-friendly, central Porto" },
    { time: "02:00 PM", icon: "sun", title: "Livraria Lello + Clérigos Tower", subtitle: "World's most beautiful bookshop + panoramic bell tower" },
    { time: "07:00 PM", icon: "food", title: "Port Wine Tasting at a Wine Cave", subtitle: "Vila Nova de Gaia • Riverside wine cellar tour" },
  ],

  "Buenos Aires": [
    { time: "09:00 AM", icon: "cultural", title: "La Boca + San Telmo Market", subtitle: "Colorful street art • Tango performances in plazas" },
    { time: "11:30 AM", icon: "laptop", title: "Cafe Tortoni Afternoon Work", subtitle: "Historic 1858 cafe • Art Nouveau interiors, strong cortado" },
    { time: "02:00 PM", icon: "food", title: "Parrilla Asado Lunch", subtitle: "Traditional Argentinian BBQ • Malbec + chimichurri" },
    { time: "08:00 PM", icon: "moon", title: "Palermo Soho Rooftop Bars", subtitle: "Trendy bars + craft beer • Late-night tango shows" },
  ],

  "Playa del Carmen": [
    { time: "07:00 AM", icon: "outdoors", title: "Cenote Morning Swim", subtitle: "Crystal-clear jungle pools • Cenote Azul or Dos Ojos" },
    { time: "10:00 AM", icon: "laptop", title: "Work at Café Corazón", subtitle: "5th Ave area • Beachside vibes, reliable Wi-Fi" },
    { time: "01:00 PM", icon: "food", title: "Tacos al Pastor + Mezcal", subtitle: "Street taco crawl on 12th St • Best tacos in Riviera Maya" },
    { time: "06:30 PM", icon: "moon", title: "5th Ave Sunset + Beach Clubs", subtitle: "Mamita's Beach Club • Sunset cocktails + DJ vibes" },
  ],

  "Hvar": [
    { time: "07:30 AM", icon: "outdoors", title: "Hvar Fortress Sunrise Hike", subtitle: "Spanish Fortress views • Lavender fields at dawn" },
    { time: "10:00 AM", icon: "laptop", title: "Work at Carpe Diem Bar Terrace", subtitle: "Waterfront terrace • Sea breeze + good Adriatic coffee" },
    { time: "01:00 PM", icon: "food", title: "Grilled Octopus at Old Town Port", subtitle: "Fresh Adriatic seafood • Octopus + local white Plavac" },
    { time: "06:30 PM", icon: "outdoors", title: "Pakleni Islands Boat Trip + Swim", subtitle: "Island sunset hopping • Starlit social evening swim" },
  ],

  "Valletta": [
    { time: "09:00 AM", icon: "cultural", title: "Valletta UNESCO Heritage Walk", subtitle: "Walled city • Baroque architecture + Grand Harbour" },
    { time: "11:00 AM", icon: "laptop", title: "Work at Caffe Cordina", subtitle: "Famous 1837 cafe • Baroque arcade, outdoor seating" },
    { time: "02:00 PM", icon: "outdoors", title: "Blue Grotto Sea Cave Boat Trip", subtitle: "Stunning turquoise sea caves • Mediterranean light" },
    { time: "07:00 PM", icon: "moon", title: "Upper Barrakka Gardens Sunset", subtitle: "Cannon salute + harbour views + local pastizzi" },
  ],

  "Amsterdam": [
    { time: "08:30 AM", icon: "outdoors", title: "Canal Bike + Jordaan District", subtitle: "Bike hire near Anne Frank House • Stroopwafel + coffee" },
    { time: "11:00 AM", icon: "laptop", title: "Work at Lot Sixty One Coffee", subtitle: "West Amsterdam • Single-origin specialty espresso" },
    { time: "02:00 PM", icon: "cultural", title: "Rijksmuseum + Vondelpark Picnic", subtitle: "Dutch masters + leisurely park afternoon" },
    { time: "07:00 PM", icon: "moon", title: "Heineken Experience + Leidseplein", subtitle: "Brewery tour + lively square bars • Late-night vibes" },
  ],

  "Seville": [
    { time: "09:00 AM", icon: "cultural", title: "Alcázar Palace Gardens + Cathedral", subtitle: "Royal Moorish palace + Giralda Tower climb" },
    { time: "11:30 AM", icon: "laptop", title: "Work at Gaspar Coffee", subtitle: "Santa Cruz quarter • Outdoor terrace, strong Wi-Fi" },
    { time: "02:00 PM", icon: "food", title: "Tapas Bar Crawl", subtitle: "Bodega Santa Cruz + El Rinconcillo • Jamón + sherry" },
    { time: "08:00 PM", icon: "moon", title: "Flamenco Show in Triana", subtitle: "Authentic tablao performance • Passionate dance + sangria" },
  ],

  "Ubud": [
    { time: "06:00 AM", icon: "outdoors", title: "Tegalalang Rice Terrace Sunrise", subtitle: "Iconic terraced paddies • Morning mist + birdsong" },
    { time: "09:00 AM", icon: "laptop", title: "Work at Seniman Coffee", subtitle: "Specialty coffee + jungle patio • Great Wi-Fi" },
    { time: "01:00 PM", icon: "sun", title: "Warungs Lunch + Yoga Barn Class", subtitle: "Local Balinese rice + traditional yoga class" },
    { time: "05:00 PM", icon: "cultural", title: "Tirta Empul Temple Purification", subtitle: "Sacred bathing ritual • Sunset at Pura Luhur Uluwatu" },
  ],

  // ─── INDIAN CITIES (20) ─────────────────────────────────────────────────────

  "Rishikesh": [
    { time: "06:00 AM", icon: "sun", title: "Morning Ganga Aarti at Triveni Ghat", subtitle: "Sunrise river ceremony • Bells, fire, Himalayan air" },
    { time: "09:00 AM", icon: "laptop", title: "Work at Cafe de Goa", subtitle: "Lakshman Jhula area • Riverside Wi-Fi cafe" },
    { time: "01:00 PM", icon: "outdoors", title: "White Water Rafting on the Ganges", subtitle: "Grade 3-4 rapids • 16km stretch, guided adventure" },
    { time: "06:00 PM", icon: "sun", title: "Beatles Ashram Sunset + Yoga", subtitle: "Maharishi ashram ruins • Evening yoga by the river" },
  ],

  "Udaipur": [
    { time: "08:00 AM", icon: "cultural", title: "City Palace + Lake Pichola Boat", subtitle: "Royal heritage • Mirrored palace, serene boat crossing" },
    { time: "10:30 AM", icon: "laptop", title: "Work at Millets of Mewar", subtitle: "Aesthetic rooftop cafe • Lake views, Wi-Fi" },
    { time: "01:00 PM", icon: "food", title: "Dal Baati Churma Thali", subtitle: "Royal Rajasthani thali at a heritage restaurant" },
    { time: "06:30 PM", icon: "sun", title: "Jagdish Temple Sunset Aarti", subtitle: "Evening temple aarti ritual • Sunset over Lake Pichola" },
  ],

  "Jaipur": [
    { time: "08:00 AM", icon: "cultural", title: "Amber Fort + Elephant Stables", subtitle: "Hilltop Mughal architecture • Early golden hour light" },
    { time: "11:00 AM", icon: "laptop", title: "Work at Anokhi Cafe", subtitle: "Boutique heritage cafe • Filtered coffee, quiet workspace" },
    { time: "02:00 PM", icon: "cultural", title: "Hawa Mahal + Pink City Market", subtitle: "Wind Palace + Johari Bazaar • Gem + textile shopping" },
    { time: "07:00 PM", icon: "moon", title: "Chokhi Dhani Folk Dinner", subtitle: "Folk performances • Dal makhani under stars, fire dances" },
  ],

  "Old Manali": [
    { time: "07:00 AM", icon: "cultural", title: "Hadimba Temple + Cedar Forest", subtitle: "Pagoda temple in deodar forest • Morning mist silence" },
    { time: "10:00 AM", icon: "laptop", title: "Work at Lazy Dog Cafe", subtitle: "River-facing terrace • Himalayan backdrop, good espresso" },
    { time: "01:00 PM", icon: "food", title: "Tibetan Thukpa + Momos", subtitle: "Authentic Tibetan kitchens in old town • Warming & hearty" },
    { time: "05:00 PM", icon: "outdoors", title: "Solang Valley Hike + Bonfire", subtitle: "Paragliding viewpoint + social bonfire under stars" },
  ],

  "Gokarna": [
    { time: "06:30 AM", icon: "outdoors", title: "Om Beach Sunrise + Kayaking", subtitle: "Om-shaped beach • Crystal water, no crowds, kayaks" },
    { time: "10:00 AM", icon: "laptop", title: "Work at Namaste Cafe", subtitle: "Beachside hammock cafe • Jungle-to-sea Wi-Fi zone" },
    { time: "01:00 PM", icon: "outdoors", title: "Half Moon & Paradise Beach Trek", subtitle: "2km cliff hike • Secluded beaches by foot/boat only" },
    { time: "06:30 PM", icon: "moon", title: "Mahabaleshwar Temple + Campfire", subtitle: "Ancient Shiva temple + beachside bonfire with travelers" },
  ],

  "Mysore": [
    { time: "08:30 AM", icon: "cultural", title: "Mysore Palace Morning Tour", subtitle: "Indo-Saracenic royal palace • Sunday illumination view" },
    { time: "11:00 AM", icon: "laptop", title: "Work at Infini Coffee Roasters", subtitle: "Specialty coffee, garden seating • Excellent Wi-Fi" },
    { time: "01:00 PM", icon: "food", title: "Mysore Masala Dosa Breakfast", subtitle: "Authentic Karnataka darshini • Local filter coffee" },
    { time: "05:00 PM", icon: "outdoors", title: "Chamundi Hill 1000-Step Sunset", subtitle: "1000-step stairway • Hilltop temple + city panorama" },
  ],

  "Puducherry": [
    { time: "07:00 AM", icon: "cultural", title: "French Quarter Walk + Promenade", subtitle: "Colonial ochre facades • Beach promenade at sunrise" },
    { time: "10:00 AM", icon: "laptop", title: "Work at Le Café", subtitle: "Seafront government beach terrace • Breezy workspace" },
    { time: "01:00 PM", icon: "food", title: "Creole & Tamil Fusion Lunch", subtitle: "Café des Arts or Hotel de L'Orient • Indo-French cuisine" },
    { time: "05:00 PM", icon: "sun", title: "Auroville Sunset + Matrimandir", subtitle: "Geodesic meditation sphere • Spiritual golden hour walk" },
  ],

  "McLeod Ganj": [
    { time: "07:00 AM", icon: "outdoors", title: "Bhagsu Nag Waterfall Hike", subtitle: "Mountain trail • Tibetan prayer flags, cool forest" },
    { time: "10:00 AM", icon: "laptop", title: "Work at Moonpeak Espresso", subtitle: "Specialty Tibetan cafe • Mountain views, yak butter tea" },
    { time: "01:00 PM", icon: "food", title: "Tibetan Momos at Shambhala", subtitle: "Dumplings + thukpa noodles • Cozy Tibetan kitchen" },
    { time: "05:00 PM", icon: "sun", title: "Dalai Lama Temple + Meditation", subtitle: "Namgyal Monastery • Buddhist prayer flags sunset ritual" },
  ],

  "Shillong": [
    { time: "07:00 AM", icon: "outdoors", title: "Ward's Lake Morning Row", subtitle: "Misty morning rowing • Colonial lakeside botanical garden" },
    { time: "10:00 AM", icon: "laptop", title: "Work at Cafe Shillong", subtitle: "Indie cafe with rolling misty hills • Chai + local brews" },
    { time: "01:00 PM", icon: "outdoors", title: "Elephant Falls + Don Bosco Museum", subtitle: "Triple-tier waterfall + Northeast tribal cultural museum" },
    { time: "06:00 PM", icon: "food", title: "Police Bazar Street Food Night", subtitle: "Jadoh rice pork + local NE snacks • Evening street life" },
  ],

  "Darjeeling": [
    { time: "05:00 AM", icon: "outdoors", title: "Tiger Hill Sunrise over Kanchenjunga", subtitle: "3rd highest peak glows at dawn • Once-in-a-lifetime view" },
    { time: "09:00 AM", icon: "laptop", title: "Work at Glenary's Café", subtitle: "Heritage 1935 bakery-cafe • Terrace, Darjeeling first-flush" },
    { time: "01:00 PM", icon: "sun", title: "Happy Valley Tea Estate Walk", subtitle: "Working tea garden tour • Plucking and processing demo" },
    { time: "05:00 PM", icon: "moon", title: "Toy Train Ride + Mall Road", subtitle: "UNESCO Himalayan railway + local momos street dinner" },
  ],

  "Kochi": [
    { time: "08:00 AM", icon: "cultural", title: "Fort Kochi Heritage Walk", subtitle: "Chinese fishing nets + Jewish Synagogue + antiques lane" },
    { time: "11:00 AM", icon: "laptop", title: "Work at Kashi Art Cafe", subtitle: "Artist's cafe • Freshly ground Malabar coffee, exhibitions" },
    { time: "02:00 PM", icon: "cultural", title: "Mattancherry Palace + Spice Market", subtitle: "Dutch palace frescoes + fragrant spice bazaar" },
    { time: "07:00 PM", icon: "moon", title: "Kathakali Show + Seafood Dinner", subtitle: "Classical Kerala dance + fresh prawn masala by backwaters" },
  ],

  "Bir Billing": [
    { time: "08:00 AM", icon: "cultural", title: "Bir Village + Tibetan Monastery", subtitle: "Tibetan colony + morning monastery prayers ritual" },
    { time: "10:00 AM", icon: "outdoors", title: "Paragliding from Billing Launch", subtitle: "World paragliding capital • 2500m launch, 1–2hr flight" },
    { time: "01:00 PM", icon: "laptop", title: "Work at Illiterati Cafe", subtitle: "Hippie-boho cafe • Mountain view, slow pour-over coffee" },
    { time: "06:00 PM", icon: "moon", title: "Chögling Monastery Sunset Bonfire", subtitle: "Monastery golden hour + bonfire with digital nomads" },
  ],

  "Andaman Islands": [
    { time: "07:00 AM", icon: "outdoors", title: "Radhanagar Beach Sunrise", subtitle: "Asia's finest beach at dawn • Jade water, pristine sand" },
    { time: "10:00 AM", icon: "outdoors", title: "Elephant Beach Snorkeling", subtitle: "Coral reefs by speedboat • Sea turtles + fish schools" },
    { time: "01:00 PM", icon: "food", title: "Seafood Shack Beachfront Lunch", subtitle: "Grilled barracuda + coconut rice • Rustic beachfront" },
    { time: "05:30 PM", icon: "moon", title: "Limestone Bridge Sunset Night", subtitle: "Neil Island sunset + bioluminescent beach experience" },
  ],

  "Jodhpur": [
    { time: "08:00 AM", icon: "cultural", title: "Mehrangarh Fort Sunrise", subtitle: "Towering blue city fortress • Golden morning first light" },
    { time: "11:00 AM", icon: "laptop", title: "Work at Indique Terrace Cafe", subtitle: "Fort-view terrace • Blue city panorama, Rajasthani coffee" },
    { time: "02:00 PM", icon: "sun", title: "Clock Tower Spice Market", subtitle: "Ghanta Ghar bazaar • Silver market, local street food" },
    { time: "07:00 PM", icon: "moon", title: "Desert Camp Folk Dinner", subtitle: "Folk music + fire dances • Laal maas under open night sky" },
  ],

  "Varanasi": [
    { time: "05:00 AM", icon: "sun", title: "Assi Ghat Sunrise Boat + Aarti", subtitle: "Sacred Ganga dawn boat ceremony • Shared boat, ₹200 pp" },
    { time: "10:00 AM", icon: "laptop", title: "Work at Assi Ghat Cafe", subtitle: "Backpacker breezy terrace • Chai, Wi-Fi, spiritual vibe" },
    { time: "02:00 PM", icon: "cultural", title: "Kashi Vishwanath + Old City Walk", subtitle: "Sacred Shiva temple • Narrow gali photography trail" },
    { time: "07:00 PM", icon: "sun", title: "Dashashwamedh Evening Ganga Aarti", subtitle: "Grand river fire ritual • Bells, priests, incense, flowers" },
  ],

  "Coorg": [
    { time: "07:00 AM", icon: "outdoors", title: "Abbey Falls + Coffee Plantation", subtitle: "Waterfall through coffee estate • Morning mist magic" },
    { time: "10:00 AM", icon: "laptop", title: "Work at Misty Woods Cafe", subtitle: "Estate-side cafe • Plantation views, local filter coffee" },
    { time: "01:00 PM", icon: "food", title: "Coorgi Pandi Curry Lunch", subtitle: "Kodava local pork curry + kadambuttu • Authentic home meal" },
    { time: "05:00 PM", icon: "cultural", title: "Namdroling Monastery Sunset", subtitle: "Tibetan Buddhist golden temple • Ornate painted walls" },
  ],

  "Amritsar": [
    { time: "05:00 AM", icon: "sun", title: "Golden Temple Sunrise + Langar", subtitle: "Harmandir Sahib at dawn • Free community breakfast" },
    { time: "10:00 AM", icon: "laptop", title: "Work at Heritage Street Cafe", subtitle: "Calm morning cafe near Temple • Lassi + parathas" },
    { time: "01:00 PM", icon: "cultural", title: "Jallianwala Bagh + Partition Museum", subtitle: "Sobering historical walk • Essential + emotional" },
    { time: "05:00 PM", icon: "sun", title: "Wagah Border Retreat Ceremony", subtitle: "Patriotic flag ceremony at Indo-Pak border • Stunning crowd" },
  ],

  "Pushkar": [
    { time: "07:00 AM", icon: "cultural", title: "Brahma Temple + Sacred Lake Dawn", subtitle: "Only Brahma temple in India • Purple dawn sky, holy dip" },
    { time: "10:00 AM", icon: "laptop", title: "Work at Out of the Blue Cafe", subtitle: "Lakeside rooftop • Hippie travelers, chai, good signal" },
    { time: "01:00 PM", icon: "food", title: "Malpua & Rabri Rajasthani Sweets", subtitle: "Pure veg sweets + thali at rooftop terrace restaurant" },
    { time: "05:00 PM", icon: "outdoors", title: "Savitri Temple Hilltop Sunset", subtitle: "Desert town panorama • Rope-way or 700-step hike" },
  ],

  "Leh": [
    { time: "08:00 AM", icon: "cultural", title: "Shanti Stupa + Magnetic Hill", subtitle: "Peace stupa sunrise + gravity optical illusion road" },
    { time: "11:00 AM", icon: "laptop", title: "Work at Bon Appétit Cafe", subtitle: "Old Leh market square • Himalayan backdrop, slow pour-over" },
    { time: "01:00 PM", icon: "cultural", title: "Leh Palace + Woolen Market", subtitle: "Tibetan 9-storey palace ruins • Local crafts + shopping" },
    { time: "05:00 PM", icon: "outdoors", title: "Sangam — Indus & Zanskar Confluence", subtitle: "Two rivers meet • Turquoise vs brown stunning contrast" },
  ],

  "Kasol": [
    { time: "08:00 AM", icon: "outdoors", title: "Kheerganga Trek Start", subtitle: "13km forest trek to hot spring at summit • All day" },
    { time: "12:00 PM", icon: "outdoors", title: "Parvati Valley Pine Forest Walk", subtitle: "Mountain streams + pine foliage • Dhaba lunch on trail" },
    { time: "03:00 PM", icon: "laptop", title: "Work at Evergreen Cafe", subtitle: "Israeli cafe culture • Shakshuka + freshly brewed coffee" },
    { time: "06:30 PM", icon: "moon", title: "Chalal Village Bonfire Night", subtitle: "Community bonfire, acoustic music, stars in the sky" },
  ],

  "Hampi": [
    { time: "06:00 AM", icon: "sun", title: "Matanga Hill Sunrise", subtitle: "Panoramic boulder landscape • Breathtaking views at dawn" },
    { time: "09:30 AM", icon: "cultural", title: "Virupaksha Temple & Ruins", subtitle: "Ancient Vijayanagara empire • Chariot and elephant stables" },
    { time: "01:00 PM", icon: "food", title: "Mango Tree Restaurant", subtitle: "Riverside thali & banana flower curry • Relaxed traveler vibe" },
    { time: "05:00 PM", icon: "outdoors", title: "Coracle Ride & Sunset on Sanapur Lake", subtitle: "Round boat river crossing • Hippie island sunset" },
  ],
};

// ─── Utility helpers ─────────────────────────────────────────────────────────

/** Returns timeline for a city, or a default fallback if not found */
export const getItineraryForCity = (city) => {
  if (!city) return null;
  // Try exact match first
  if (CITY_ITINERARIES[city]) return CITY_ITINERARIES[city];
  // Try case-insensitive partial match
  const key = Object.keys(CITY_ITINERARIES).find(
    k => k.toLowerCase() === city.toLowerCase() ||
         city.toLowerCase().includes(k.toLowerCase()) ||
         k.toLowerCase().includes(city.toLowerCase())
  );
  return key ? CITY_ITINERARIES[key] : null;
};

/** Icon map for rendering: returns Ionicons name */
export const ICON_MAP = {
  sun:      'sunny-outline',
  laptop:   'laptop-outline',
  food:     'restaurant-outline',
  moon:     'moon-outline',
  outdoors: 'leaf-outline',
  cultural: 'library-outline',
};

/** Tag colour map */
export const TAG_COLORS = {
  'Experiences': { bg: '#FFF3E0', text: '#E65100' },
  'Coworking':   { bg: '#E8F5E9', text: '#2E7D32' },
  'Eat & Drink': { bg: '#FFF8E1', text: '#F57F17' },
  'Nightlife':   { bg: '#EDE7F6', text: '#4527A0' },
  'Outdoors':    { bg: '#E0F2F1', text: '#00695C' },
  'Cultural':    { bg: '#E3F2FD', text: '#1565C0' },
  'Wellness':    { bg: '#FCE4EC', text: '#880E4F' },
  'Events':      { bg: '#F3E5F5', text: '#6A1B9A' },
};
