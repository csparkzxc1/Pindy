import type { Region } from '@/types/travel';
import { findRegionForPoint, type LngLat, type RegionPolygon } from './geo';

/**
 * Map a list of regions to a list of polygon ids → fill colors.
 * In MVP this is a no-op; the real implementation will accept GeoJSON polygons.
 */
export function regionsToFillMap(regions: Region[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const r of regions) {
    if (r.color) out[r.id] = r.color;
  }
  return out;
}

/**
 * Resolve which polygon a (lat, lng) point belongs to. Returns the region id
 * if the point lies inside one of the supplied polygons.
 *
 * Polygons are not bundled in MVP — pass an empty array and you get
 * `undefined`. Once GeoJSON ships, hand them in here.
 */
export function resolveRegionId(
  lat: number,
  lng: number,
  polygons: RegionPolygon[] = [],
): string | undefined {
  const p: LngLat = { latitude: lat, longitude: lng };
  return findRegionForPoint(p, polygons);
}
