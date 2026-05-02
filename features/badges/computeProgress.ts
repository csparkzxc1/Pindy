/**
 * Compute badge progress deltas from new trip events.
 *
 * Wire-up note: callers should invoke `updateBadgeProgress(id, delta)` from
 * `AppContext` for each entry returned. Real implementation will dispatch from
 * `addTrip` once trips originate from real EXIF data.
 */

import type { BadgeId } from '@/types/badge';
import type { Trip } from '@/types/travel';

export type BadgeDelta = {
  id: BadgeId;
  delta: number;
};

export function deltasFromTrip(trip: Trip): BadgeDelta[] {
  const deltas: BadgeDelta[] = [];

  // City Collector — count cities visited
  if (trip.cityCount > 0) {
    deltas.push({ id: 'city-collector', delta: trip.cityCount });
  }

  // Photographer — count photos
  if (trip.photoCount > 0) {
    deltas.push({ id: 'photographer', delta: trip.photoCount });
  }

  // Explorer — count overseas regions
  if (trip.type === 'overseas') {
    deltas.push({ id: 'explorer', delta: trip.regionIds.length });
  }

  // Weekend traveler — short overseas / domestic
  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  const days = Math.max(
    1,
    Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1,
  );
  if (days <= 3) {
    deltas.push({ id: 'weekend-traveler', delta: 1 });
  }

  return deltas;
}
