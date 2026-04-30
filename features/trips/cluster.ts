/**
 * Time-based clustering of dated points (e.g. photos) into Trip-shaped buckets.
 *
 * MVP definition of "a trip":
 *   - At least one overnight: spans >= 2 distinct calendar days, OR
 *   - At least N photos within `gapHours` of each other (configurable)
 *
 * The algorithm is location-agnostic. The geo step (resolving lat/lng to a
 * region id) is handled separately in `features/map/geo.ts`.
 */

export type DatedPoint = {
  id: string;
  takenAt: string; // ISO
  latitude?: number;
  longitude?: number;
};

export type Cluster = {
  id: string;
  startDate: string;
  endDate: string;
  points: DatedPoint[];
};

export type ClusterOptions = {
  /** Two consecutive points further apart than this start a new cluster. */
  gapHours?: number;
  /** Drop clusters smaller than this. Defaults to 1 (keep everything). */
  minPoints?: number;
};

const DEFAULT_GAP_HOURS = 18;

/**
 * Group dated points into time clusters. Input does NOT need to be sorted.
 */
export function clusterByTime(
  points: DatedPoint[],
  options: ClusterOptions = {},
): Cluster[] {
  const gapHours = options.gapHours ?? DEFAULT_GAP_HOURS;
  const minPoints = options.minPoints ?? 1;

  if (points.length === 0) return [];

  const sorted = [...points].sort((a, b) => a.takenAt.localeCompare(b.takenAt));

  const clusters: Cluster[] = [];
  let bucket: DatedPoint[] = [sorted[0]!];

  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1]!;
    const curr = sorted[i]!;
    const diffH = hoursBetween(prev.takenAt, curr.takenAt);

    if (diffH > gapHours) {
      clusters.push(toCluster(bucket, clusters.length));
      bucket = [curr];
    } else {
      bucket.push(curr);
    }
  }
  clusters.push(toCluster(bucket, clusters.length));

  return clusters.filter((c) => c.points.length >= minPoints);
}

/**
 * Trip filter: keep clusters that span an overnight (>=2 calendar days).
 */
export function keepOvernightClusters(clusters: Cluster[]): Cluster[] {
  return clusters.filter((c) => calendarDaysBetween(c.startDate, c.endDate) >= 1);
}

function toCluster(points: DatedPoint[], index: number): Cluster {
  const first = points[0]!;
  const last = points[points.length - 1]!;
  return {
    id: `cluster-${index}-${first.id}`,
    startDate: first.takenAt,
    endDate: last.takenAt,
    points,
  };
}

function hoursBetween(a: string, b: string): number {
  const aMs = new Date(a).getTime();
  const bMs = new Date(b).getTime();
  if (Number.isNaN(aMs) || Number.isNaN(bMs)) return Number.POSITIVE_INFINITY;
  return Math.abs(bMs - aMs) / (1000 * 60 * 60);
}

function calendarDaysBetween(a: string, b: string): number {
  const da = new Date(a);
  const db = new Date(b);
  const aDay = Date.UTC(da.getUTCFullYear(), da.getUTCMonth(), da.getUTCDate());
  const bDay = Date.UTC(db.getUTCFullYear(), db.getUTCMonth(), db.getUTCDate());
  return Math.abs(Math.round((bDay - aDay) / (1000 * 60 * 60 * 24)));
}
