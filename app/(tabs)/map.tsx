import { useCallback, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
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
import { importPhotosAndMatchSigungu } from '@/utils/photoImporter';
import { colors, typography } from '@/constants/theme';

type MapMode = 'domestic' | 'overseas';

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const { travelStats, visitedSigungu, visitedProvinces } = useAppState();
  const [mode, setMode] = useState<MapMode>('domestic');
  const [visitedCodes, setVisitedCodes] = useState<string[]>([]);

  const handleToggle = useCallback((code: string) => {
    setVisitedCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  }, []);

  const handleImportPhotos = useCallback(async () => {
    try {
      const r = await importPhotosAndMatchSigungu();
      if (r.canceled) return;
      setVisitedCodes((prev) => Array.from(new Set([...prev, ...r.matchedCodes])));
      Alert.alert(
        '사진 분석 완료',
        r.totalSelected + '장 중 ' + r.withGps + '장에 위치 정보\n' + r.matchedCodes.length + '개 시·군 발견!'
      );
    } catch (e: any) {
      Alert.alert('오류', e.message ?? '사진 가져오기 실패');
    }
  }, []);

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

      {/* Photo import button */}
      {mode === 'domestic' && (
        <Pressable
          onPress={handleImportPhotos}
          style={{
            marginTop: 12,
            marginBottom: 12,
            padding: 14,
            backgroundColor: '#FB7185',
            borderRadius: 12,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 14 }}>
            📷 사진에서 가져오기
          </Text>
        </Pressable>
      )}
      {/* Map preview */}
      {mode === 'domestic' ? (
        <KoreaMapPreviewV2 visitedCodes={visitedCodes} onToggle={handleToggle} />
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
