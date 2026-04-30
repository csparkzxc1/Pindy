import { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { IconButton } from '@/components/ui/IconButton';
import { Pill } from '@/components/ui/Pill';
import { TripCard } from '@/components/timeline/TripCard';
import { useMockTrips } from '@/hooks/useMockTrips';
import { filterTrips, groupTripsByMonth, TripFilter } from '@/features/trips/tripUtils';
import { colors, typography } from '@/constants/theme';

const FILTERS: { key: TripFilter; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'domestic', label: '국내' },
  { key: 'overseas', label: '해외' },
];

export default function TimelineScreen() {
  const trips = useMockTrips();
  const [filter, setFilter] = useState<TripFilter>('all');

  const groups = useMemo(
    () => groupTripsByMonth(filterTrips(trips, filter)),
    [trips, filter],
  );

  return (
    <Screen scroll>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 16,
        }}
      >
        <Text style={{ ...typography.title, color: colors.text }}>타임라인</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <IconButton icon="search-outline" color={colors.text} backgroundColor="transparent" />
          <IconButton icon="funnel-outline" color={colors.text} backgroundColor="transparent" />
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
        {FILTERS.map((f) => (
          <Pill
            key={f.key}
            label={f.label}
            active={filter === f.key}
            variant="primary"
            onPress={() => setFilter(f.key)}
          />
        ))}
      </View>

      {groups.map((group) => (
        <View key={group.key}>
          <Text
            style={{
              ...typography.h2,
              color: colors.text,
              marginVertical: 16,
            }}
          >
            {group.label}
          </Text>
          <View style={{ gap: 16 }}>
            {group.trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onPress={() => router.push(`/trip/${trip.id}`)}
              />
            ))}
          </View>
        </View>
      ))}

      {groups.length === 0 ? (
        <View style={{ alignItems: 'center', paddingVertical: 64 }}>
          <Text style={{ ...typography.body, color: colors.sub }}>
            아직 기록된 여행이 없어요.
          </Text>
        </View>
      ) : null}
    </Screen>
  );
}
