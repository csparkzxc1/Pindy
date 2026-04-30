import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadows, typography } from '@/constants/theme';
import { IconButton } from '@/components/ui/IconButton';

type Block = {
  top: number;
  left: number;
  width: number;
  height: number;
  borderRadius: number;
  color: string;
  rotate?: string;
};

const CONTINENT_BLOCKS: Block[] = [
  // North America
  { top: 30, left: 30, width: 110, height: 80, borderRadius: 24, color: colors.region[2] },
  // South America
  { top: 130, left: 80, width: 70, height: 100, borderRadius: 28, color: colors.regionEmpty },
  // Europe
  { top: 30, left: 165, width: 70, height: 60, borderRadius: 22, color: colors.region[0] },
  // Africa
  { top: 100, left: 165, width: 80, height: 110, borderRadius: 28, color: colors.regionEmpty },
  // Asia (large block)
  { top: 30, left: 240, width: 110, height: 95, borderRadius: 26, color: colors.region[1] },
  // SE Asia / Oceania
  { top: 165, left: 290, width: 70, height: 60, borderRadius: 22, color: colors.region[3] },
  // Korea (small accent in upper-right of Asia)
  { top: 50, left: 320, width: 22, height: 28, borderRadius: 10, color: colors.region[4] },
];

const PIN_DOTS: { top: number; left: number; color: string }[] = [
  { top: 60, left: 70, color: colors.region[2] },
  { top: 50, left: 195, color: colors.region[0] },
  { top: 65, left: 280, color: colors.region[1] },
  { top: 55, left: 326, color: colors.region[4] },
  { top: 185, left: 310, color: colors.region[3] },
];

export type WorldMapPreviewProps = {
  domesticVisited: number;
  domesticTotal: number;
  overseasVisited: number;
  overseasTotal: number;
  onLocate?: () => void;
};

export function WorldMapPreview({
  domesticVisited,
  domesticTotal,
  overseasVisited,
  overseasTotal,
  onLocate,
}: WorldMapPreviewProps) {
  return (
    <View
      style={{
        height: 400,
        borderRadius: radius['2xl'],
        backgroundColor: '#F1F5F9',
        overflow: 'hidden',
        ...shadows.card,
      }}
    >
      {/* Soft watercolor wash background */}
      <View
        style={{
          position: 'absolute',
          top: 30,
          left: 30,
          right: 30,
          bottom: 30,
          backgroundColor: '#E0F2FE',
          borderRadius: radius.xl,
          opacity: 0.4,
        }}
      />

      {CONTINENT_BLOCKS.map((b, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            top: b.top,
            left: b.left,
            width: b.width,
            height: b.height,
            borderRadius: b.borderRadius,
            backgroundColor: b.color,
            opacity: 0.85,
            transform: b.rotate ? [{ rotate: b.rotate }] : undefined,
          }}
        />
      ))}

      {PIN_DOTS.map((p, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            top: p.top,
            left: p.left,
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: '#FFFFFF',
            borderWidth: 2,
            borderColor: p.color,
            ...shadows.soft,
          }}
        />
      ))}

      {/* Domestic mini-card (top-left) */}
      <MiniCountCard
        top={16}
        left={16}
        accent={colors.primary}
        valueA={String(domesticVisited)}
        valueB={` / ${domesticTotal}`}
        label="방문한 시·군"
      />

      {/* Overseas mini-card (top-right) */}
      <MiniCountCard
        top={16}
        right={16}
        accent={colors.mintDark}
        valueA={String(overseasVisited)}
        valueB={` / ${overseasTotal.toLocaleString('ko-KR')}`}
        label="방문한 도·주"
      />

      {/* Locate button (bottom-left) */}
      <View style={{ position: 'absolute', bottom: 20, left: 16 }}>
        <IconButton icon="locate" size={36} color={colors.primary} shadow onPress={onLocate} />
      </View>

      {/* Decorative floating dot */}
      <View
        style={{
          position: 'absolute',
          bottom: 60,
          right: 30,
          alignItems: 'center',
        }}
      >
        <Ionicons name="airplane" size={20} color={colors.primary} style={{ opacity: 0.4 }} />
      </View>
    </View>
  );
}

type MiniProps = {
  top?: number;
  left?: number;
  right?: number;
  accent: string;
  valueA: string;
  valueB: string;
  label: string;
};

function MiniCountCard({ top, left, right, accent, valueA, valueB, label }: MiniProps) {
  return (
    <View
      style={{
        position: 'absolute',
        top,
        left,
        right,
        backgroundColor: '#FFFFFF',
        borderRadius: radius.lg,
        paddingVertical: 10,
        paddingHorizontal: 12,
        ...shadows.soft,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
        <Text style={{ ...typography.h1, color: accent }}>{valueA}</Text>
        <Text style={{ ...typography.caption, color: colors.muted }}>{valueB}</Text>
      </View>
      <Text style={{ ...typography.caption, color: colors.sub, marginTop: 2 }}>{label}</Text>
    </View>
  );
}
