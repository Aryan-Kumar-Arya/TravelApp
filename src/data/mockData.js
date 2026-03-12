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
    is_premium: false,
    photos: [],
    past_trips: [
        {
            id: 'trip-past-1',
            destination_city: 'Tokyo, Japan',
            start_date: '2025-10-05',
            end_date: '2025-10-15',
        },
        {
            id: 'trip-past-2',
            destination_city: 'London, UK',
            start_date: '2024-05-12',
            end_date: '2024-05-20',
        }
    ]
};

export const CURRENT_TRIP = {
    id: 'trip-current',
    user_id: 'current-user',
    destination_city: 'Paris',
    start_date: '2026-04-10',
    end_date: '2026-04-20',
};

// ──────────────────────────────────────────────
// Stack A — Global Nomad (Travelers)
// These users each have trips; the matching
// algorithm will filter by overlap with CURRENT_TRIP
// ──────────────────────────────────────────────
export const TRAVELER_PROFILES = [
    {
        id: 't1',
        name: 'Alex Chen',
        age: 26,
        avatar: '🧔',
        bio: 'Photographer chasing golden hours across Europe.',
        home_city: 'Toronto',
        interests: ['Photography', 'Street Food', 'Jazz'],
        trips: [
            { destination_city: 'Paris', start_date: '2026-04-08', end_date: '2026-04-16' },
        ],
    },
    {
        id: 't2',
        name: 'Priya Sharma',
        age: 29,
        avatar: '👩‍🦱',
        bio: 'Digital nomad & coffee snob. Let\'s find the best café!',
        home_city: 'Mumbai',
        interests: ['Coffee', 'Remote Work', 'Art'],
        trips: [
            { destination_city: 'Paris', start_date: '2026-04-12', end_date: '2026-04-22' },
        ],
    },
    {
        id: 't3',
        name: 'Jordan Ellis',
        age: 24,
        avatar: '🧑‍🎤',
        bio: 'Backpacker on a mission to visit 50 countries before 30.',
        home_city: 'London',
        interests: ['Hiking', 'History', 'Hostels'],
        trips: [
            { destination_city: 'Paris', start_date: '2026-04-15', end_date: '2026-04-25' },
        ],
    },
    {
        id: 't4',
        name: 'Luna Kim',
        age: 28,
        avatar: '👩‍🎨',
        bio: 'Sketching my way through every museum in Europe.',
        home_city: 'Seoul',
        interests: ['Art', 'Museums', 'Wine'],
        trips: [
            { destination_city: 'Paris', start_date: '2026-04-09', end_date: '2026-04-14' },
        ],
    },
    {
        id: 't5',
        name: 'Marco Rossi',
        age: 31,
        avatar: '👨‍🍳',
        bio: 'Italian chef exploring French cuisine. Let\'s cook together!',
        home_city: 'Rome',
        interests: ['Cooking', 'Wine', 'Markets'],
        trips: [
            { destination_city: 'Paris', start_date: '2026-04-10', end_date: '2026-04-20' },
        ],
    },
    {
        id: 't6',
        name: 'Amara Osei',
        age: 25,
        avatar: '👩‍💼',
        bio: 'Travel writer & storyteller. Your city is my next chapter.',
        home_city: 'Accra',
        interests: ['Writing', 'Culture', 'Nightlife'],
        trips: [
            { destination_city: 'Paris', start_date: '2026-04-18', end_date: '2026-04-28' },
        ],
    },
    {
        id: 't7',
        name: 'Kai Andersen',
        age: 30,
        avatar: '🧑‍✈️',
        bio: 'Pilot on break. Exploring the city from the ground for once.',
        home_city: 'Copenhagen',
        interests: ['Aviation', 'Design', 'Cycling'],
        trips: [
            { destination_city: 'Paris', start_date: '2026-04-11', end_date: '2026-04-17' },
        ],
    },
    {
        id: 't8',
        name: 'Sofia Vega',
        age: 27,
        avatar: '💃',
        bio: 'Salsa dancer looking for the best dance spots in town.',
        home_city: 'Buenos Aires',
        interests: ['Dance', 'Music', 'Rooftop Bars'],
        trips: [
            { destination_city: 'Paris', start_date: '2026-04-05', end_date: '2026-04-12' },
        ],
    },
    {
        id: 't9',
        name: 'Yuki Tanaka',
        age: 23,
        avatar: '🎌',
        bio: 'Architecture student doing a semester abroad.',
        home_city: 'Tokyo',
        interests: ['Architecture', 'Ramen', 'Sketching'],
        trips: [
            { destination_city: 'Paris', start_date: '2026-04-01', end_date: '2026-04-30' },
        ],
    },
    {
        id: 't10',
        name: 'Liam O\'Brien',
        age: 32,
        avatar: '🍀',
        bio: 'Rugby fan & pub quiz champion. Looking for travel mates!',
        home_city: 'Dublin',
        interests: ['Sports', 'Pubs', 'Stand-up Comedy'],
        trips: [
            // No overlap — visiting a different city
            { destination_city: 'Berlin', start_date: '2026-04-10', end_date: '2026-04-20' },
        ],
    },
];

// ──────────────────────────────────────────────
// Stack B — Local Guides (Premium)
// These users live in the destination city
// ──────────────────────────────────────────────
export const LOCAL_PROFILES = [
    {
        id: 'l1',
        name: 'Marie Dupont',
        age: 30,
        avatar: '🇫🇷',
        bio: 'Born & raised in Le Marais. I know every hidden courtyard.',
        home_city: 'Paris',
        interests: ['Wine Bars', 'Street Art', 'Vintage Shops'],
        isLocal: true,
    },
    {
        id: 'l2',
        name: 'Pierre Laurent',
        age: 34,
        avatar: '🥖',
        bio: 'Boulanger by morning, city guide by afternoon.',
        home_city: 'Paris',
        interests: ['Bakeries', 'Seine Walks', 'Jazz Clubs'],
        isLocal: true,
    },
    {
        id: 'l3',
        name: 'Camille Moreau',
        age: 28,
        avatar: '🎨',
        bio: 'Artist in Montmartre. Let me show you the real Paris.',
        home_city: 'Paris',
        interests: ['Painting', 'Flea Markets', 'Cafés'],
        isLocal: true,
    },
    {
        id: 'l4',
        name: 'Hugo Bernard',
        age: 26,
        avatar: '🎸',
        bio: 'Musician who knows every live music venue in the city.',
        home_city: 'Paris',
        interests: ['Live Music', 'Record Shops', 'Craft Beer'],
        isLocal: true,
    },
];
