import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { IconButton } from '@/components/ui/IconButton';
import { Pill } from '@/components/ui/Pill';
import { Button } from '@/components/ui/Button';
import { PhotoGrid } from '@/components/trip/PhotoGrid';
import { useMockTrip } from '@/hooks/useMockTrips';
import { colors, radius, shadows, typography } from '@/constants/theme';

const TABS = ['여행지', '사진', '메모'] as const;
type TripTab = (typeof TABS)[number];

export default function TripDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const trip = useMockTrip(id);
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TripTab>('사진');

  if (!trip) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bg,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ ...typography.body, color: colors.sub }}>
          여행을 찾을 수 없어요.
        </Text>
        <View style={{ height: 16 }} />
        <Button title="돌아가기" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={{ height: 360 }}>
          <LinearGradient
            colors={[trip.coverColor, trip.coverColorDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />
          {/* Bottom darken overlay */}
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']}
            style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 200 }}
          />

          {/* Top action row */}
          <View
            style={{
              position: 'absolute',
              top: insets.top + 12,
              left: 20,
              right: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <IconButton
              icon="chevron-back"
              size={36}
              color={colors.text}
              backgroundColor="#FFFFFF"
              shadow
              onPress={() => router.back()}
            />
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <IconButton
                icon="share-outline"
                size={36}
                color={colors.text}
                backgroundColor="#FFFFFF"
                shadow
              />
              <IconButton
                icon="ellipsis-horizontal"
                size={36}
                color={colors.text}
                backgroundColor="#FFFFFF"
                shadow
              />
            </View>
          </View>

          {/* Bottom title */}
          <View
            style={{
              position: 'absolute',
              bottom: 24,
              left: 20,
              right: 20,
            }}
          >
            <Text style={{ ...typography.display, color: '#FFFFFF' }}>
              {trip.title}
            </Text>
            <Text
              style={{
                ...typography.body,
                color: '#FFFFFF',
                opacity: 0.9,
                marginTop: 2,
              }}
            >
              {trip.fullDateLabel}
            </Text>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
              <Pill
                label={`${trip.regionIds.length}개 ${trip.type === 'domestic' ? '시·군' : '도·주'}`}
                variant="translucent"
              />
              <Pill label={`${trip.cityCount}개 도시`} variant="translucent" />
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: radius.xl,
            borderTopRightRadius: radius.xl,
            marginTop: -24,
            paddingTop: 20,
            paddingHorizontal: 20,
            paddingBottom: 20,
            ...shadows.card,
          }}
        >
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {TABS.map((t) => (
              <Pill
                key={t}
                label={t}
                active={activeTab === t}
                variant="primary"
                onPress={() => setActiveTab(t)}
              />
            ))}
          </View>
        </View>

        {/* Content */}
        <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
          {activeTab === '사진' ? (
            <PhotoGrid
              photos={trip.photos}
              totalCount={trip.photoCount}
              paddingHorizontal={20}
            />
          ) : null}
          {activeTab === '여행지' ? (
            <View style={{ gap: 12 }}>
              <Text style={{ ...typography.h2, color: colors.text }}>
                {trip.type === 'domestic' ? '방문한 시·군' : '방문한 도·주'}
              </Text>
              {trip.regionIds.map((rid) => (
                <Pressable
                  key={rid}
                  onPress={() => router.push(`/region/${rid}`)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: 16,
                    borderRadius: radius.lg,
                    ...shadows.soft,
                  }}
                >
                  <Text style={{ ...typography.body, color: colors.text }}>
                    {rid}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : null}
          {activeTab === '메모' ? (
            <View style={{ paddingVertical: 32, alignItems: 'center' }}>
              <Text style={{ ...typography.body, color: colors.sub }}>
                아직 작성한 메모가 없어요.
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: insets.bottom + 16,
          backgroundColor: colors.bg,
          borderTopWidth: 1,
          borderTopColor: colors.lineSoft,
        }}
      >
        <Button title="콜라주 만들기" variant="primary" size="lg" fullWidth />
      </View>
    </View>
  );
}
