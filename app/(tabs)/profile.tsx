import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProfileStatsRow } from '@/components/profile/ProfileStatsRow';
import { ProfilePhotoGrid } from '@/components/profile/PhotoGrid';
import { BadgeCard } from '@/components/badges/BadgeCard';
import { useAppState } from '@/stores/AppContext';
import { colors, typography } from '@/constants/theme';
import { formatNumber } from '@/lib/format';

export default function ProfileScreen() {
  const { trips, travelStats, badges, unlockedBadgeCount } = useAppState();

  // 모든 trip의 사진을 평탄화 (mock — 실제로는 EXIF에서 들어옴)
  const allPhotos = trips.flatMap((t) => t.photos);

  // 통계 4컬럼: 시·군 + 도·주 + 일수 + 배지
  const totalDays = trips.reduce((acc, t) => {
    const start = new Date(t.startDate);
    const end = new Date(t.endDate);
    return (
      acc +
      Math.max(
        1,
        Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1,
      )
    );
  }, 0);

  const stats = [
    { key: 'sigungu', value: formatNumber(travelStats.visitedSigungu), label: '시·군' },
    { key: 'province', value: formatNumber(travelStats.visitedProvinces), label: '도·주' },
    { key: 'days', value: formatNumber(totalDays), label: '여행 일' },
    { key: 'badge', value: formatNumber(unlockedBadgeCount), label: '배지' },
  ];

  const previewBadges = badges.filter((b) => b.level > 0).slice(0, 3);

  return (
    <Screen scroll>
      {/* 상단 헤더 */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 12,
          marginBottom: 16,
        }}
      >
        <Text style={{ ...typography.h1, color: colors.text }}>프로필</Text>
        <Pressable
          hitSlop={10}
          onPress={() => router.push('/profile/settings')}
        >
          <Ionicons name="settings-outline" size={24} color={colors.text} />
        </Pressable>
      </View>

      {/* 프로필 카드 */}
      <Card padding={20}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: colors.primaryWash,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: '700', color: colors.primary }}>
              여
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ ...typography.h1, color: colors.text }}>여행자 Pindy</Text>
            <Text style={{ ...typography.caption, color: colors.sub, marginTop: 2 }}>
              @pindy_travel
            </Text>
          </View>
        </View>

        <Text
          style={{
            ...typography.body,
            color: colors.text,
            marginTop: 12,
            lineHeight: 20,
          }}
        >
          기록하고, 공유하고, 발견해요.{'\n'}여행의 삶을 컬러로 물들이는 중.
        </Text>

        <View style={{ marginTop: 16 }}>
          <Button title="프로필 편집" variant="secondary" size="md" fullWidth />
        </View>
      </Card>

      {/* 통계 row */}
      <Card padding={16} style={{ marginTop: 16 }}>
        <ProfileStatsRow items={stats} />
      </Card>

      {/* 배지 미리보기 */}
      <View style={{ marginTop: 24 }}>
        <SectionHeader
          title="나의 배지"
          actionLabel="모두 보기"
          onAction={() => router.push('/badges')}
        />
        {previewBadges.length === 0 ? (
          <Text style={{ ...typography.caption, color: colors.sub }}>
            아직 잠금 해제된 배지가 없어요.
          </Text>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
              justifyContent: 'flex-start',
            }}
          >
            {previewBadges.map((b) => (
              <BadgeCard
                key={b.id}
                badge={b}
                size="md"
                onPress={() => router.push('/badges')}
              />
            ))}
          </View>
        )}
      </View>

      {/* 사진 그리드 */}
      <View style={{ marginTop: 24 }}>
        <SectionHeader title="여행 사진" actionLabel="더보기" />
        <ProfilePhotoGrid photos={allPhotos} cells={9} />
      </View>
    </Screen>
  );
}
