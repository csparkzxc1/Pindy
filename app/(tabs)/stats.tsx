import { Text, View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { StatCard } from '@/components/ui/StatCard';
import { ProgressSummaryCard } from '@/components/map/ProgressSummaryCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { RadarChart } from '@/components/stats/RadarChart';
import { IconButton } from '@/components/ui/IconButton';
import { useAppState } from '@/stores/AppContext';
import { colors, typography } from '@/constants/theme';
import { formatNumber } from '@/lib/format';

export default function StatsScreen() {
  const { travelStats, travelStyle } = useAppState();
  return (
    <Screen scroll>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 16,
          marginBottom: 16,
        }}
      >
        <Text style={{ ...typography.title, color: colors.text }}>
          나의 여행 통계
        </Text>
        <IconButton icon="share-outline" color={colors.text} backgroundColor="transparent" />
      </View>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <StatCard
          label="방문한 시·군"
          value={formatNumber(travelStats.visitedSigungu)}
          total={`/ ${formatNumber(travelStats.totalSigungu)}개`}
          accentColor={colors.primary}
          icon="business"
        />
        <StatCard
          label="방문한 도·주"
          value={formatNumber(travelStats.visitedProvinces)}
          total={`/ ${formatNumber(travelStats.totalProvinces)}개`}
          accentColor={colors.mintDark}
          icon="globe"
        />
      </View>

      <View style={{ marginTop: 16 }}>
        <ProgressSummaryCard stats={travelStats} variant="compact" />
      </View>

      <View style={{ marginTop: 16 }}>
        <SectionHeader title="여행 스타일" actionLabel="더보기" />
        <Card padding={20}>
          <RadarChart values={travelStyle} size={240} />
        </Card>
      </View>
    </Screen>
  );
}
