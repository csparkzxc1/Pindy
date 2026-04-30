/**
 * End-to-end pipeline that turns photo assets into Trip-shaped clusters.
 *
 * 1. Parse EXIF (location + takenAt) for each photo.
 * 2. Time-cluster the photos with location.
 * 3. For each cluster, resolve a dominant region via point-in-polygon.
 * 4. Keep clusters that span an overnight.
 *
 * The geo polygons are passed in (empty in MVP). Once GeoJSON lands, supply
 * them here and the same code drives real region detection.
 */

import { parseExifBatch, type PhotoLike } from '@/features/exif/parseExif.placeholder';
import { clusterByTime, keepOvernightClusters, type Cluster } from './cluster';
import {
  findRegionForPoint,
  type LngLat,
  type RegionPolygon,
} from '@/features/map/geo';

export type DraftTrip = {
  clusterId: string;
  startDate: string;
  endDate: string;
  photoCount: number;
  regionIds: string[];
};

export async function buildDraftTripsFromPhotos(
  photos: PhotoLike[],
  regionPolygons: RegionPolygon[] = [],
): Promise<DraftTrip[]> {
  const exifs = await parseExifBatch(photos);

  const points = exifs.map(({ photo, exif }) => ({
    id: photo.id,
    takenAt: exif.takenAt,
    latitude: exif.latitude,
    longitude: exif.longitude,
  }));

  const allClusters = clusterByTime(points, { gapHours: 18 });
  const trips = keepOvernightClusters(allClusters);

  return trips.map((c) => ({
    clusterId: c.id,
    startDate: c.startDate,
    endDate: c.endDate,
    photoCount: c.points.length,
    regionIds: dominantRegions(c, regionPolygons),
  }));
}

function dominantRegions(cluster: Cluster, polygons: RegionPolygon[]): string[] {
  if (polygons.length === 0) return [];
  const counts = new Map<string, number>();
  for (const p of cluster.points) {
    if (p.latitude === undefined || p.longitude === undefined) continue;
    const point: LngLat = { latitude: p.latitude, longitude: p.longitude };
    const id = findRegionForPoint(point, polygons);
    if (!id) continue;
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id);
}
