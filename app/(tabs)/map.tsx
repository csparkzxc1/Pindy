import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Wordmark } from '@/components/brand/Wordmark';
import { PinMark } from '@/components/brand/PinMark';
import { WorldMapPreview } from '@/components/map/WorldMapPreview';
import { ProgressSummaryCard } from '@/components/map/ProgressSummaryCard';
import { IconButton } from '@/components/ui/IconButton';
import { travelStats, visitedSigungu, visitedProvinces } from '@/constants/mockData';
import { colors, typography } from '@/constants/theme';

export default function MapScreen() {
  const insets = useSafeAreaInsets();

  const goToFirstDomestic = () => {
    const first = visitedSigungu[0];
    if (first) router.push(`/region/${first.id}`);
  };
  const goToFirstOverseas = () => {
    const first = visitedProvinces[0];
    if (first) router.push(`/region/${first.id}`);
  };

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
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <PinMark size={28} />
            <Wordmark size={28} showHeart={false} />
          </View>
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
        onPressDomestic={goToFirstDomestic}
        onPressOverseas={goToFirstOverseas}
      />

      {/* Progress summary */}
      <View style={{ marginTop: 16 }}>
        <ProgressSummaryCard stats={travelStats} />
      </View>

      <View style={{ height: 8 }} />
    </ScrollView>
  );
}
