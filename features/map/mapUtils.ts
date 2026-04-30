import type { Region } from '@/types/travel';

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
 * Resolve which polygon a (lat, lng) point belongs to.
 * Placeholder — returns undefined until real GeoJSON polygons are wired in.
 */
export function resolveRegionId(
  _lat: number,
  _lng: number,
): string | undefined {
  return undefined;
}
