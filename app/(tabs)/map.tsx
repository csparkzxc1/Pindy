import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Wordmark } from '@/components/brand/Wordmark';
import { WorldMapPreview } from '@/components/map/WorldMapPreview';
import { ProgressSummaryCard } from '@/components/map/ProgressSummaryCard';
import { IconButton } from '@/components/ui/IconButton';
import { travelStats } from '@/constants/mockData';
import { colors, typography } from '@/constants/theme';

export default function MapScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: insets.top + 16,
        paddingBottom: 32,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <View style={{ flex: 1 }}>
          <Wordmark size={28} />
          <Text style={{ ...typography.body, color: colors.sub, marginTop: 4 }}>
            여행은 색으로, 추억은 지도 위에.
          </Text>
        </View>
        <IconButton
          icon="notifications-outline"
          color={colors.text}
          backgroundColor="transparent"
        />
      </View>

      {/* World map */}
      <WorldMapPreview
        domesticVisited={travelStats.visitedSigungu}
        domesticTotal={travelStats.totalSigungu}
        overseasVisited={travelStats.visitedProvinces}
        overseasTotal={travelStats.totalProvinces}
      />

      {/* Progress summary */}
      <View style={{ marginTop: 16 }}>
        <ProgressSummaryCard stats={travelStats} />
      </View>

      <View style={{ height: 8 }} />
    </ScrollView>
  );
}
