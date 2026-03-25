// ──────────────────────────────────────────────
// Top Cities for Demo
// ──────────────────────────────────────────────
export const ALL_DEMO_CITIES = [
  // International (20)
  'Chiang Mai', 'Lisbon', 'Bali (Canggu)', 'Bangkok', 'Medellín', 'Mexico City', 'Cape Town', 'Taipei', 'Budapest', 'Tbilisi', 'Valencia', 'Kuala Lumpur', 'Porto', 'Buenos Aires', 'Playa del Carmen', 'Hvar', 'Valletta', 'Amsterdam', 'Seville', 'Ubud',
  // Indian (21)
  'Rishikesh', 'Udaipur', 'Jaipur', 'Old Manali', 'Gokarna', 'Mysore', 'Puducherry', 'McLeod Ganj', 'Shillong', 'Darjeeling', 'Kochi', 'Bir Billing', 'Andaman Islands', 'Jodhpur', 'Varanasi', 'Coorg', 'Amritsar', 'Pushkar', 'Leh', 'Kasol', 'Hampi'
];


// ──────────────────────────────────────────────
// Current User (the person using the app)
// ──────────────────────────────────────────────
export const CURRENT_USER = {
    id: 'current-user',
    name: 'You',
    age: 27,
    bio: 'Adventure seeker exploring the world one city at a time ✈️',
    home_city: 'San Francisco, USA',
    avatar: '🧑‍💻',
    photo: null,
    is_premium: false,
    photos: [],
    interests: [],
    trips: [
        {
            id: 'trip-initial',
            user_id: 'current-user',
            destination_city: 'Paris',
            start_date: '2026-04-10',
            end_date: '2026-04-20',
            is_active: true,
        },
        {
            id: 'trip-past-1',
            destination_city: 'Tokyo, Japan',
            start_date: '2025-10-05',
            end_date: '2025-10-15',
            is_active: false,
        },
        {
            id: 'trip-past-2',
            destination_city: 'London, UK',
            start_date: '2024-05-12',
            end_date: '2024-05-20',
            is_active: false,
        }
    ]
};

// Convenience reference — mirrors the is_active trip from CURRENT_USER.trips
export const CURRENT_TRIP = {
    id: 'trip-initial',
    user_id: 'current-user',
    destination_city: 'Paris',
    start_date: '2026-04-10',
    end_date: '2026-04-20',
    is_active: true,
};

// ──────────────────────────────────────────────
// Stack A — Global Nomad (Travelers)
// Each traveler has trips to multiple cities so
// every destination has 3-4 overlapping matches
// ──────────────────────────────────────────────
export const TRAVELER_PROFILES = [
    {
        id: 't1', name: 'Alex Chen', age: 26, avatar: '🧔',
        bio: 'Photographer chasing golden hours. Working remotely until my laptop dies.',
        home_city: 'Toronto', interests: ['Photography', 'Street Food', 'Jazz'],
        trips: [
            { destination_city: 'Bali, Indonesia', start_date: '2026-04-08', end_date: '2026-04-16' },
            { destination_city: 'Paris, France', start_date: '2026-04-17', end_date: '2026-04-25' },
            { destination_city: 'Tokyo, Japan', start_date: '2026-04-05', end_date: '2026-04-14' },
        ],
    },
    {
        id: 't2', name: 'Priya Sharma', age: 29, avatar: '👩‍🦱',
        bio: 'Digital nomad & coffee snob. Always looking for fast WiFi and good vibes.',
        home_city: 'Mumbai', interests: ['Coffee', 'Remote Work', 'Art'],
        trips: [
            { destination_city: 'Goa, India', start_date: '2026-04-12', end_date: '2026-04-22' },
            { destination_city: 'Chiang Mai, Thailand', start_date: '2026-04-08', end_date: '2026-04-18' },
            { destination_city: 'Bali, Indonesia', start_date: '2026-04-05', end_date: '2026-04-15' },
        ],
    },
    {
        id: 't3', name: 'Jordan Ellis', age: 24, avatar: '🧑‍🎤',
        bio: 'Backpacker on a mission to hit 30 countries before 30. Hostel life.',
        home_city: 'London', interests: ['Hiking', 'History', 'Hostels'],
        trips: [
            { destination_city: 'Rishikesh, India', start_date: '2026-04-10', end_date: '2026-04-25' },
            { destination_city: 'Manali, India', start_date: '2026-04-08', end_date: '2026-04-18' },
            { destination_city: 'Cape Town, South Africa', start_date: '2026-04-10', end_date: '2026-04-20' },
        ],
    },
    {
        id: 't4', name: 'Luna Kim', age: 28, avatar: '👩‍🎨',
        bio: 'Sketching my way through every museum. Give me wine and culture.',
        home_city: 'Seoul', interests: ['Art', 'Museums', 'Wine'],
        trips: [
            { destination_city: 'Paris, France', start_date: '2026-04-09', end_date: '2026-04-14' },
            { destination_city: 'Barcelona, Spain', start_date: '2026-04-15', end_date: '2026-04-22' },
            { destination_city: 'Lisbon, Portugal', start_date: '2026-04-08', end_date: '2026-04-18' },
        ],
    },
    {
        id: 't5', name: 'Marco Rossi', age: 31, avatar: '👨‍🍳',
        bio: 'Italian finding inspiration in new cuisines. Let\'s cook together!',
        home_city: 'Rome', interests: ['Cooking', 'Wine', 'Markets'],
        trips: [
            { destination_city: 'Mexico City, Mexico', start_date: '2026-04-10', end_date: '2026-04-20' },
            { destination_city: 'Buenos Aires, Argentina', start_date: '2026-04-08', end_date: '2026-04-18' },
            { destination_city: 'Tokyo, Japan', start_date: '2026-04-10', end_date: '2026-04-18' },
        ],
    },
    {
        id: 't6', name: 'Amara Osei', age: 25, avatar: '👩‍💼',
        bio: 'Travel writer. Seeking the untold stories of ancient cities.',
        home_city: 'Accra', interests: ['Writing', 'Culture', 'Nightlife'],
        trips: [
            { destination_city: 'Varanasi, India', start_date: '2026-04-05', end_date: '2026-04-12' },
            { destination_city: 'Jaipur, India', start_date: '2026-04-10', end_date: '2026-04-18' },
            { destination_city: 'Udaipur, India', start_date: '2026-04-12', end_date: '2026-04-20' },
        ],
    },
    {
        id: 't7', name: 'Kai Andersen', age: 30, avatar: '🧑‍✈️',
        bio: 'Taking a long sabbatical. Escaping the Scandinavian cold.',
        home_city: 'Copenhagen', interests: ['Surfing', 'Design', 'Cycling'],
        trips: [
            { destination_city: 'Varkala, India', start_date: '2026-04-11', end_date: '2026-04-17' },
            { destination_city: 'Bali, Indonesia', start_date: '2026-04-18', end_date: '2026-05-18' },
            { destination_city: 'Goa, India', start_date: '2026-04-08', end_date: '2026-04-16' },
        ],
    },
    {
        id: 't8', name: 'Sofia Vega', age: 27, avatar: '💃',
        bio: 'Looking for the best rooftop parties and dance spots.',
        home_city: 'Buenos Aires', interests: ['Dance', 'Music', 'Rooftop Bars'],
        trips: [
            { destination_city: 'Medellin, Colombia', start_date: '2026-04-05', end_date: '2026-05-05' },
            { destination_city: 'Barcelona, Spain', start_date: '2026-04-10', end_date: '2026-04-20' },
            { destination_city: 'Mexico City, Mexico', start_date: '2026-04-08', end_date: '2026-04-18' },
        ],
    },
    {
        id: 't9', name: 'Yuki Tanaka', age: 23, avatar: '🎌',
        bio: 'Taking a gap year before starting my corporate job.',
        home_city: 'Tokyo', interests: ['Architecture', 'Ramen', 'Sketching'],
        trips: [
            { destination_city: 'Lisbon, Portugal', start_date: '2026-04-01', end_date: '2026-04-15' },
            { destination_city: 'Chiang Mai, Thailand', start_date: '2026-04-10', end_date: '2026-04-20' },
        ],
    },
    {
        id: 't10', name: 'Liam O\'Brien', age: 32, avatar: '🍀',
        bio: 'Software dev hopping between cafes. Need strong WiFi.',
        home_city: 'Dublin', interests: ['Startups', 'Pubs', 'Tech'],
        trips: [
            { destination_city: 'Bangalore, India', start_date: '2026-04-10', end_date: '2026-04-20' },
            { destination_city: 'Lisbon, Portugal', start_date: '2026-04-12', end_date: '2026-04-22' },
            { destination_city: 'Medellin, Colombia', start_date: '2026-04-08', end_date: '2026-04-18' },
        ],
    },
    {
        id: 't11', name: 'Isabella Silva', age: 28, avatar: '👩🏽‍💻',
        bio: 'Graphic designer roaming South America. Tango enthusiast.',
        home_city: 'São Paulo', interests: ['Design', 'Tango', 'Steak'],
        trips: [
            { destination_city: 'Buenos Aires, Argentina', start_date: '2026-04-02', end_date: '2026-04-12' },
            { destination_city: 'Cape Town, South Africa', start_date: '2026-04-08', end_date: '2026-04-16' },
        ],
    },
    {
        id: 't12', name: 'Raj Patil', age: 25, avatar: '🏍️',
        bio: 'Renting a Royal Enfield and heading to the mountains.',
        home_city: 'Pune', interests: ['Motorcycling', 'Mountains', 'Photography'],
        trips: [
            { destination_city: 'Manali, India', start_date: '2026-04-10', end_date: '2026-04-20' },
            { destination_city: 'Dharamshala, India', start_date: '2026-04-20', end_date: '2026-04-25' },
            { destination_city: 'Rishikesh, India', start_date: '2026-04-05', end_date: '2026-04-12' },
        ],
    },
    {
        id: 't13', name: 'Emma Jones', age: 29, avatar: '🍷',
        bio: 'Taking a wine tour across the southern hemisphere.',
        home_city: 'Sydney', interests: ['Wine Tasting', 'Beaches', 'Fine Dining'],
        trips: [
            { destination_city: 'Cape Town, South Africa', start_date: '2026-04-08', end_date: '2026-04-18' },
            { destination_city: 'Buenos Aires, Argentina', start_date: '2026-04-10', end_date: '2026-04-20' },
        ],
    },
    {
        id: 't14', name: 'Kenji Sato', age: 26, avatar: '🍣',
        bio: 'Exploring my home country before moving abroad.',
        home_city: 'Osaka', interests: ['Sushi', 'Temples', 'Night Photography'],
        trips: [
            { destination_city: 'Tokyo, Japan', start_date: '2026-04-01', end_date: '2026-04-07' },
            { destination_city: 'Chiang Mai, Thailand', start_date: '2026-04-12', end_date: '2026-04-22' },
        ],
    },
    {
        id: 't15', name: 'Neha Kapoor', age: 27, avatar: '👸',
        bio: 'Royalty vibes only. Exploring forts and palaces.',
        home_city: 'Delhi', interests: ['History', 'Palaces', 'Shopping'],
        trips: [
            { destination_city: 'Jaipur, India', start_date: '2026-04-12', end_date: '2026-04-15' },
            { destination_city: 'Udaipur, India', start_date: '2026-04-16', end_date: '2026-04-19' },
            { destination_city: 'Varanasi, India', start_date: '2026-04-08', end_date: '2026-04-14' },
        ],
    },
    {
        id: 't16', name: 'Clara Müller', age: 30, avatar: '🎻',
        bio: 'Classical violinist turned nomad. Finding music in every culture.',
        home_city: 'Berlin', interests: ['Music', 'History', 'Coffee'],
        trips: [
            { destination_city: 'Tokyo, Japan', start_date: '2026-04-08', end_date: '2026-04-16' },
            { destination_city: 'Barcelona, Spain', start_date: '2026-04-05', end_date: '2026-04-15' },
            { destination_city: 'Mumbai, India', start_date: '2026-04-10', end_date: '2026-04-18' },
        ],
    },
    {
        id: 't17', name: 'Diego Fernandez', age: 28, avatar: '🎸',
        bio: 'Street musician by day, salsa dancer by night.',
        home_city: 'Bogota', interests: ['Music', 'Salsa', 'Street Art'],
        trips: [
            { destination_city: 'Medellin, Colombia', start_date: '2026-04-10', end_date: '2026-04-20' },
            { destination_city: 'Mexico City, Mexico', start_date: '2026-04-12', end_date: '2026-04-22' },
            { destination_city: 'Varkala, India', start_date: '2026-04-08', end_date: '2026-04-18' },
        ],
    },
    {
        id: 't18', name: 'Aisha Patel', age: 26, avatar: '🧘‍♀️',
        bio: 'Yoga teacher spreading positive vibes across the globe.',
        home_city: 'Ahmedabad', interests: ['Yoga', 'Meditation', 'Ayurveda'],
        trips: [
            { destination_city: 'Rishikesh, India', start_date: '2026-04-08', end_date: '2026-04-18' },
            { destination_city: 'Bali, Indonesia', start_date: '2026-04-10', end_date: '2026-04-20' },
            { destination_city: 'Dharamshala, India', start_date: '2026-04-05', end_date: '2026-04-15' },
        ],
    },
    {
        id: 't19', name: 'Tomás Herrera', age: 33, avatar: '🏋️',
        bio: 'Fitness trainer traveling the world. Let\'s hit the local gym!',
        home_city: 'Santiago', interests: ['Fitness', 'Hiking', 'Healthy Eating'],
        trips: [
            { destination_city: 'Cape Town, South Africa', start_date: '2026-04-05', end_date: '2026-04-15' },
            { destination_city: 'Manali, India', start_date: '2026-04-12', end_date: '2026-04-22' },
            { destination_city: 'Medellin, Colombia', start_date: '2026-04-12', end_date: '2026-04-22' },
        ],
    },
    {
        id: 't20', name: 'Mei Lin', age: 25, avatar: '🎨',
        bio: 'Watercolor artist documenting rooftops around the world.',
        home_city: 'Shanghai', interests: ['Painting', 'Rooftops', 'Tea'],
        trips: [
            { destination_city: 'Udaipur, India', start_date: '2026-04-08', end_date: '2026-04-18' },
            { destination_city: 'Lisbon, Portugal', start_date: '2026-04-10', end_date: '2026-04-20' },
            { destination_city: 'Paris, France', start_date: '2026-04-12', end_date: '2026-04-22' },
        ],
    },
    {
        id: 't21', name: 'Ravi Kumar', age: 27, avatar: '📱',
        bio: 'Tech founder scouting startup ecosystems around the world.',
        home_city: 'Hyderabad', interests: ['Startups', 'AI', 'Networking'],
        trips: [
            { destination_city: 'Bangalore, India', start_date: '2026-04-08', end_date: '2026-04-16' },
            { destination_city: 'Mumbai, India', start_date: '2026-04-12', end_date: '2026-04-20' },
            { destination_city: 'Tokyo, Japan', start_date: '2026-04-12', end_date: '2026-04-20' },
        ],
    },
    {
        id: 't22', name: 'Nina Petrova', age: 29, avatar: '🧗‍♀️',
        bio: 'Rock climbing and exploring coastal towns. Adrenaline junkie.',
        home_city: 'Moscow', interests: ['Climbing', 'Beaches', 'Diving'],
        trips: [
            { destination_city: 'Varkala, India', start_date: '2026-04-10', end_date: '2026-04-20' },
            { destination_city: 'Goa, India', start_date: '2026-04-12', end_date: '2026-04-22' },
            { destination_city: 'Barcelona, Spain', start_date: '2026-04-08', end_date: '2026-04-18' },
        ],
    },
    {
        id: 't23', name: 'Arjun Mehra', age: 24, avatar: '🎬',
        bio: 'Film student shooting a documentary on local cultures.',
        home_city: 'Delhi', interests: ['Film', 'Culture', 'Storytelling'],
        trips: [
            { destination_city: 'Varanasi, India', start_date: '2026-04-10', end_date: '2026-04-20' },
            { destination_city: 'Jaipur, India', start_date: '2026-04-05', end_date: '2026-04-12' },
            { destination_city: 'Mumbai, India', start_date: '2026-04-08', end_date: '2026-04-16' },
        ],
    },
    {
        id: 't24', name: 'Sarah Williams', age: 31, avatar: '📚',
        bio: 'Author on a book research trip. Currently writing about nomad culture.',
        home_city: 'Portland', interests: ['Writing', 'Books', 'Coffee Shops'],
        trips: [
            { destination_city: 'Chiang Mai, Thailand', start_date: '2026-04-05', end_date: '2026-04-15' },
            { destination_city: 'Bangalore, India', start_date: '2026-04-12', end_date: '2026-04-22' },
            { destination_city: 'Buenos Aires, Argentina', start_date: '2026-04-14', end_date: '2026-04-24' },
        ],
    },
    {
        id: 't25', name: 'Zara Khan', age: 26, avatar: '✈️',
        bio: 'Flight attendant exploring cities on layovers. FOMO is real.',
        home_city: 'Dubai', interests: ['Luxury', 'Food', 'Nightlife'],
        trips: [
            { destination_city: 'Mumbai, India', start_date: '2026-04-05', end_date: '2026-04-15' },
            { destination_city: 'Manali, India', start_date: '2026-04-05', end_date: '2026-04-12' },
            { destination_city: 'Cape Town, South Africa', start_date: '2026-04-12', end_date: '2026-04-22' },
        ],
    },
];

// ──────────────────────────────────────────────
// Stack B — Local Guides (Premium)
// 2 locals per city = 40 profiles
// ──────────────────────────────────────────────
export const LOCAL_PROFILES = [
    // ── Global Cities ──
    { id: 'l1', name: 'Marie Dupont', age: 30, avatar: '🇫🇷', bio: 'Born & raised in Le Marais. I know every hidden courtyard.', home_city: 'Paris, France', interests: ['Wine Bars', 'Street Art', 'Vintage Shops'], isLocal: true },
    { id: 'l2', name: 'Jean-Luc Martin', age: 34, avatar: '🥖', bio: 'Pastry chef in Montmartre. I\'ll show you the real Paris.', home_city: 'Paris, France', interests: ['Baking', 'Museums', 'Jazz Clubs'], isLocal: true },

    { id: 'l3', name: 'Ketut Astawa', age: 34, avatar: '🏄‍♂️', bio: 'Surf instructor in Canggu. Best waves and warungs.', home_city: 'Bali, Indonesia', interests: ['Surfing', 'Nasi Goreng', 'Beach Clubs'], isLocal: true },
    { id: 'l4', name: 'Made Sari', age: 27, avatar: '🌺', bio: 'Balinese dancer and yoga teacher. Let me show you the temples.', home_city: 'Bali, Indonesia', interests: ['Dance', 'Yoga', 'Temple Tours'], isLocal: true },

    { id: 'l5', name: 'Pedro Santos', age: 29, avatar: '🎸', bio: 'Fado musician in Alfama. Lisbon has a soul, let me show you.', home_city: 'Lisbon, Portugal', interests: ['Fado', 'Pastéis de Nata', 'Surfing'], isLocal: true },
    { id: 'l6', name: 'Ana Ferreira', age: 26, avatar: '🍷', bio: 'Wine tour guide through the Douro Valley. Saúde!', home_city: 'Lisbon, Portugal', interests: ['Wine', 'Architecture', 'Tram 28'], isLocal: true },

    { id: 'l7', name: 'Valentina Cruz', age: 28, avatar: '💃', bio: 'Salsa teacher in Poblado. Let\'s dance the night away.', home_city: 'Medellin, Colombia', interests: ['Salsa', 'Street Food', 'Art Galleries'], isLocal: true },
    { id: 'l8', name: 'Andrés Gómez', age: 31, avatar: '☕', bio: 'Coffee farmer turned city guide. Only single-origin for me.', home_city: 'Medellin, Colombia', interests: ['Coffee', 'Hiking', 'Nightlife'], isLocal: true },

    { id: 'l9', name: 'Nong Khai', age: 33, avatar: '🍜', bio: 'Street food expert. I\'ll show you the dishes tourists never find.', home_city: 'Chiang Mai, Thailand', interests: ['Street Food', 'Temples', 'Night Markets'], isLocal: true },
    { id: 'l10', name: 'Ploy Siriwat', age: 26, avatar: '🧘', bio: 'Meditation guide in the Old City. Find your inner peace here.', home_city: 'Chiang Mai, Thailand', interests: ['Meditation', 'Thai Massage', 'Hiking'], isLocal: true },

    { id: 'l11', name: 'Marta Ruiz', age: 30, avatar: '🏗️', bio: 'Architect obsessed with Gaudí. Let me show you the hidden gems.', home_city: 'Barcelona, Spain', interests: ['Architecture', 'Tapas', 'Beach Volleyball'], isLocal: true },
    { id: 'l12', name: 'Jordi Mas', age: 28, avatar: '⚽', bio: 'Football fanatic and craft beer guide. Visca Barça!', home_city: 'Barcelona, Spain', interests: ['Football', 'Craft Beer', 'Gothic Quarter'], isLocal: true },

    { id: 'l13', name: 'Carlos Mendoza', age: 29, avatar: '🌮', bio: 'Food tour guide in Roma Norte. Tacos are my religion.', home_city: 'Mexico City, Mexico', interests: ['Tacos', 'Mezcal', 'Lucha Libre'], isLocal: true },
    { id: 'l14', name: 'Elena Ruiz', age: 27, avatar: '🎨', bio: 'Muralist in Coyoacán. Art runs through this city\'s veins.', home_city: 'Mexico City, Mexico', interests: ['Street Art', 'Museums', 'Mariachi'], isLocal: true },

    { id: 'l15', name: 'Mateo López', age: 32, avatar: '🥩', bio: 'Asado master. Join me for the best steak of your life.', home_city: 'Buenos Aires, Argentina', interests: ['Asado', 'Tango', 'Football'], isLocal: true },
    { id: 'l16', name: 'Camila Rivera', age: 25, avatar: '📖', bio: 'Bookworm in San Telmo. I know every cool bookshop café.', home_city: 'Buenos Aires, Argentina', interests: ['Literature', 'Café Culture', 'Vintage Markets'], isLocal: true },

    { id: 'l17', name: 'Thabo Mkhize', age: 31, avatar: '🦁', bio: 'Safari guide and street art enthusiast in Woodstock.', home_city: 'Cape Town, South Africa', interests: ['Safari', 'Street Art', 'Hiking'], isLocal: true },
    { id: 'l18', name: 'Lerato Dlamini', age: 27, avatar: '🍷', bio: 'Sommelier in Stellenbosch. Wine country is my playground.', home_city: 'Cape Town, South Africa', interests: ['Wine', 'Beaches', 'Table Mountain'], isLocal: true },

    { id: 'l19', name: 'Haruki Tanaka', age: 28, avatar: '🎮', bio: 'Game developer and anime fan. I know all the secret arcades.', home_city: 'Tokyo, Japan', interests: ['Gaming', 'Ramen', 'Akihabara'], isLocal: true },
    { id: 'l20', name: 'Sakura Yamamoto', age: 25, avatar: '🌸', bio: 'Tea ceremony host in Yanaka. Traditional Tokyo awaits you.', home_city: 'Tokyo, Japan', interests: ['Tea Ceremony', 'Temples', 'Izakaya'], isLocal: true },

    // ── Indian Cities ──
    { id: 'l21', name: 'Aarti Desai', age: 28, avatar: '🪷', bio: 'Yoga teacher in Anjuna. Let\'s find your zen.', home_city: 'Goa, India', interests: ['Yoga', 'Vegan Food', 'Sunset Parties'], isLocal: true },
    { id: 'l22', name: 'Ricky D\'Souza', age: 30, avatar: '🎵', bio: 'DJ at Curlies. Goa trance runs in my blood.', home_city: 'Goa, India', interests: ['Music', 'Beach Parties', 'Seafood'], isLocal: true },

    { id: 'l23', name: 'Vikram Thakur', age: 32, avatar: '🏔️', bio: 'Mountaineer and adventure guide. Solang Valley is my backyard.', home_city: 'Manali, India', interests: ['Trekking', 'Paragliding', 'Bonfires'], isLocal: true },
    { id: 'l24', name: 'Ananya Negi', age: 26, avatar: '🧣', bio: 'Café owner by the river. Best hot chocolate in the Himalayas.', home_city: 'Manali, India', interests: ['Cafes', 'Snow Sports', 'Photography'], isLocal: true },

    { id: 'l25', name: 'Swami Dhyan', age: 40, avatar: '🕉️', bio: 'Yoga guru on the Ganga. Teaching asanas for 15 years.', home_city: 'Rishikesh, India', interests: ['Yoga', 'Meditation', 'Ayurveda'], isLocal: true },
    { id: 'l26', name: 'Kavita Rawat', age: 29, avatar: '🛶', bio: 'White-water rafting instructor. Let\'s conquer the rapids!', home_city: 'Rishikesh, India', interests: ['Rafting', 'Camping', 'Vegetarian Food'], isLocal: true },

    { id: 'l27', name: 'Maharaj Singh', age: 35, avatar: '🏰', bio: 'Heritage walk guide. Every fort has a story to tell.', home_city: 'Jaipur, India', interests: ['History', 'Block Printing', 'Chai'], isLocal: true },
    { id: 'l28', name: 'Sunita Meena', age: 27, avatar: '💎', bio: 'Jewellery designer in Johari Bazaar. Rajasthani craft is life.', home_city: 'Jaipur, India', interests: ['Jewellery', 'Handicrafts', 'Rajasthani Thali'], isLocal: true },

    { id: 'l29', name: 'Lakshmi Rathore', age: 30, avatar: '🚤', bio: 'Boat tour guide on Lake Pichola. Sunsets here are unmatched.', home_city: 'Udaipur, India', interests: ['Boating', 'Palace Tours', 'Miniature Art'], isLocal: true },
    { id: 'l30', name: 'Devendra Singh', age: 33, avatar: '🎭', bio: 'Folk artist and puppet show performer. Culture is my craft.', home_city: 'Udaipur, India', interests: ['Folk Art', 'Puppetry', 'Heritage Walks'], isLocal: true },

    { id: 'l31', name: 'Pandit Ramesh', age: 45, avatar: '🪔', bio: 'Ganga Aarti priest. Spirituality flows through these ghats.', home_city: 'Varanasi, India', interests: ['Spirituality', 'Classical Music', 'Silk Weaving'], isLocal: true },
    { id: 'l32', name: 'Meera Gupta', age: 28, avatar: '🎶', bio: 'Sitar player and heritage guide. Varanasi is the oldest city alive.', home_city: 'Varanasi, India', interests: ['Music', 'Photo Walks', 'Street Food'], isLocal: true },

    { id: 'l33', name: 'Deepak Rao', age: 29, avatar: '💻', bio: 'Startup founder and coffee addict. Bangalore\'s tech scene is 🔥.', home_city: 'Bangalore, India', interests: ['Tech', 'Craft Beer', 'Live Music'], isLocal: true },
    { id: 'l34', name: 'Anita Reddy', age: 27, avatar: '🍕', bio: 'Food blogger covering Indiranagar\'s best eats.', home_city: 'Bangalore, India', interests: ['Food', 'Breweries', 'Weekend Getaways'], isLocal: true },

    { id: 'l35', name: 'Farhan Sheikh', age: 30, avatar: '🎬', bio: 'Bollywood extra turned city guide. I know every shooting location.', home_city: 'Mumbai, India', interests: ['Bollywood', 'Street Food', 'Marine Drive'], isLocal: true },
    { id: 'l36', name: 'Rhea Malhotra', age: 26, avatar: '🏙️', bio: 'Architect showing off Mumbai\'s Art Deco heritage.', home_city: 'Mumbai, India', interests: ['Architecture', 'Vada Pav', 'Jazz Bars'], isLocal: true },

    { id: 'l37', name: 'Tenzin Gyatso', age: 35, avatar: '🏔️', bio: 'Trekking guide. I know these mountains like the back of my hand.', home_city: 'Dharamshala, India', interests: ['Trekking', 'Meditation', 'Momo'], isLocal: true },
    { id: 'l38', name: 'Dolma Tsering', age: 28, avatar: '🍵', bio: 'Tibetan café owner near McLeodganj. Best thukpa in town!', home_city: 'Dharamshala, India', interests: ['Tibetan Culture', 'Cooking', 'Buddhism'], isLocal: true },

    { id: 'l39', name: 'Suresh Nair', age: 31, avatar: '🏖️', bio: 'Cliff-top café owner. Watch the sunset with a fresh coconut.', home_city: 'Varkala, India', interests: ['Surfing', 'Ayurveda', 'Cliff Walks'], isLocal: true },
    { id: 'l40', name: 'Priya Menon', age: 27, avatar: '🥥', bio: 'Ayurveda therapist and beach yoga instructor.', home_city: 'Varkala, India', interests: ['Ayurveda', 'Yoga', 'Kerala Cuisine'], isLocal: true },
];

// ──────────────────────────────────────────────
// Recommendation Cards (For Explore Screen)
// ──────────────────────────────────────────────
export const RECOMMENDATION_CARDS = [
    {
        id: 'rec-1',
        name: 'The Vintage Teacup',
        emoji: '☕',
        category: 'Food & Drinks',
        source: 'local', // 'local' or 'traveller'
        bio: 'Hidden vintage cafe down an alley. The Victoria Sponge is out of this world. Get there early to grab a garden seat!',
        recommended_by: 'Sarah M.',
    },
    {
        id: 'rec-2',
        name: 'Sunset Paddleboarding',
        emoji: '🏄‍♂️',
        category: 'Experience',
        source: 'traveller',
        bio: 'Best way to see the bay! Rent a board from the guys near the pier. The water is super calm around 6 PM.',
        recommended_by: 'Alex J.',
    },
    {
        id: 'rec-3',
        name: 'Night Noodle Markets',
        emoji: '🍜',
        category: 'Events',
        source: 'local',
        bio: 'Happening every Thursday this month. Amazing atmosphere, live music, and the best bao buns in the city. Expect a queue.',
        recommended_by: 'Kenji T.',
    },
    {
        id: 'rec-4',
        name: 'The Botanical Glasshouse',
        emoji: '🌴',
        category: 'Experience',
        source: 'local',
        bio: 'Incredible Victorian greenhouse. It gets warm inside so dress light! Great photo op and usually very quiet on weekday mornings.',
        recommended_by: 'Emma R.',
    },
    {
        id: 'rec-5',
        name: 'Nomad Boutique Hostel',
        emoji: '🛏️',
        category: 'Stays',
        source: 'traveller',
        bio: 'Surprisingly luxurious for a hostel! They have a rooftop bar that does 2-for-1 cocktails. Met awesome people here.',
        recommended_by: 'Marco V.',
    },
];

