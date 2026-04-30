import type { Trip } from '@/types/travel';

export type TripFilter = 'all' | 'domestic' | 'overseas';

export type TripGroup = {
  key: string;
  label: string;
  trips: Trip[];
};

export function filterTrips(trips: Trip[], filter: TripFilter): Trip[] {
  if (filter === 'all') return trips;
  return trips.filter((t) => t.type === filter);
}

export function groupTripsByMonth(trips: Trip[]): TripGroup[] {
  const groups = new Map<string, TripGroup>();

  for (const trip of trips) {
    const d = new Date(trip.startDate);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const key = `${year}-${String(month).padStart(2, '0')}`;
    const label = `${year}년 ${month}월`;

    const existing = groups.get(key);
    if (existing) {
      existing.trips.push(trip);
    } else {
      groups.set(key, { key, label, trips: [trip] });
    }
  }

  return Array.from(groups.values()).sort((a, b) => (a.key < b.key ? 1 : -1));
}
