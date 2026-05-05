/**
 * Compute badge progress from raw Trip data.
 *
 * `computeAbsoluteProgress(trips, travelStyle)` is the single source of truth.
 * Returns absolute progress for every badge that can be derived from the
 * current data. Idempotent — running it again with the same input produces
 * the same result. AppContext calls it whenever trips change.
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

  // Collection
  out['city-collector'] = totalCities;
  out['country-hunter'] = overseasTripCount;
  out['korea-master'] = sigungu.size;
  out['explorer'] = countries.size;
  out['border-crosser'] = borderCount;

  // Photo
  out['photographer'] = totalPhotos;
  out['memory-keeper'] = totalPhotos;

  // Frequency
  out['long-trip'] = longCount;
  out['quick-getaway'] = quickCount;
  out['weekend-traveler'] = weekendCount;
  out['weekday-warrior'] = weekdayCount;
  out['monthly-traveler'] = monthSet.size;
  out['consecutive-month'] = longestMonthStreak(trips);
  out['spring-traveler'] = seasons[0] ?? 0;
  out['summer-traveler'] = seasons[1] ?? 0;
  out['autumn-traveler'] = seasons[2] ?? 0;
  out['winter-traveler'] = seasons[3] ?? 0;

  let fourSeasonRegions = 0;
  for (const set of regionSeasons.values()) {
    if (set.size === 4) fourSeasonRegions += 1;
  }
  out['four-seasons'] = fourSeasonRegions;

  // Special
  out['solo-explorer'] = soloCount;
  out['couple-getaway'] = coupleCount;
  out['first-trip'] = trips.length >= 1 ? 1 : 0;
  out['milestone-100'] = trips.length;
  if (travelStyle) {
    out['foodie'] = Math.round((travelStyle.미식 ?? 0) * 100);
  }

  return out;
}
