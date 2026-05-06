import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Wordmark } from '@/components/brand/Wordmark';
import { PinMark } from '@/components/brand/PinMark';
import { WorldMapPreview } from '@/components/map/WorldMapPreview';
import { KoreaMapPreviewV2 } from '@/components/map/KoreaMapPreviewV2';
import { ProgressSummaryCard } from '@/components/map/ProgressSummaryCard';
import { SegmentControl } from '@/components/ui/SegmentControl';
import { IconButton } from '@/components/ui/IconButton';
import { useAppState } from '@/stores/AppContext';
import { colors, typography } from '@/constants/theme';

type MapMode = 'domestic' | 'overseas';

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const { travelStats, visitedSigungu, visitedProvinces } = useAppState();
  const [mode, setMode] = useState<MapMode>('domestic');

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
            ?ы뻾? ?됱쑝濡? 異붿뼲? 吏???꾩뿉.
          </Text>
        </View>
        <IconButton
          icon="notifications-outline"
          color={colors.text}
          backgroundColor="transparent"
        />
      </View>

      {/* Segment toggle */}
      <View style={{ marginVertical: 16 }}>
        <SegmentControl
          options={[
            { key: 'domestic', label: '?눖?눟 援?궡 쨌 ?쑣룰뎔' },
            { key: 'overseas', label: '?뙇 ?댁쇅 쨌 ?꽷룹＜' },
          ]}
          value={mode}
          onChange={setMode}
          accent={mode === 'domestic' ? 'primary' : 'mint'}
        />
      </View>

      {/* Map preview */}
      {mode === 'domestic' ? (
        <KoreaMapPreviewV2 visitedCodes={[]} />
      ) : (
        <WorldMapPreview
          visited={travelStats.visitedProvinces}
          total={travelStats.totalProvinces}
          onLocate={goToFirstOverseas}
        />
      )}

      {/* Progress summary */}
      <View style={{ marginTop: 16 }}>
        <ProgressSummaryCard stats={travelStats} mode={mode} />
      </View>

      <View style={{ height: 8 }} />
    </ScrollView>
  );
}
