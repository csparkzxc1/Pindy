import { useMemo, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import type ViewShot from 'react-native-view-shot';
import { ShareableCard } from '@/components/share/ShareableCard';
import { StoryCanvas } from '@/components/story/StoryCanvas';
import { StoryToolbar, type ToolbarTabKey } from '@/components/story/StoryToolbar';
import { IconButton } from '@/components/ui/IconButton';
import { useMockTrip } from '@/hooks/useMockTrips';
import { getStoryTemplateById } from '@/constants/mockStoryTemplates';
import { captureAndShare, SharingUnavailableError } from '@/features/share/captureView';
import { colors, radius, shadows, typography } from '@/constants/theme';
import type { PhotoPlaceholder } from '@/types/travel';

export default function StoryEditorScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ template?: string; trip?: string }>();
  const template = params.template ? getStoryTemplateById(params.template) : undefined;
  const trip = useMockTrip(params.trip);

  const shotRef = useRef<ViewShot>(null);
  const [activeTool, setActiveTool] = useState<ToolbarTabKey>('layout');

  // 캔버스 크기: 화면 너비 - 좌우 padding 40, 9:16 비율
  const W = Dimensions.get('window').width - 40;
  const H = Math.min(Dimensions.get('window').height - 280, (W * 16) / 9);

  // 사진 슬롯 채우기 — trip의 photos에서 순서대로
  const initialPhotos = useMemo<(PhotoPlaceholder | undefined)[]>(() => {
    if (!template || !trip) return [];
    return template.layout.photoSlots.map(
      (_, i) => trip.photos[i % Math.max(1, trip.photos.length)],
    );
  }, [template, trip]);
  const [photos, setPhotos] = useState<(PhotoPlaceholder | undefined)[]>(initialPhotos);

  const initialTexts = useMemo<string[]>(() => {
    if (!template) return [];
    return template.layout.textSlots.map((_, i) => {
      if (!trip) return '';
      if (i === 0) return trip.title;
      if (i === 1) return trip.fullDateLabel;
      return '';
    });
  }, [template, trip]);
  const [texts, setTexts] = useState<string[]>(initialTexts);

  const [watermark, setWatermark] = useState(true);

  if (!template || !trip) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bg,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}
      >
        <Text style={{ ...typography.body, color: colors.sub, textAlign: 'center' }}>
          템플릿 또는 여행 정보를 찾을 수 없어요.
        </Text>
      </View>
    );
  }

  const cyclePhoto = (slotIndex: number) => {
    setPhotos((prev) => {
      const next = [...prev];
      const current = next[slotIndex];
      const idx = current
        ? trip.photos.findIndex((p) => p.id === current.id)
        : -1;
      const nextIdx = (idx + 1) % trip.photos.length;
      next[slotIndex] = trip.photos[nextIdx];
      return next;
    });
  };

  const updateText = (slotIndex: number, value: string) => {
    setTexts((prev) => {
      const next = [...prev];
      next[slotIndex] = value;
      return next;
    });
  };

  const handleCaptureShare = async () => {
    try {
      await captureAndShare(shotRef);
    } catch (err) {
      if (err instanceof SharingUnavailableError) {
        Alert.alert('공유 불가', '이 기기에서는 공유가 지원되지 않아요.');
      } else {
        Alert.alert('공유 실패', '잠시 후 다시 시도해주세요.');
      }
    }
  };

  const renderToolPanel = () => {
    if (activeTool === 'layout') {
      return (
        <View style={{ paddingHorizontal: 20, paddingVertical: 16, gap: 8 }}>
          <Text style={{ ...typography.caption, color: colors.sub }}>
            사진 슬롯을 누르면 다음 사진으로 바뀌어요.
          </Text>
          <Pressable
            onPress={() => setWatermark((v) => !v)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 10,
              paddingHorizontal: 12,
              backgroundColor: colors.bgAlt,
              borderRadius: radius.md,
            }}
          >
            <Text style={{ ...typography.body, color: colors.text }}>
              Pindy 워터마크
            </Text>
            <View
              style={{
                width: 36,
                height: 22,
                borderRadius: 11,
                backgroundColor: watermark ? colors.primary : colors.line,
                paddingHorizontal: 2,
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  backgroundColor: '#FFFFFF',
                  alignSelf: watermark ? 'flex-end' : 'flex-start',
                }}
              />
            </View>
          </Pressable>
        </View>
      );
    }
    return (
      <View style={{ paddingHorizontal: 20, paddingVertical: 24, alignItems: 'center' }}>
        <Text style={{ ...typography.body, color: colors.sub }}>곧 만나요 ✨</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1F2937' }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 16 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: insets.top + 8,
            paddingHorizontal: 16,
            paddingBottom: 8,
          }}
        >
          <IconButton
            icon="close"
            size={36}
            color={colors.text}
            backgroundColor="#FFFFFF"
            shadow
            onPress={() => router.back()}
          />
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <IconButton
              icon="arrow-undo"
              size={36}
              color={colors.text}
              backgroundColor="#FFFFFF"
              shadow
            />
            <IconButton
              icon="arrow-redo"
              size={36}
              color={colors.text}
              backgroundColor="#FFFFFF"
              shadow
            />
          </View>
          <IconButton
            icon="arrow-down-circle"
            size={40}
            color={colors.primary}
            backgroundColor="#FFFFFF"
            shadow
            onPress={handleCaptureShare}
          />
        </View>

        {/* Canvas */}
        <View style={{ alignItems: 'center', paddingVertical: 16 }}>
          <ShareableCard
            ref={shotRef}
            style={{ borderRadius: radius.lg, ...shadows.card }}
          >
            <StoryCanvas
              template={template}
              width={W}
              height={H}
              photos={photos}
              texts={texts}
              watermark={watermark}
              onPickPhoto={cyclePhoto}
              onChangeText={updateText}
            />
          </ShareableCard>
        </View>
      </ScrollView>

      {/* Tool panel */}
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: radius.xl,
          borderTopRightRadius: radius.xl,
          paddingBottom: insets.bottom,
        }}
      >
        {renderToolPanel()}
        <StoryToolbar active={activeTool} onChange={setActiveTool} />
      </View>
    </View>
  );
}
