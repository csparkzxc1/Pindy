import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadows, typography } from '@/constants/theme';
import { IconButton } from '@/components/ui/IconButton';

type Block = {
  top: number;
  left: number;
  w: number;
  h: number;
  br: number;
};

const BLOCKS: Block[] = [
  { top: 50, left: 80, w: 60, h: 40, br: 16 },
  { top: 50, left: 145, w: 50, h: 35, br: 16 },
  { top: 55, left: 200, w: 60, h: 65, br: 18 },
  { top: 95, left: 90, w: 75, h: 45, br: 18 },
  { top: 95, left: 170, w: 30, h: 30, br: 14 },
  { top: 145, left: 80, w: 55, h: 60, br: 20 },
  { top: 145, left: 140, w: 60, h: 60, br: 20 },
  { top: 145, left: 205, w: 50, h: 55, br: 20 },
  { top: 220, left: 100, w: 35, h: 18, br: 9 },
];

export type KoreaMapPreviewProps = {
  visited: number;
  total: number;
  onLocate?: () => void;
  accentColor?: string;
};

export function KoreaMapPreview({
  visited,
  total,
  onLocate,
  accentColor = colors.primary,
}: KoreaMapPreviewProps) {
  return (
    <View
      style={{
        height: 340,
        borderRadius: radius['2xl'],
        backgroundColor: '#F1F5F9',
        overflow: 'hidden',
        ...shadows.card,
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: 20,
          left: 30,
          right: 30,
          bottom: 20,
          backgroundColor: '#E0F2FE',
          borderRadius: radius.xl,
          opacity: 0.45,
        }}
      />

      {BLOCKS.map((b, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            top: b.top,
            left: b.left,
            width: b.w,
            height: b.h,
            borderRadius: b.br,
            backgroundColor: i < 3 ? accentColor : colors.regionEmpty,
            opacity: i < 3 ? 0.85 : 0.75,
          }}
        />
      ))}

      {/* Mini count card (top-left) */}
      <View
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          backgroundColor: '#FFFFFF',
          borderRadius: radius.lg,
          paddingVertical: 10,
          paddingHorizontal: 12,
          ...shadows.soft,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
          <Text style={{ ...typography.h1, color: accentColor }}>{visited}</Text>
          <Text style={{ ...typography.caption, color: colors.muted }}> / {total}</Text>
        </View>
        <Text style={{ ...typography.caption, color: colors.sub, marginTop: 2 }}>
          방문한 시·군
        </Text>
      </View>

      {/* Locate button */}
      <View style={{ position: 'absolute', bottom: 20, left: 16 }}>
        <IconButton icon="locate" size={36} color={accentColor} shadow onPress={onLocate} />
      </View>

      <View style={{ position: 'absolute', bottom: 60, right: 30, alignItems: 'center' }}>
        <Ionicons name="map-outline" size={20} color={accentColor} style={{ opacity: 0.4 }} />
      </View>
    </View>
  );
}
