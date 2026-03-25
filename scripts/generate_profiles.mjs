import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { LOCATIONS } from '../src/data/locations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NAMES = {
  'Thailand': ['Somchai', 'Nong Khai', 'Aranya', 'Kanya'],
  'Malaysia': ['Ahmad', 'Siti', 'Wei', 'Arif'],
  'Indonesia': ['Budi', 'Ayu', 'Rizky', 'Putri'],
  'Vietnam': ['Nguyen', 'Trang', 'Minh', 'Linh'],
  'Japan': ['Kenji', 'Yuki', 'Hiro', 'Sakura'],
  'South Korea': ['Minjun', 'Jiwoo', 'Seoyeon', 'Doyun'],
  'China': ['Wei', 'Li', 'Chen', 'Wang'],
  'Taiwan': ['Yi-Chen', 'Wei', 'Hao', 'Ting'],
  'Nepal': ['Aarav', 'Priya', 'Sanjay', 'Maya'],
  'UAE': ['Omar', 'Fatima', 'Tariq', 'Aisha'],
  'Israel': ['Ari', 'Tamar', 'Noam', 'Maya'],
  'Portugal': ['Joao', 'Maria', 'Tiago', 'Ana'],
  'Netherlands': ['Lars', 'Emma', 'Bram', 'Sophie'],
  'France': ['Hugo', 'Emma', 'Lucas', 'Chloe'],
  'UK': ['Jack', 'Olivia', 'Harry', 'Amelia'],
  'Ireland': ['Conor', 'Aoife', 'Sean', 'Niamh'],
  'Denmark': ['Mikkel', 'Freja', 'Lukas', 'Ida'],
  'Sweden': ['Erik', 'Elsa', 'Lars', 'Astrid'],
  'Estonia': ['Rasmus', 'Laura', 'Martin', 'Anna'],
  'Hungary': ['Bence', 'Anna', 'Mate', 'Boglarka'],
  'Germany': ['Lukas', 'Mia', 'Felix', 'Emma'],
  'Austria': ['Max', 'Anna', 'David', 'Laura'],
  'Czech Republic': ['Jan', 'Eliska', 'Jakub', 'Tereza'],
  'Poland': ['Jakub', 'Zuzanna', 'Antoni', 'Julia'],
  'Spain': ['Alejandro', 'Lucia', 'Daniel', 'Maria'],
  'Italy': ['Leo', 'Sofia', 'Lorenzo', 'Giulia'],
  'Croatia': ['Luka', 'Mia', 'Ivan', 'Lucija'],
  'Malta': ['Joseph', 'Maria', 'Matthew', 'Elena'],
  'Greece': ['Giorgos', 'Maria', 'Giannis', 'Eleni'],
  'Georgia': ['Giorgi', 'Nino', 'Zurab', 'Mako'],
  'Turkey': ['Mehmet', 'Ayse', 'Mustafa', 'Fatma'],
  'USA': ['Alex', 'Sarah', 'Michael', 'Emily'],
  'Canada': ['Liam', 'Olivia', 'Noah', 'Emma'],
  'Mexico': ['Santiago', 'Sofia', 'Mateo', 'Valentina'],
  'Colombia': ['Samuel', 'Salome', 'Matias', 'Antonella'],
  'Argentina': ['Juan', 'Martina', 'Benjamin', 'Catalina'],
  'Peru': ['Luis', 'Maria', 'Carlos', 'Ana'],
  'Chile': ['Agustin', 'Isidora', 'Ben', 'Florencia'],
  'Brazil': ['Miguel', 'Alice', 'Arthur', 'Sophia'],
  'South Africa': ['Siyabonga', 'Thandeka', 'Liam', 'Mia'],
  'Morocco': ['Mohammed', 'Fatima', 'Youssef', 'Aya'],
  'Kenya': ['Brian', 'Mercy', 'Kevin', 'Cynthia'],
  'Tanzania': ['John', 'Mary', 'Joseph', 'Grace'],
  'Australia': ['Oliver', 'Charlotte', 'William', 'Amelia'],
  'India': ['Aryan', 'Diya', 'Rohan', 'Sneha', 'Vikram', 'Pooja', 'Rahul', 'Neha'],
  'Singapore': ['Wei', 'Hui', 'Jian', 'Xin'],
};

const DEFAULT_NAMES = ['Alex', 'Sam', 'Jordan', 'Taylor'];
const EMOJIS = ['🧔', '👨', '🧑', '👱', '👩', '👧', '👱‍♀️', '👩‍🦰', '😎', '🤠', '🤓', '🤙'];
const INTERESTS = ['Photography', 'Street Food', 'Jazz', 'Hiking', 'Architecture', 'Art Galleries', 'Nightlife', 'Surfing', 'Temples', 'Night Markets', 'Coffee', 'Live Music', 'History', 'Yoga', 'Backpacking'];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomAge = () => Math.floor(Math.random() * (38 - 22 + 1)) + 22;
const getNamesForCountry = (country) => NAMES[country] || DEFAULT_NAMES;

const getUniqueRandomTags = (num) => {
    let result = [];
    let pool = [...INTERESTS];
    for (let i = 0; i < num; i++) {
        let idx = Math.floor(Math.random() * pool.length);
        result.push(pool[idx]);
        pool.splice(idx, 1);
    }
    return result;
};

const DISCOVER_PROFILES = [];

LOCATIONS.forEach((city) => {
    // Generate 2 Locals — users whose home_city IS this city, no active trip
    for (let i = 1; i <= 2; i++) {
        const localNames = getNamesForCountry(city.country);
        DISCOVER_PROFILES.push({
            id: `lp-${city.id.replace('loc-', '')}-${i}`,
            name: getRandom(localNames),
            age: getRandomAge(),
            avatar: getRandom(EMOJIS),
            photo: null,
            bio: `Local guide in ${city.city}. I know all the hidden spots and best local eats! Let me show you my favorite neighborhood cafés.`,
            home_city: `${city.city}, ${city.country}`,
            interests: getUniqueRandomTags(3),
            is_premium: false,
            trips: [],
        });
    }

    // Generate 2 Travellers — users from elsewhere, with an active trip TO this city
    for (let i = 1; i <= 2; i++) {
        let homeLoc = getRandom(LOCATIONS);
        while (homeLoc.id === city.id) {
            homeLoc = getRandom(LOCATIONS);
        }

        const travNames = getNamesForCountry(homeLoc.country);
        DISCOVER_PROFILES.push({
            id: `tp-${city.id.replace('loc-', '')}-${i}`,
            name: getRandom(travNames),
            age: getRandomAge(),
            avatar: getRandom(EMOJIS),
            photo: null,
            bio: `Chasing sunsets around the world 🌅 Super excited to explore ${city.city} and discover what it has to offer! Looking for food recs.`,
            home_city: `${homeLoc.city}, ${homeLoc.country}`,
            interests: getUniqueRandomTags(3),
            is_premium: false,
            trips: [
                {
                    destination_city: city.city,
                    country: city.country,
                    start_date: '2026-04-05',
                    end_date: '2026-04-20',
                    is_active: true,
                },
            ],
        });
    }
});

const fileContent = `// Auto-generated ${DISCOVER_PROFILES.length} unified profiles
// Role (local vs traveller) is derived at runtime from home_city and trips,
// NOT stored as a type field.
//
// Local  = profile.home_city matches viewer's destination city
// Traveller = profile has a trip to viewer's destination city
export const DISCOVER_PROFILES = ${JSON.stringify(DISCOVER_PROFILES, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/discoverProfiles.js'), fileContent);
console.log(`Successfully generated src/data/discoverProfiles.js with ${DISCOVER_PROFILES.length} unified profiles.`);
