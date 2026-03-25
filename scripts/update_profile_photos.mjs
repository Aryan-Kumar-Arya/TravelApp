#!/usr/bin/env node
/**
 * Scans assets/profiles/ for generated images and updates
 * discoverProfiles.js to reference them via require().
 *
 * Usage: node scripts/update_profile_photos.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PROFILES_DIR = path.join(ROOT, 'assets', 'profiles');
const DATA_FILE = path.join(ROOT, 'src', 'data', 'discoverProfiles.js');

// 1. Scan for available images
const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp'];
const availableImages = new Set();

if (fs.existsSync(PROFILES_DIR)) {
  for (const file of fs.readdirSync(PROFILES_DIR)) {
    const ext = path.extname(file).toLowerCase();
    if (imageExtensions.includes(ext)) {
      const id = path.basename(file, ext);
      availableImages.add(id);
    }
  }
}

console.log(`Found ${availableImages.size} profile images in assets/profiles/`);

if (availableImages.size === 0) {
  console.log('No images found. Add images named {profile-id}.png to assets/profiles/ first.');
  process.exit(0);
}

// 2. Read the data file
let content = fs.readFileSync(DATA_FILE, 'utf-8');

// 3. For each available image, update the photo field
let updatedCount = 0;

for (const profileId of availableImages) {
  // Find the image file extension
  let imageFile = null;
  for (const ext of imageExtensions) {
    const filePath = path.join(PROFILES_DIR, `${profileId}${ext}`);
    if (fs.existsSync(filePath)) {
      imageFile = `${profileId}${ext}`;
      break;
    }
  }

  if (!imageFile) continue;

  // Match the pattern: "id": "profileId", ... "photo": null
  // We need to find the profile block and replace photo: null with a require
  const idPattern = `"id": "${profileId}"`;
  const idIndex = content.indexOf(idPattern);

  if (idIndex === -1) {
    console.warn(`  Profile ID "${profileId}" not found in data file, skipping.`);
    continue;
  }

  // Find the next "photo": null after this id
  const photoNullPattern = '"photo": null';
  const searchStart = idIndex;
  const nextIdIndex = content.indexOf('"id":', idIndex + idPattern.length);
  const searchEnd = nextIdIndex === -1 ? content.length : nextIdIndex;

  const photoIndex = content.indexOf(photoNullPattern, searchStart);

  if (photoIndex === -1 || photoIndex > searchEnd) {
    // Photo might already be set
    console.log(`  ${profileId}: photo already set or not found, skipping.`);
    continue;
  }

  const requirePath = `require('../../../assets/profiles/${imageFile}')`;
  content = content.slice(0, photoIndex) +
    `"photo": ${requirePath}` +
    content.slice(photoIndex + photoNullPattern.length);

  updatedCount++;
}

// 4. Write back
fs.writeFileSync(DATA_FILE, content, 'utf-8');

console.log(`\nUpdated ${updatedCount} profile(s) with photo references.`);
console.log(`Remaining without photos: ${400 - updatedCount} (approximate)`);

// 5. List which profiles still need images
const allIds = [...content.matchAll(/"id":\s*"([^"]+)"/g)].map(m => m[1]);
const missing = allIds.filter(id => !availableImages.has(id));
if (missing.length > 0 && missing.length <= 20) {
  console.log('\nProfiles still missing images:');
  missing.forEach(id => console.log(`  - ${id}`));
} else if (missing.length > 20) {
  console.log(`\n${missing.length} profiles still need images. Run with --list-missing to see all.`);
  if (process.argv.includes('--list-missing')) {
    missing.forEach(id => console.log(`  - ${id}`));
  }
}
