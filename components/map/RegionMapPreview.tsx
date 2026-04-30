import React from 'react';
import { Text, View } from 'react-native';
import { colors, radius, shadows, typography } from '@/constants/theme';

export type RegionMapPreviewProps = {
  type: 'domestic' | 'overseas';
  regionId: string;
  regionLabel: string;
  countryFlag?: string;
  height?: number;
};

type Block = {
  top: number;
  left: number;
  w: number;
  h: number;
  br: number;
  highlight?: boolean;
};

const KOREA_BLOCKS: Block[] = [
  { top: 30, left: 70, w: 60, h: 40, br: 16 },
  { top: 30, left: 135, w: 50, h: 35, br: 16 },
  { top: 35, left: 190, w: 60, h: 65, br: 18, highlight: true },
  { top: 75, left: 80, w: 75, h: 45, br: 18 },
  { top: 75, left: 160, w: 30, h: 30, br: 14 },
  { top: 125, left: 70, w: 55, h: 60, br: 20 },
  { top: 125, left: 130, w: 60, h: 60, br: 20 },
  { top: 125, left: 195, w: 50, h: 55, br: 20 },
  { top: 200, left: 90, w: 35, h: 18, br: 9 },
];

const COUNTRY_BLOCKS: Block[] = [
  { top: 30, left: 50, w: 70, h: 70, br: 24 },
  { top: 35, left: 130, w: 100, h: 90, br: 28, highlight: true },
  { top: 100, left: 60, w: 80, h: 55, br: 20 },
  { top: 100, left: 150, w: 90, h: 60, br: 22 },
  { top: 165, left: 100, w: 60, h: 50, br: 20 },
  { top: 165, left: 175, w: 70, h: 55, br: 22 },
];

export function RegionMapPreview({
  type,
  regionLabel,
  countryFlag,
  height = 280,
}: RegionMapPreviewProps) {
  const blocks = type === 'domestic' ? KOREA_BLOCKS : COUNTRY_BLOCKS;

  return (
    <View
      style={{
        height,
        borderRadius: radius.xl,
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
          borderRadius: radius.lg,
          opacity: 0.45,
        }}
      />
      {blocks.map((b, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            top: b.top,
            left: b.left,
            width: b.w,
            height: b.h,
            borderRadius: b.br,
            backgroundColor: b.highlight ? colors.primary : colors.regionEmpty,
            opacity: b.highlight ? 0.95 : 0.85,
            borderWidth: b.highlight ? 2 : 0,
            borderColor: '#FFFFFF',
          }}
        />
      ))}

      {/* Region label badge */}
      <View
        style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          backgroundColor: '#FFFFFF',
          borderRadius: radius.lg,
          paddingHorizontal: 14,
          paddingVertical: 10,
          ...shadows.soft,
        }}
      >
        {countryFlag ? (
          <Text style={{ fontSize: 22 }}>{countryFlag}</Text>
        ) : (
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: colors.primary,
            }}
          />
        )}
        <Text style={{ ...typography.bodyBold, color: colors.text }} numberOfLines={1}>
          {regionLabel}
        </Text>
      </View>
    </View>
  );
}
