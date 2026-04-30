/**
 * Geometry helpers for matching photo coordinates to administrative polygons.
 *
 * MVP only ships these helpers. Real polygon data (GeoJSON for KOSIS sigungu
 * + Natural Earth admin1) will be loaded later — see `features/exif/README.md`.
 */

export type LngLat = { longitude: number; latitude: number };
export type Ring = LngLat[];
export type Polygon = { rings: Ring[]; bbox?: BBox };
export type BBox = { minLng: number; minLat: number; maxLng: number; maxLat: number };

export type RegionPolygon = {
  regionId: string;
  polygon: Polygon;
};

/**
 * Compute the axis-aligned bounding box of a polygon's outer ring.
 */
export function bboxOf(polygon: Polygon): BBox {
  const ring = polygon.rings[0] ?? [];
  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;
  for (const p of ring) {
    if (p.longitude < minLng) minLng = p.longitude;
    if (p.longitude > maxLng) maxLng = p.longitude;
    if (p.latitude < minLat) minLat = p.latitude;
    if (p.latitude > maxLat) maxLat = p.latitude;
  }
  return { minLng, minLat, maxLng, maxLat };
}

export function pointInBBox(p: LngLat, b: BBox): boolean {
  return (
    p.longitude >= b.minLng &&
    p.longitude <= b.maxLng &&
    p.latitude >= b.minLat &&
    p.latitude <= b.maxLat
  );
}

/**
 * Ray-casting point-in-polygon. Treats holes (rings beyond the first) by
 * XOR — even-odd fill. Suitable for typical admin polygons.
 */
export function pointInPolygon(point: LngLat, polygon: Polygon): boolean {
  let inside = false;
  for (const ring of polygon.rings) {
    if (pointInRing(point, ring)) inside = !inside;
  }
  return inside;
}

function pointInRing(point: LngLat, ring: Ring): boolean {
  let inside = false;
  const n = ring.length;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const a = ring[i]!;
    const b = ring[j]!;
    const intersect =
      a.latitude > point.latitude !== b.latitude > point.latitude &&
      point.longitude <
        ((b.longitude - a.longitude) * (point.latitude - a.latitude)) /
          (b.latitude - a.latitude) +
          a.longitude;
    if (intersect) inside = !inside;
  }
  return inside;
}

/**
 * Find the first region whose polygon contains the given point. Bounding-box
 * pre-filter cuts the heavy point-in-polygon test for misses.
 */
export function findRegionForPoint(
  point: LngLat,
  regions: RegionPolygon[],
): string | undefined {
  for (const r of regions) {
    const bb = r.polygon.bbox ?? bboxOf(r.polygon);
    if (!pointInBBox(point, bb)) continue;
    if (pointInPolygon(point, r.polygon)) return r.regionId;
  }
  return undefined;
}
