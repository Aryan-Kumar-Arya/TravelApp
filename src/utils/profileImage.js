import { PROFILE_IMAGES } from '../data/profileImages';

/**
 * Resolves the image source for a profile.
 *
 * Priority:
 *   1. Remote URL in profile.photo (production — Supabase/CDN)
 *   2. Local bundled asset from PROFILE_IMAGES map (demo/dev)
 *   3. null (caller should show fallback gradient or emoji)
 *
 * Returns a value ready for <Image source={...} />:
 *   - { uri: "https://..." } for remote URLs
 *   - A require() number for local assets
 *   - null if no image is available
 */
export function getProfileImageSource(profile) {
  if (!profile) return null;

  // 1. Remote URL takes priority (production)
  if (profile.photo && typeof profile.photo === 'string') {
    return { uri: profile.photo };
  }

  // 2. Already a require() result (number) — pass through
  if (profile.photo && typeof profile.photo === 'number') {
    return profile.photo;
  }

  // 3. Local bundled asset lookup by profile ID
  const localAsset = PROFILE_IMAGES[profile.id];
  if (localAsset) {
    return localAsset;
  }

  // 4. Check photos array (for current user / matched profiles)
  if (profile.photos && profile.photos.length > 0) {
    const firstPhoto = profile.photos[0];
    if (typeof firstPhoto === 'string') return { uri: firstPhoto };
    if (typeof firstPhoto === 'number') return firstPhoto;
  }

  return null;
}
