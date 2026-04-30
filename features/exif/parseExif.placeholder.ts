/**
 * Placeholder for EXIF metadata parsing.
 * Real implementation will use expo-media-library + image EXIF readers.
 */

export type ExifLocation = {
  latitude: number;
  longitude: number;
  takenAt: string; // ISO
};

export type PhotoLike = {
  id: string;
  uri: string;
};

/**
 * Returns the EXIF location of a photo. MVP returns null for everything.
 */
export async function parseExifLocation(
  _photo: PhotoLike,
): Promise<ExifLocation | null> {
  return null;
}
