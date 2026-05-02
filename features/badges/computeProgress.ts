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

  // Photographer / Memory Keeper — count photos
  if (trip.photoCount > 0) {
    deltas.push({ id: 'photographer', delta: trip.photoCount });
    deltas.push({ id: 'memory-keeper', delta: trip.photoCount });
  }

  // Explorer — count overseas regions
  if (trip.type === 'overseas') {
    deltas.push({ id: 'explorer', delta: trip.regionIds.length });
    deltas.push({ id: 'country-hunter', delta: 1 });
  }

  // Korea Master — domestic sigungu count
  if (trip.type === 'domestic') {
    deltas.push({ id: 'korea-master', delta: trip.regionIds.length });
  }

  // Trip length deltas
  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  const days = Math.max(
    1,
    Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1,
  );

  if (days <= 2) {
    deltas.push({ id: 'quick-getaway', delta: 1 });
  } else if (days >= 7) {
    deltas.push({ id: 'long-trip', delta: 1 });
  }

  // Weekend traveler — short trip starting Friday/Saturday
  const startDow = start.getDay();
  if (days <= 3 && (startDow === 5 || startDow === 6)) {
    deltas.push({ id: 'weekend-traveler', delta: 1 });
  }

  // Season buckets (KR-friendly month groupings)
  const month = start.getMonth() + 1;
  if (month >= 3 && month <= 5) deltas.push({ id: 'spring-traveler', delta: 1 });
  else if (month >= 6 && month <= 8) deltas.push({ id: 'summer-traveler', delta: 1 });
  else if (month >= 9 && month <= 11) deltas.push({ id: 'autumn-traveler', delta: 1 });
  else deltas.push({ id: 'winter-traveler', delta: 1 });

  return deltas;
}
