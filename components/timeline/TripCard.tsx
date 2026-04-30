import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui/Card';
import { colors, radius, typography } from '@/constants/theme';
import type { Trip } from '@/types/travel';

export type TripCardProps = {
  trip: Trip;
  onPress?: () => void;
};

export function TripCard({ trip, onPress }: TripCardProps) {
  const visiblePhotos = trip.photos.slice(0, 4);
  const remaining = Math.max(0, trip.photoCount - visiblePhotos.length);

  return (
    <Pressable onPress={onPress}>
      <Card padding={16}>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {/* Date badge */}
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: radius.lg,
              backgroundColor: colors.primaryWash,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{ ...typography.label, color: colors.primary, fontWeight: '700' }}
            >
              {trip.monthLabel}
            </Text>
            <Text style={{ ...typography.h1, color: colors.primary }}>
              {trip.dateRangeLabel}
            </Text>
          </View>

          {/* Right column */}
          <View style={{ flex: 1 }}>
            <Text style={{ ...typography.h1, color: colors.text }}>{trip.title}</Text>
            <Text style={{ ...typography.caption, color: colors.sub, marginTop: 2 }}>
              {trip.location}
            </Text>

            {/* Photo strip */}
            <View style={{ flexDirection: 'row', gap: 6, marginTop: 12 }}>
              {visiblePhotos.map((p, i) => {
                const isLast = i === visiblePhotos.length - 1 && remaining > 0;
                return (
                  <View
                    key={p.id}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: radius.md,
                      overflow: 'hidden',
                    }}
                  >
                    <LinearGradient
                      colors={[p.from, p.to]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{ flex: 1 }}
                    />
                    {isLast ? (
                      <View
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: 'rgba(0,0,0,0.6)',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text style={{ ...typography.h2, color: '#FFFFFF' }}>
                          +{remaining}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                );
              })}
            </View>

            {/* Meta row */}
            <Text style={{ ...typography.caption, color: colors.sub, marginTop: 12 }}>
              🌍 {trip.regionIds.length}
              {trip.type === 'domestic' ? '개 시·군' : '개 도·주'}
              {' · 🏙 '}
              {trip.cityCount}개 도시
            </Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}
