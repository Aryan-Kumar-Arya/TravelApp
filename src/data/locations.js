// ─────────────────────────────────────────────────────────────────────────────
// locations.js
// Consolidated Location Masterlist — Single source of truth for all 100 cities
// Each city: { id, city, country, region, coordinates, timezone, image }
// ─────────────────────────────────────────────────────────────────────────────

const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

export const LOCATIONS = [

  // ═══════════════════════════════════════════════════════════════════════════
  //  SOUTHEAST ASIA (9)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'loc-chiang-mai',
    city: 'Chiang Mai',
    country: 'Thailand',
    region: 'Southeast Asia',
    coordinates: { lat: 18.7883, lng: 98.9853 },
    timezone: 'Asia/Bangkok',
    image: U('photo-1528360983277-13d401cdc186'),
  },
  {
    id: 'loc-bangkok',
    city: 'Bangkok',
    country: 'Thailand',
    region: 'Southeast Asia',
    coordinates: { lat: 13.7563, lng: 100.5018 },
    timezone: 'Asia/Bangkok',
    image: U('photo-1508009603885-50cf7c579365'),
  },
  {
    id: 'loc-kuala-lumpur',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    region: 'Southeast Asia',
    coordinates: { lat: 3.1390, lng: 101.6869 },
    timezone: 'Asia/Kuala_Lumpur',
    image: U('photo-1596422846543-75c6fc197f07'),
  },
  {
    id: 'loc-penang',
    city: 'Penang',
    country: 'Malaysia',
    region: 'Southeast Asia',
    coordinates: { lat: 5.4164, lng: 100.3327 },
    timezone: 'Asia/Kuala_Lumpur',
    image: U('photo-1586768778173-813194cd4458'),
  },
  {
    id: 'loc-bali-canggu',
    city: 'Bali (Canggu)',
    country: 'Indonesia',
    region: 'Southeast Asia',
    coordinates: { lat: -8.6478, lng: 115.1385 },
    timezone: 'Asia/Makassar',
    image: U('photo-1537953773345-d172ccf13cf4'),
  },
  {
    id: 'loc-ubud',
    city: 'Ubud',
    country: 'Indonesia',
    region: 'Southeast Asia',
    coordinates: { lat: -8.5069, lng: 115.2625 },
    timezone: 'Asia/Makassar',
    image: U('photo-1537996194471-e657df975ab4'),
  },
  {
    id: 'loc-singapore',
    city: 'Singapore',
    country: 'Singapore',
    region: 'Southeast Asia',
    coordinates: { lat: 1.3521, lng: 103.8198 },
    timezone: 'Asia/Singapore',
    image: U('photo-1525625293386-3f8f99389edd'),
  },
  {
    id: 'loc-ho-chi-minh',
    city: 'Ho Chi Minh City',
    country: 'Vietnam',
    region: 'Southeast Asia',
    coordinates: { lat: 10.8231, lng: 106.6297 },
    timezone: 'Asia/Ho_Chi_Minh',
    image: U('photo-1583417319070-4a69db38a482'),
  },
  {
    id: 'loc-da-nang',
    city: 'Da Nang',
    country: 'Vietnam',
    region: 'Southeast Asia',
    coordinates: { lat: 16.0544, lng: 108.2022 },
    timezone: 'Asia/Ho_Chi_Minh',
    image: U('photo-1559592413-7cec4d0cae2b'),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  EAST ASIA (6)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'loc-taipei',
    city: 'Taipei',
    country: 'Taiwan',
    region: 'East Asia',
    coordinates: { lat: 25.0330, lng: 121.5654 },
    timezone: 'Asia/Taipei',
    image: U('photo-1470004914212-05527e49370b'),
  },
  {
    id: 'loc-tokyo',
    city: 'Tokyo',
    country: 'Japan',
    region: 'East Asia',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    timezone: 'Asia/Tokyo',
    image: U('photo-1540959733332-eab4deabeeaf'),
  },
  {
    id: 'loc-kyoto',
    city: 'Kyoto',
    country: 'Japan',
    region: 'East Asia',
    coordinates: { lat: 35.0116, lng: 135.7681 },
    timezone: 'Asia/Tokyo',
    image: U('photo-1493976040374-85c8e12f0c0e'),
  },
  {
    id: 'loc-osaka',
    city: 'Osaka',
    country: 'Japan',
    region: 'East Asia',
    coordinates: { lat: 34.6937, lng: 135.5023 },
    timezone: 'Asia/Tokyo',
    image: U('photo-1590559899731-a382839e5549'),
  },
  {
    id: 'loc-seoul',
    city: 'Seoul',
    country: 'South Korea',
    region: 'East Asia',
    coordinates: { lat: 37.5665, lng: 126.9780 },
    timezone: 'Asia/Seoul',
    image: U('photo-1534274988757-a28bf1a57c17'),
  },
  {
    id: 'loc-hong-kong',
    city: 'Hong Kong',
    country: 'China',
    region: 'East Asia',
    coordinates: { lat: 22.3193, lng: 114.1694 },
    timezone: 'Asia/Hong_Kong',
    image: U('photo-1536599018102-9f803c140fc1'),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  SOUTH ASIA (1 — non-India)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'loc-kathmandu',
    city: 'Kathmandu',
    country: 'Nepal',
    region: 'South Asia',
    coordinates: { lat: 27.7172, lng: 85.3240 },
    timezone: 'Asia/Kathmandu',
    image: U('photo-1558799401-1dcba79834c2'),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  MIDDLE EAST (2)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'loc-dubai',
    city: 'Dubai',
    country: 'UAE',
    region: 'Middle East',
    coordinates: { lat: 25.2048, lng: 55.2708 },
    timezone: 'Asia/Dubai',
    image: U('photo-1512453979798-5ea266f8880c'),
  },
  {
    id: 'loc-tel-aviv',
    city: 'Tel Aviv',
    country: 'Israel',
    region: 'Middle East',
    coordinates: { lat: 32.0853, lng: 34.7818 },
    timezone: 'Asia/Jerusalem',
    image: U('photo-1544735716-392fe2489ffa'),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  WESTERN EUROPE (7)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'loc-lisbon',
    city: 'Lisbon',
    country: 'Portugal',
    region: 'Western Europe',
    coordinates: { lat: 38.7223, lng: -9.1393 },
    timezone: 'Europe/Lisbon',
    image: U('photo-1555881400-74d7acaacd8b'),
  },
  {
    id: 'loc-porto',
    city: 'Porto',
    country: 'Portugal',
    region: 'Western Europe',
    coordinates: { lat: 41.1579, lng: -8.6291 },
    timezone: 'Europe/Lisbon',
    image: U('photo-1555881400-74d7acaacd8b'),
  },
  {
    id: 'loc-amsterdam',
    city: 'Amsterdam',
    country: 'Netherlands',
    region: 'Western Europe',
    coordinates: { lat: 52.3676, lng: 4.9041 },
    timezone: 'Europe/Amsterdam',
    image: U('photo-1534351590666-13e3e96b5017'),
  },
  {
    id: 'loc-paris',
    city: 'Paris',
    country: 'France',
    region: 'Western Europe',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    timezone: 'Europe/Paris',
    image: U('photo-1502602898657-3e91760cbb34'),
  },
  {
    id: 'loc-london',
    city: 'London',
    country: 'UK',
    region: 'Western Europe',
    coordinates: { lat: 51.5074, lng: -0.1278 },
    timezone: 'Europe/London',
    image: U('photo-1513635269975-59663e0ac1ad'),
  },
  {
    id: 'loc-dublin',
    city: 'Dublin',
    country: 'Ireland',
    region: 'Western Europe',
    coordinates: { lat: 53.3498, lng: -6.2603 },
    timezone: 'Europe/Dublin',
    image: U('photo-1549918864-48ac978761a4'),
  },
  {
    id: 'loc-edinburgh',
    city: 'Edinburgh',
    country: 'UK',
    region: 'Western Europe',
    coordinates: { lat: 55.9533, lng: -3.1883 },
    timezone: 'Europe/London',
    image: U('photo-1506377585622-bedcbb027afc'),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  NORTHERN EUROPE (3)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'loc-copenhagen',
    city: 'Copenhagen',
    country: 'Denmark',
    region: 'Northern Europe',
    coordinates: { lat: 55.6761, lng: 12.5683 },
    timezone: 'Europe/Copenhagen',
    image: U('photo-1513622470522-26c3c8a854bc'),
  },
  {
    id: 'loc-stockholm',
    city: 'Stockholm',
    country: 'Sweden',
    region: 'Northern Europe',
    coordinates: { lat: 59.3293, lng: 18.0686 },
    timezone: 'Europe/Stockholm',
    image: U('photo-1509356843151-3e7d96241e11'),
  },
  {
    id: 'loc-tallinn',
    city: 'Tallinn',
    country: 'Estonia',
    region: 'Northern Europe',
    coordinates: { lat: 59.4370, lng: 24.7536 },
    timezone: 'Europe/Tallinn',
    image: U('photo-1565008576549-57569a49371d'),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  CENTRAL EUROPE (5)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'loc-budapest',
    city: 'Budapest',
    country: 'Hungary',
    region: 'Central Europe',
    coordinates: { lat: 47.4979, lng: 19.0402 },
    timezone: 'Europe/Budapest',
    image: U('photo-1551867633-194f125bddfa'),
  },
  {
    id: 'loc-berlin',
    city: 'Berlin',
    country: 'Germany',
    region: 'Central Europe',
    coordinates: { lat: 52.5200, lng: 13.4050 },
    timezone: 'Europe/Berlin',
    image: U('photo-1560969184-10fe8719e047'),
  },
  {
    id: 'loc-munich',
    city: 'Munich',
    country: 'Germany',
    region: 'Central Europe',
    coordinates: { lat: 48.1351, lng: 11.5820 },
    timezone: 'Europe/Berlin',
    image: U('photo-1595867818082-083862f3d630'),
  },
  {
    id: 'loc-vienna',
    city: 'Vienna',
    country: 'Austria',
    region: 'Central Europe',
    coordinates: { lat: 48.2082, lng: 16.3738 },
    timezone: 'Europe/Vienna',
    image: U('photo-1516550893923-42d28e5677af'),
  },
  {
    id: 'loc-prague',
    city: 'Prague',
    country: 'Czech Republic',
    region: 'Central Europe',
    coordinates: { lat: 50.0755, lng: 14.4378 },
    timezone: 'Europe/Prague',
    image: U('photo-1541849546-216549ae216d'),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  EASTERN EUROPE (2)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'loc-warsaw',
    city: 'Warsaw',
    country: 'Poland',
    region: 'Eastern Europe',
    coordinates: { lat: 52.2297, lng: 21.0122 },
    timezone: 'Europe/Warsaw',
    image: U('photo-1519197924294-4ba991a11128'),
  },
  {
    id: 'loc-krakow',
    city: 'Krakow',
    country: 'Poland',
    region: 'Eastern Europe',
    coordinates: { lat: 50.0647, lng: 19.9450 },
    timezone: 'Europe/Warsaw',
    image: U('photo-1564510714747-69c3bc1fab41'),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  SOUTHERN EUROPE (8)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'loc-barcelona',
    city: 'Barcelona',
    country: 'Spain',
    region: 'Southern Europe',
    coordinates: { lat: 41.3874, lng: 2.1686 },
    timezone: 'Europe/Madrid',
    image: U('photo-1583422409516-2895a77efded'),
  },
  {
    id: 'loc-valencia',
    city: 'Valencia',
    country: 'Spain',
    region: 'Southern Europe',
    coordinates: { lat: 39.4699, lng: -0.3763 },
    timezone: 'Europe/Madrid',
    image: U('photo-1558531304-a4773b7e3a9c'),
  },
  {
    id: 'loc-seville',
    city: 'Seville',
    country: 'Spain',
    region: 'Southern Europe',
    coordinates: { lat: 37.3891, lng: -5.9845 },
    timezone: 'Europe/Madrid',
    image: U('photo-1558642452-9d2a7deb7f62'),
  },
  {
    id: 'loc-rome',
    city: 'Rome',
    country: 'Italy',
    region: 'Southern Europe',
    coordinates: { lat: 41.9028, lng: 12.4964 },
    timezone: 'Europe/Rome',
    image: U('photo-1552832230-c0197dd311b5'),
  },
  {
    id: 'loc-florence',
    city: 'Florence',
    country: 'Italy',
    region: 'Southern Europe',
    coordinates: { lat: 43.7696, lng: 11.2558 },
    timezone: 'Europe/Rome',
    image: U('photo-1543429258-c5ca3e1b6a2e'),
  },
  {
    id: 'loc-hvar',
    city: 'Hvar',
    country: 'Croatia',
    region: 'Southern Europe',
    coordinates: { lat: 43.1729, lng: 16.4411 },
    timezone: 'Europe/Zagreb',
    image: U('photo-1555993539-1732b0258235'),
  },
  {
    id: 'loc-split',
    city: 'Split',
    country: 'Croatia',
    region: 'Southern Europe',
    coordinates: { lat: 43.5081, lng: 16.4402 },
    timezone: 'Europe/Zagreb',
    image: U('photo-1555990538-1e0d70f05ffe'),
  },
  {
    id: 'loc-valletta',
    city: 'Valletta',
    country: 'Malta',
    region: 'Southern Europe',
    coordinates: { lat: 35.8989, lng: 14.5146 },
    timezone: 'Europe/Malta',
    image: U('photo-1514890547357-a9ee288728e0'),
  },
  {
    id: 'loc-athens',
    city: 'Athens',
    country: 'Greece',
    region: 'Southern Europe',
    coordinates: { lat: 37.9838, lng: 23.7275 },
    timezone: 'Europe/Athens',
    image: U('photo-1555993539-1732b0258235'),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  CAUCASUS & TURKEY (2)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'loc-tbilisi',
    city: 'Tbilisi',
    country: 'Georgia',
    region: 'Caucasus',
    coordinates: { lat: 41.7151, lng: 44.8271 },
    timezone: 'Asia/Tbilisi',
    image: U('photo-1602080858428-57798f8c9a87'),
  },
  {
    id: 'loc-istanbul',
    city: 'Istanbul',
    country: 'Turkey',
    region: 'Caucasus',
    coordinates: { lat: 41.0082, lng: 28.9784 },
    timezone: 'Europe/Istanbul',
    image: U('photo-1541432901042-2d8bd64b4a9b'),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  NORTH AMERICA (4)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'loc-new-york',
    city: 'New York City',
    country: 'USA',
    region: 'North America',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    timezone: 'America/New_York',
    image: U('photo-1496442226666-8d4d0e62e6e9'),
  },
  {
    id: 'loc-los-angeles',
    city: 'Los Angeles',
    country: 'USA',
    region: 'North America',
    coordinates: { lat: 34.0522, lng: -118.2437 },
    timezone: 'America/Los_Angeles',
    image: U('photo-1534190760961-74e8c1c5c3da'),
  },
  {
    id: 'loc-san-francisco',
    city: 'San Francisco',
    country: 'USA',
    region: 'North America',
    coordinates: { lat: 37.7749, lng: -122.4194 },
    timezone: 'America/Los_Angeles',
    image: U('photo-1501594907352-04cda38ebc29'),
  },
  {
    id: 'loc-toronto',
    city: 'Toronto',
    country: 'Canada',
    region: 'North America',
    coordinates: { lat: 43.6532, lng: -79.3832 },
    timezone: 'America/Toronto',
    image: U('photo-1517935706615-2717063c2225'),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  LATIN AMERICA (12)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'loc-mexico-city',
    city: 'Mexico City',
    country: 'Mexico',
    region: 'Latin America',
    coordinates: { lat: 19.4326, lng: -99.1332 },
    timezone: 'America/Mexico_City',
    image: U('photo-1518638150340-f706e86654de'),
  },
  {
    id: 'loc-playa-del-carmen',
    city: 'Playa del Carmen',
    country: 'Mexico',
    region: 'Latin America',
    coordinates: { lat: 20.6296, lng: -87.0739 },
    timezone: 'America/Cancun',
    image: U('photo-1507525428034-b723cf961d3e'),
  },
  {
    id: 'loc-tulum',
    city: 'Tulum',
    country: 'Mexico',
    region: 'Latin America',
    coordinates: { lat: 20.2114, lng: -87.4654 },
    timezone: 'America/Cancun',
    image: U('photo-1504730030853-eff311f57d3c'),
  },
  {
    id: 'loc-medellin',
    city: 'Medellín',
    country: 'Colombia',
    region: 'Latin America',
    coordinates: { lat: 6.2442, lng: -75.5812 },
    timezone: 'America/Bogota',
    image: U('photo-1598887141338-571d7d5bcd68'),
  },
  {
    id: 'loc-bogota',
    city: 'Bogotá',
    country: 'Colombia',
    region: 'Latin America',
    coordinates: { lat: 4.7110, lng: -74.0721 },
    timezone: 'America/Bogota',
    image: U('photo-1568632234157-ce7aecd03d0d'),
  },
  {
    id: 'loc-cartagena',
    city: 'Cartagena',
    country: 'Colombia',
    region: 'Latin America',
    coordinates: { lat: 10.3910, lng: -75.5364 },
    timezone: 'America/Bogota',
    image: U('photo-1583531352515-8884d065a3a8'),
  },
  {
    id: 'loc-buenos-aires',
    city: 'Buenos Aires',
    country: 'Argentina',
    region: 'Latin America',
    coordinates: { lat: -34.6037, lng: -58.3816 },
    timezone: 'America/Argentina/Buenos_Aires',
    image: U('photo-1589909202802-8f4aadce1849'),
  },
  {
    id: 'loc-lima',
    city: 'Lima',
    country: 'Peru',
    region: 'Latin America',
    coordinates: { lat: -12.0464, lng: -77.0428 },
    timezone: 'America/Lima',
    image: U('photo-1531968455001-5098b5e20438'),
  },
  {
    id: 'loc-cusco',
    city: 'Cusco',
    country: 'Peru',
    region: 'Latin America',
    coordinates: { lat: -13.5320, lng: -71.9675 },
    timezone: 'America/Lima',
    image: U('photo-1526392060635-9d6019884377'),
  },
  {
    id: 'loc-santiago',
    city: 'Santiago',
    country: 'Chile',
    region: 'Latin America',
    coordinates: { lat: -33.4489, lng: -70.6693 },
    timezone: 'America/Santiago',
    image: U('photo-1547143379-5c09bbcd12b6'),
  },
  {
    id: 'loc-sao-paulo',
    city: 'São Paulo',
    country: 'Brazil',
    region: 'Latin America',
    coordinates: { lat: -23.5505, lng: -46.6333 },
    timezone: 'America/Sao_Paulo',
    image: U('photo-1543059080-f9b1272213d5'),
  },
  {
    id: 'loc-rio-de-janeiro',
    city: 'Rio de Janeiro',
    country: 'Brazil',
    region: 'Latin America',
    coordinates: { lat: -22.9068, lng: -43.1729 },
    timezone: 'America/Sao_Paulo',
    image: U('photo-1483729558449-99ef09a8c325'),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  AFRICA (4)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'loc-cape-town',
    city: 'Cape Town',
    country: 'South Africa',
    region: 'Africa',
    coordinates: { lat: -33.9249, lng: 18.4241 },
    timezone: 'Africa/Johannesburg',
    image: U('photo-1580060839134-75a5edca2e99'),
  },
  {
    id: 'loc-marrakech',
    city: 'Marrakech',
    country: 'Morocco',
    region: 'Africa',
    coordinates: { lat: 31.6295, lng: -7.9811 },
    timezone: 'Africa/Casablanca',
    image: U('photo-1597211684565-dca64d72c855'),
  },
  {
    id: 'loc-nairobi',
    city: 'Nairobi',
    country: 'Kenya',
    region: 'Africa',
    coordinates: { lat: -1.2921, lng: 36.8219 },
    timezone: 'Africa/Nairobi',
    image: U('photo-1611348524140-53c9a25263d6'),
  },
  {
    id: 'loc-zanzibar',
    city: 'Zanzibar',
    country: 'Tanzania',
    region: 'Africa',
    coordinates: { lat: -6.1659, lng: 39.2026 },
    timezone: 'Africa/Dar_es_Salaam',
    image: U('photo-1547471080-7cc2caa01a7e'),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  OCEANIA (2)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'loc-sydney',
    city: 'Sydney',
    country: 'Australia',
    region: 'Oceania',
    coordinates: { lat: -33.8688, lng: 151.2093 },
    timezone: 'Australia/Sydney',
    image: U('photo-1506973035872-a4ec16b8e8d9'),
  },
  {
    id: 'loc-melbourne',
    city: 'Melbourne',
    country: 'Australia',
    region: 'Oceania',
    coordinates: { lat: -37.8136, lng: 144.9631 },
    timezone: 'Australia/Melbourne',
    image: U('photo-1514395462725-fb4566210144'),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  INDIA — NORTH (Himalayas & Plains) (10)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'loc-delhi',
    city: 'Delhi',
    country: 'India',
    region: 'North India',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1587474260584-136574528ed5'),
  },
  {
    id: 'loc-leh',
    city: 'Leh',
    country: 'India',
    region: 'North India',
    coordinates: { lat: 34.1526, lng: 77.5771 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1506905925346-21bda4d32df4'),
  },
  {
    id: 'loc-old-manali',
    city: 'Old Manali',
    country: 'India',
    region: 'North India',
    coordinates: { lat: 32.2727, lng: 77.1892 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1470770841072-f978cf4d019e'),
  },
  {
    id: 'loc-kasol',
    city: 'Kasol',
    country: 'India',
    region: 'North India',
    coordinates: { lat: 32.0101, lng: 77.3152 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1464822759023-fed622ff2c3b'),
  },
  {
    id: 'loc-bir-billing',
    city: 'Bir Billing',
    country: 'India',
    region: 'North India',
    coordinates: { lat: 31.8837, lng: 76.7221 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1530870110042-98b2cb110834'),
  },
  {
    id: 'loc-dharamshala',
    city: 'Dharamshala',
    country: 'India',
    region: 'North India',
    coordinates: { lat: 32.2190, lng: 76.3234 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1466921583968-f07aa80c526e'),
  },
  {
    id: 'loc-mcleod-ganj',
    city: 'McLeod Ganj',
    country: 'India',
    region: 'North India',
    coordinates: { lat: 32.2426, lng: 76.3213 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1466921583968-f07aa80c526e'),
  },
  {
    id: 'loc-rishikesh',
    city: 'Rishikesh',
    country: 'India',
    region: 'North India',
    coordinates: { lat: 30.0869, lng: 78.2676 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1583367735697-00a81c93e40f'),
  },
  {
    id: 'loc-amritsar',
    city: 'Amritsar',
    country: 'India',
    region: 'North India',
    coordinates: { lat: 31.6340, lng: 74.8723 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1587922546307-776227941871'),
  },
  {
    id: 'loc-varanasi',
    city: 'Varanasi',
    country: 'India',
    region: 'North India',
    coordinates: { lat: 25.3176, lng: 82.9739 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1561361058-c24cecae35ca'),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  INDIA — NORTHEAST (1)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'loc-shillong',
    city: 'Shillong',
    country: 'India',
    region: 'Northeast India',
    coordinates: { lat: 25.5788, lng: 91.8933 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1477950014900-c38d0d0d0c4e'),
  },
  {
    id: 'loc-darjeeling',
    city: 'Darjeeling',
    country: 'India',
    region: 'Northeast India',
    coordinates: { lat: 27.0360, lng: 88.2627 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1470770841072-f978cf4d019e'),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  INDIA — RAJASTHAN (4)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'loc-jaipur',
    city: 'Jaipur',
    country: 'India',
    region: 'Rajasthan',
    coordinates: { lat: 26.9124, lng: 75.7873 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1599661046289-e31897846e41'),
  },
  {
    id: 'loc-udaipur',
    city: 'Udaipur',
    country: 'India',
    region: 'Rajasthan',
    coordinates: { lat: 24.5854, lng: 73.7125 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1587922546307-776227941871'),
  },
  {
    id: 'loc-jodhpur',
    city: 'Jodhpur',
    country: 'India',
    region: 'Rajasthan',
    coordinates: { lat: 26.2389, lng: 73.0243 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1524492412937-b28074a5d7da'),
  },
  {
    id: 'loc-pushkar',
    city: 'Pushkar',
    country: 'India',
    region: 'Rajasthan',
    coordinates: { lat: 26.4897, lng: 74.5511 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1477959858617-67f85cf4f1df'),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  INDIA — WEST (3)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'loc-mumbai',
    city: 'Mumbai',
    country: 'India',
    region: 'West India',
    coordinates: { lat: 19.0760, lng: 72.8777 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1570168007204-dfb528c6958f'),
  },
  {
    id: 'loc-ahmedabad',
    city: 'Ahmedabad',
    country: 'India',
    region: 'West India',
    coordinates: { lat: 23.0225, lng: 72.5714 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1569154941061-e231b4725ef1'),
  },
  {
    id: 'loc-goa',
    city: 'Goa',
    country: 'India',
    region: 'West India',
    coordinates: { lat: 15.2993, lng: 74.1240 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1512343879784-a960bf40e7f2'),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  INDIA — EAST (1)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'loc-kolkata',
    city: 'Kolkata',
    country: 'India',
    region: 'East India',
    coordinates: { lat: 22.5726, lng: 88.3639 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1558431382-27e303142255'),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  INDIA — SOUTH (11)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'loc-hyderabad',
    city: 'Hyderabad',
    country: 'India',
    region: 'South India',
    coordinates: { lat: 17.3850, lng: 78.4867 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1572638533891-e4917c4a5300'),
  },
  {
    id: 'loc-chennai',
    city: 'Chennai',
    country: 'India',
    region: 'South India',
    coordinates: { lat: 13.0827, lng: 80.2707 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1582510003544-4d00b7f74220'),
  },
  {
    id: 'loc-bangalore',
    city: 'Bangalore',
    country: 'India',
    region: 'South India',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1596176530529-78163a4f7af2'),
  },
  {
    id: 'loc-mysore',
    city: 'Mysore',
    country: 'India',
    region: 'South India',
    coordinates: { lat: 12.2958, lng: 76.6394 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1599661046289-e31897846e41'),
  },
  {
    id: 'loc-ooty',
    city: 'Ooty',
    country: 'India',
    region: 'South India',
    coordinates: { lat: 11.4102, lng: 76.6950 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1523301343968-6a6ebf63c672'),
  },
  {
    id: 'loc-coorg',
    city: 'Coorg',
    country: 'India',
    region: 'South India',
    coordinates: { lat: 12.3375, lng: 75.8069 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1523301343968-6a6ebf63c672'),
  },
  {
    id: 'loc-gokarna',
    city: 'Gokarna',
    country: 'India',
    region: 'South India',
    coordinates: { lat: 14.5479, lng: 74.3188 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1507525428034-b723cf961d3e'),
  },
  {
    id: 'loc-hampi',
    city: 'Hampi',
    country: 'India',
    region: 'South India',
    coordinates: { lat: 15.3350, lng: 76.4600 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1620766182966-c6eb5ed2b788'),
  },
  {
    id: 'loc-kochi',
    city: 'Kochi',
    country: 'India',
    region: 'South India',
    coordinates: { lat: 9.9312, lng: 76.2673 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1557750255-c06826e74a0d'),
  },
  {
    id: 'loc-varkala',
    city: 'Varkala',
    country: 'India',
    region: 'South India',
    coordinates: { lat: 8.7379, lng: 76.7163 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1507525428034-b723cf961d3e'),
  },
  {
    id: 'loc-puducherry',
    city: 'Puducherry',
    country: 'India',
    region: 'South India',
    coordinates: { lat: 11.9416, lng: 79.8083 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1552465011-b4e21bf6e79a'),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  INDIA — ISLANDS (1)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'loc-andaman-islands',
    city: 'Andaman Islands',
    country: 'India',
    region: 'Indian Islands',
    coordinates: { lat: 11.7401, lng: 92.6586 },
    timezone: 'Asia/Kolkata',
    image: U('photo-1544551763-46a013bb70d5'),
  },
];


// ═══════════════════════════════════════════════════════════════════════════
//  UTILITY HELPERS
// ═══════════════════════════════════════════════════════════════════════════

/** Get a location object by city name (case-insensitive, partial match) */
export const getLocationByCity = (cityName) => {
  if (!cityName) return null;
  const lower = cityName.toLowerCase();
  return LOCATIONS.find(
    (loc) =>
      loc.city.toLowerCase() === lower ||
      lower.includes(loc.city.toLowerCase()) ||
      loc.city.toLowerCase().includes(lower)
  ) || null;
};

/** Get a location object by its id */
export const getLocationById = (id) => {
  return LOCATIONS.find((loc) => loc.id === id) || null;
};

/** Get all locations for a given region */
export const getLocationsByRegion = (region) => {
  if (!region) return [];
  return LOCATIONS.filter(
    (loc) => loc.region.toLowerCase() === region.toLowerCase()
  );
};

/** Get all locations for a given country */
export const getLocationsByCountry = (country) => {
  if (!country) return [];
  return LOCATIONS.filter(
    (loc) => loc.country.toLowerCase() === country.toLowerCase()
  );
};

/** All unique regions */
export const ALL_REGIONS = [...new Set(LOCATIONS.map((loc) => loc.region))];

/** All unique countries */
export const ALL_COUNTRIES = [...new Set(LOCATIONS.map((loc) => loc.country))];

/** Total location count */
export const LOCATION_COUNT = LOCATIONS.length;
