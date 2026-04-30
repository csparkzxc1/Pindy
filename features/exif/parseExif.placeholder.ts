/**
 * EXIF metadata parsing — placeholder for the MVP.
 *
 * The real implementation will:
 *   1) Read the photo's binary header (e.g. via `expo-image-manipulator` or
 *      a JS EXIF parser like `piexifjs`).
 *   2) Extract GPSLatitude / GPSLongitude (with hemisphere refs) and
 *      DateTimeOriginal.
 *   3) Convert to decimal degrees and ISO 8601.
 *
 * The shape exported here is the contract the rest of the app codes against,
 * so tests + clustering work even before the I/O is wired.
 */

import type { LngLat } from '@/features/map/geo';

export type PhotoLike = {
  id: string;
  uri: string;
  /** Optional EXIF takenAt fed in from the host (e.g. MediaLibrary asset) */
  takenAt?: string;
  /** Optional EXIF location fed in from the host */
  location?: LngLat;
};

export type ExifLocation = {
  latitude: number;
  longitude: number;
  takenAt: string; // ISO
};

/**
 * Returns the EXIF location of a photo. MVP stub honors any `takenAt` /
 * `location` hints already attached to the input (so tests can supply them);
 * otherwise returns null.
 */
export async function parseExifLocation(
  photo: PhotoLike,
): Promise<ExifLocation | null> {
  if (photo.location && photo.takenAt) {
    return {
      latitude: photo.location.latitude,
      longitude: photo.location.longitude,
      takenAt: photo.takenAt,
    };
  }
  return null;
}

/**
 * Batch variant — extracts EXIF for many photos in parallel and drops the
 * ones with no location data.
 */
export async function parseExifBatch(
  photos: PhotoLike[],
): Promise<Array<{ photo: PhotoLike; exif: ExifLocation }>> {
  const results = await Promise.all(
    photos.map(async (p) => ({ photo: p, exif: await parseExifLocation(p) })),
  );
  return results.filter(
    (r): r is { photo: PhotoLike; exif: ExifLocation } => r.exif !== null,
  );
}
