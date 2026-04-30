import { trips } from '@/constants/mockData';
import type { Trip } from '@/types/travel';

export function useMockTrips(): Trip[] {
  return trips;
}

export function useMockTrip(id: string | undefined): Trip | undefined {
  if (!id) return undefined;
  return trips.find((t) => t.id === id);
}
