import React from 'react';
import { View } from 'react-native';
import { colors, radius, shadows } from '@/constants/theme';

type SigunguBlock = {
  top: number;
  left: number;
  w: number;
  h: number;
  br: number;
  highlight?: boolean;
  color?: string;
};

// Stylized Korean peninsula made out of region blocks.
// Highlighted block represents the focused 시·군.
const BLOCKS: SigunguBlock[] = [
  // North area (Gyeonggi/Seoul band)
  { top: 30, left: 70, w: 60, h: 40, br: 16, color: '#E5E7EB' },
  { top: 30, left: 135, w: 50, h: 35, br: 16, color: '#E5E7EB' },

  // East coast (Gangwon)
  { top: 35, left: 190, w: 60, h: 65, br: 18, highlight: true },

  // Mid (Chungcheong)
  { top: 75, left: 80, w: 75, h: 45, br: 18, color: '#E5E7EB' },
  { top: 75, left: 160, w: 30, h: 30, br: 14, color: '#E5E7EB' },

  // South (Jeolla / Gyeongsang)
  { top: 125, left: 70, w: 55, h: 60, br: 20, color: '#E5E7EB' },
  { top: 125, left: 130, w: 60, h: 60, br: 20, color: '#E5E7EB' },
  { top: 125, left: 195, w: 50, h: 55, br: 20, color: '#E5E7EB' },

  // Jeju (small island bottom-left)
  { top: 200, left: 90, w: 35, h: 18, br: 9, color: '#E5E7EB' },
];

export type KoreaMapPreviewProps = {
  highlightedRegionId?: string;
  height?: number;
};

export function KoreaMapPreview({ height = 280 }: KoreaMapPreviewProps) {
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
      {/* watercolor wash */}
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
            backgroundColor: b.highlight ? colors.primary : (b.color ?? colors.regionEmpty),
            opacity: b.highlight ? 0.95 : 0.85,
            borderWidth: b.highlight ? 2 : 0,
            borderColor: '#FFFFFF',
          }}
        />
      ))}
    </View>
  );
}
