/**
 * Compute badge progress from raw Trip data.
 *
 * Two modes:
 *
 *  1. `computeAbsoluteProgress(trips, travelStyle)`
 *     The recommended source of truth. Returns absolute progress for every
 *     badge that can be derived from current data. Idempotent — running it
 *     again with the same input produces the same result. AppContext calls
 *     it whenever trips change.
 *
 *  2. `deltasFromTrip(trip)`  *(legacy / single-trip dispatch)*
 *     Returns deltas for a single newly-added trip. Useful when an add path
 *     wants to push a delta synchronously without a full recompute.
 */

import type { BadgeId } from '@/types/badge';
import type { Trip, TravelStyle } from '@/types/travel';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function tripDays(t: Trip): number {
  const start = new Date(t.startDate);
  const end = new Date(t.endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 1;
  return Math.max(
    1,
    Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1,
  );
}

function tripStartDow(t: Trip): number {
  return new Date(t.startDate).getDay(); // 0=Sun..6=Sat
}

type Season = 0 | 1 | 2 | 3; // spring / summer / autumn / winter

function tripSeason(t: Trip): Season {
  const m = new Date(t.startDate).getMonth() + 1;
  if (m >= 3 && m <= 5) return 0;
  if (m >= 6 && m <= 8) return 1;
  if (m >= 9 && m <= 11) return 2;
  return 3;
}

function countryFromRegionId(regionId: string): string | undefined {
  // Convention: ISO-style prefix — 'kr-...', 'fr-...', 'jp-...', 'es-...'.
  const m = regionId.match(/^([a-z]{2})-/);
  return m ? m[1] : undefined;
}

function tripCountrySet(t: Trip): Set<string> {
  const out = new Set<string>();
  for (const rid of t.regionIds) {
    const c = countryFromRegionId(rid);
    if (c) out.add(c);
  }
  return out;
}

function ymKey(t: Trip): string {
  const d = new Date(t.startDate);
  return `${d.getFullYear()}-${String(d.getMonth()).padStart(2, '0')}`;
}

function longestMonthStreak(trips: Trip[]): number {
  if (trips.length === 0) return 0;
  const months = new Set<string>();
  for (const t of trips) months.add(ymKey(t));
  const sorted = [...months].sort();
  let best = 1;
  let cur = 1;
  for (let i = 1; i < sorted.length; i++) {
    if (isNextMonth(sorted[i - 1]!, sorted[i]!)) {
      cur += 1;
      if (cur > best) best = cur;
    } else {
      cur = 1;
    }
  }
  return best;
}

function isNextMonth(a: string, b: string): boolean {
  const [ay, am] = a.split('-').map(Number) as [number, number];
  const [by, bm] = b.split('-').map(Number) as [number, number];
  if (ay === by && bm === am + 1) return true;
  if (by === ay + 1 && am === 11 && bm === 0) return true;
  return false;
}

// ---------------------------------------------------------------------------
// Absolute progress
// ---------------------------------------------------------------------------

export type BadgeProgressMap = Partial<Record<BadgeId, number>>;

export function computeAbsoluteProgress(
  trips: Trip[],
  travelStyle?: TravelStyle,
): BadgeProgressMap {
  const out: BadgeProgressMap = {};

  // Counts ------------------------------------------------------------------
  let totalPhotos = 0;
  let totalCities = 0;
  let longCount = 0;
  let quickCount = 0;
  let weekendCount = 0;
  let weekdayCount = 0;
  let soloCount = 0;
  let coupleCount = 0;
  let borderCount = 0;
  let overseasTripCount = 0;

  const countries = new Set<string>();
  const sigungu = new Set<string>();
  const seasons: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
  const monthSet = new Set<string>();
  const regionSeasons = new Map<string, Set<Season>>();

  for (const t of trips) {
    totalPhotos += t.photoCount;
    totalCities += t.cityCount;

    const days = tripDays(t);
    if (days >= 7) longCount += 1;
    if (days <= 2) quickCount += 1;

    const dow = tripStartDow(t);
    if (days <= 3 && (dow === 5 || dow === 6)) weekendCount += 1;
    if (dow >= 1 && dow <= 4) weekdayCount += 1;

    const m = (t.members ?? []).length;
    if (m === 1) soloCount += 1;
    else if (m === 2) coupleCount += 1;

    const season = tripSeason(t);
    seasons[season] = (seasons[season] ?? 0) + 1;
    monthSet.add(ymKey(t));

    if (t.type === 'overseas') {
      overseasTripCount += 1;
      const cs = tripCountrySet(t);
      for (const c of cs) countries.add(c);
      if (cs.size >= 2) borderCount += 1;
    } else if (t.type === 'domestic') {
      for (const rid of t.regionIds) sigungu.add(rid);
    }

    for (const rid of t.regionIds) {
      let set = regionSeasons.get(rid);
      if (!set) {
        set = new Set();
        regionSeasons.set(rid, set);
      }
      set.add(season);
    }
  }

  // Existing automated -----------------------------------------------------
  out['city-collector'] = totalCities;
  out['photographer'] = totalPhotos;
  out['memory-keeper'] = totalPhotos;
  out['country-hunter'] = overseasTripCount;
  out['korea-master'] = sigungu.size;
  out['long-trip'] = longCount;
  out['quick-getaway'] = quickCount;
  out['weekend-traveler'] = weekendCount;
  out['spring-traveler'] = seasons[0] ?? 0;
  out['summer-traveler'] = seasons[1] ?? 0;
  out['autumn-traveler'] = seasons[2] ?? 0;
  out['winter-traveler'] = seasons[3] ?? 0;

  // Newly automated (10) ---------------------------------------------------
  out['explorer'] = countries.size;
  out['border-crosser'] = borderCount;
  out['monthly-traveler'] = monthSet.size;
  out['weekday-warrior'] = weekdayCount;
  out['consecutive-month'] = longestMonthStreak(trips);

  let fourSeasonRegions = 0;
  for (const set of regionSeasons.values()) {
    if (set.size === 4) fourSeasonRegions += 1;
  }
  out['four-seasons'] = fourSeasonRegions;

  out['solo-explorer'] = soloCount;
  out['couple-getaway'] = coupleCount;
  out['first-trip'] = trips.length >= 1 ? 1 : 0;
  out['milestone-100'] = trips.length;

  // Foodie — TravelStyle 미식 점수 (0..1 → 0..100 scale)
  if (travelStyle) {
    out['foodie'] = Math.round((travelStyle.미식 ?? 0) * 100);
  }

  return out;
}

// ---------------------------------------------------------------------------
// Single-trip deltas (legacy)
// ---------------------------------------------------------------------------

export type BadgeDelta = {
  id: BadgeId;
  delta: number;
};

/**
 * @deprecated Prefer `computeAbsoluteProgress(trips)` — it handles streaks,
 * sets, and idempotency that single-trip deltas can't express. Kept for
 * callers that only have one trip and want a quick dispatch.
 */
export function deltasFromTrip(trip: Trip): BadgeDelta[] {
  const deltas: BadgeDelta[] = [];

  if (trip.cityCount > 0) {
    deltas.push({ id: 'city-collector', delta: trip.cityCount });
  }
  if (trip.photoCount > 0) {
    deltas.push({ id: 'photographer', delta: trip.photoCount });
    deltas.push({ id: 'memory-keeper', delta: trip.photoCount });
  }

  if (trip.type === 'overseas') {
    deltas.push({ id: 'country-hunter', delta: 1 });
    deltas.push({ id: 'explorer', delta: trip.regionIds.length });
  } else if (trip.type === 'domestic') {
    deltas.push({ id: 'korea-master', delta: trip.regionIds.length });
  }

  const days = tripDays(trip);
  if (days >= 7) deltas.push({ id: 'long-trip', delta: 1 });
  if (days <= 2) deltas.push({ id: 'quick-getaway', delta: 1 });

  const dow = tripStartDow(trip);
  if (days <= 3 && (dow === 5 || dow === 6)) {
    deltas.push({ id: 'weekend-traveler', delta: 1 });
  }
  if (dow >= 1 && dow <= 4) {
    deltas.push({ id: 'weekday-warrior', delta: 1 });
  }

  const season = tripSeason(trip);
  const seasonId: BadgeId =
    season === 0
      ? 'spring-traveler'
      : season === 1
        ? 'summer-traveler'
        : season === 2
          ? 'autumn-traveler'
          : 'winter-traveler';
  deltas.push({ id: seasonId, delta: 1 });

  const m = (trip.members ?? []).length;
  if (m === 1) deltas.push({ id: 'solo-explorer', delta: 1 });
  else if (m === 2) deltas.push({ id: 'couple-getaway', delta: 1 });

  return deltas;
}
