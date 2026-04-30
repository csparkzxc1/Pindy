import { useAppState } from '@/stores/AppContext';
import type { Trip } from '@/types/travel';

/** @deprecated use `useTrips()` */
export function useMockTrips(): Trip[] {
  return useAppState().trips;
}

/** @deprecated use `useTrip(id)` */
export function useMockTrip(id: string | undefined): Trip | undefined {
  const { trips } = useAppState();
  if (!id) return undefined;
  return trips.find((t) => t.id === id);
}

export function useTrips(): Trip[] {
  return useAppState().trips;
}

export function useTrip(id: string | undefined): Trip | undefined {
  const { trips } = useAppState();
  if (!id) return undefined;
  return trips.find((t) => t.id === id);
}
