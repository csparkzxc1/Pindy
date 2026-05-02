import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  popularDestinations as initialPopular,
  trips as initialTrips,
  travelStats as initialStats,
  travelStyle as initialStyle,
  visitedProvinces as initialProvinces,
  visitedSigungu as initialSigungu,
} from '@/constants/mockData';
import { mockBadges } from '@/constants/mockBadges';
import type {
  PopularDestination,
  Region,
  TravelStats,
  TravelStyle,
  Trip,
} from '@/types/travel';
import type { Badge, BadgeId, BadgeLevel } from '@/types/badge';

type AppState = {
  trips: Trip[];
  visitedSigungu: Region[];
  visitedProvinces: Region[];
  popularDestinations: PopularDestination[];
  travelStats: TravelStats;
  travelStyle: TravelStyle;
  addTrip: (trip: Trip) => void;
  markRegionVisited: (regionId: string) => void;
  removeTrip: (tripId: string) => void;

  // v4 신규 — 기존 key 유지, 추가만
  badges: Badge[];
  unlockedBadgeCount: number;
  updateBadgeProgress: (id: BadgeId, delta: number) => void;
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [sigungu, setSigungu] = useState<Region[]>(initialSigungu);
  const [provinces, setProvinces] = useState<Region[]>(initialProvinces);
  const [badges, setBadges] = useState<Badge[]>(mockBadges);

  const addTrip = useCallback((trip: Trip) => {
    setTrips((prev) => [trip, ...prev]);
  }, []);

  const removeTrip = useCallback((tripId: string) => {
    setTrips((prev) => prev.filter((t) => t.id !== tripId));
  }, []);

  const markRegionVisited = useCallback((regionId: string) => {
    const update = (list: Region[]): Region[] =>
      list.map((r) =>
        r.id === regionId
          ? { ...r, visited: true, visitCount: (r.visitCount ?? 0) + 1 }
          : r,
      );
    setSigungu((prev) => update(prev));
    setProvinces((prev) => update(prev));
  }, []);

  const updateBadgeProgress = useCallback((id: BadgeId, delta: number) => {
    setBadges((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        const next = b.progress + delta;
        let nextLevel: BadgeLevel = 0;
        for (let i = 0; i < b.thresholds.length; i++) {
          const threshold = b.thresholds[i];
          if (threshold !== undefined && next >= threshold) {
            const lv = i + 1;
            nextLevel = (lv > 5 ? 5 : lv) as BadgeLevel;
          }
        }
        const upcoming =
          b.thresholds[nextLevel] ?? b.thresholds[b.thresholds.length - 1] ?? next;
        const wasLocked = b.level === 0 && nextLevel > 0;
        return {
          ...b,
          progress: next,
          level: nextLevel,
          nextThreshold: upcoming,
          unlockedAt:
            wasLocked && !b.unlockedAt
              ? new Date().toISOString().slice(0, 10)
              : b.unlockedAt,
        };
      }),
    );
  }, []);

  const travelStats = useMemo<TravelStats>(() => {
    const visitedSig = sigungu.filter((r) => r.visited).length;
    const visitedProv = provinces.filter((r) => r.visited).length;
    return {
      visitedSigungu: visitedSig,
      totalSigungu: initialStats.totalSigungu,
      visitedProvinces: visitedProv,
      totalProvinces: initialStats.totalProvinces,
      progress:
        (visitedSig + visitedProv) /
        (initialStats.totalSigungu + initialStats.totalProvinces),
    };
  }, [sigungu, provinces]);

  const unlockedBadgeCount = useMemo(
    () => badges.filter((b) => b.level > 0).length,
    [badges],
  );

  const value = useMemo<AppState>(
    () => ({
      trips,
      visitedSigungu: sigungu,
      visitedProvinces: provinces,
      popularDestinations: initialPopular,
      travelStats,
      travelStyle: initialStyle,
      addTrip,
      markRegionVisited,
      removeTrip,
      badges,
      unlockedBadgeCount,
      updateBadgeProgress,
    }),
    [
      trips,
      sigungu,
      provinces,
      travelStats,
      addTrip,
      markRegionVisited,
      removeTrip,
      badges,
      unlockedBadgeCount,
      updateBadgeProgress,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppState must be used inside <AppProvider>');
  }
  return ctx;
}
