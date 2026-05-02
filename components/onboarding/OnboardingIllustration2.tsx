import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadows } from '@/constants/theme';

const SIZE = 280;

type Dot = {
  top: number;
  left: number;
  size: number;
  color: string;
  opacity?: number;
};

// 추상화된 세계지도: 도트 패턴으로 대륙 윤곽을 그림
// 회색/연한 코랄 도트가 베이스, 컬러 도트가 방문 표시
const BASE_DOTS: Dot[] = [
  // North America
  ...spread([{ tx: 20, ty: 50, w: 60, h: 50, n: 14 }]),
  // South America
  ...spread([{ tx: 50, ty: 110, w: 30, h: 50, n: 8 }]),
  // Europe
  ...spread([{ tx: 100, ty: 50, w: 40, h: 30, n: 10 }]),
  // Africa
  ...spread([{ tx: 105, ty: 90, w: 50, h: 60, n: 12 }]),
  // Asia
  ...spread([{ tx: 150, ty: 50, w: 80, h: 60, n: 18 }]),
  // SE Asia / Oceania
  ...spread([{ tx: 175, ty: 130, w: 50, h: 35, n: 9 }]),
];

const VISIT_DOTS: Dot[] = [
  { top: 70, left: 50, size: 11, color: colors.primary }, // NYC
  { top: 60, left: 110, size: 11, color: colors.yellow }, // Paris
  { top: 65, left: 200, size: 11, color: colors.mint }, // Tokyo
  { top: 70, left: 215, size: 9, color: colors.pink }, // Seoul
  { top: 145, left: 200, size: 9, color: colors.primary }, // Sydney
];

const CONNECTING_PATH: Array<{ top: number; left: number }> = [
  { top: 70, left: 60 },
  { top: 65, left: 90 },
  { top: 62, left: 115 },
  { top: 60, left: 145 },
  { top: 60, left: 175 },
  { top: 62, left: 200 },
];

function spread(
  rects: Array<{ tx: number; ty: number; w: number; h: number; n: number }>,
): Dot[] {
  const out: Dot[] = [];
  for (const r of rects) {
    const cols = Math.ceil(Math.sqrt(r.n));
    const rows = Math.ceil(r.n / cols);
    let count = 0;
    for (let row = 0; row < rows && count < r.n; row++) {
      for (let col = 0; col < cols && count < r.n; col++) {
        const jitterX = (col % 2 === 0 ? 0 : 4);
        const jitterY = (row % 2 === 0 ? 0 : 3);
        out.push({
          top: r.ty + (r.h / Math.max(1, rows - 1)) * row + jitterY,
          left: r.tx + (r.w / Math.max(1, cols - 1)) * col + jitterX,
          size: 5,
          color: '#E5E7EB',
          opacity: 0.85,
        });
        count++;
      }
    }
  }
  return out;
}

export function OnboardingIllustration2() {
  return (
    <View
      style={{
        width: SIZE,
        height: SIZE,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: SIZE,
          height: SIZE,
          borderRadius: radius.xl,
          backgroundColor: '#FFFFFF',
          ...shadows.card,
        }}
      >
        {/* base dot map */}
        {BASE_DOTS.map((d, i) => (
          <View
            key={`base-${i}`}
            style={{
              position: 'absolute',
              top: d.top,
              left: d.left,
              width: d.size,
              height: d.size,
              borderRadius: d.size / 2,
              backgroundColor: d.color,
              opacity: d.opacity ?? 1,
            }}
          />
        ))}

        {/* dotted connecting path */}
        {CONNECTING_PATH.map((p, i) => (
          <View
            key={`path-${i}`}
            style={{
              position: 'absolute',
              top: p.top,
              left: p.left,
              width: 4,
              height: 4,
              borderRadius: 2,
              backgroundColor: colors.primary,
              opacity: 0.5,
            }}
          />
        ))}

        {/* visit highlight dots */}
        {VISIT_DOTS.map((d, i) => (
          <View
            key={`visit-${i}`}
            style={{
              position: 'absolute',
              top: d.top - d.size / 2,
              left: d.left - d.size / 2,
              width: d.size,
              height: d.size,
              borderRadius: d.size / 2,
              backgroundColor: d.color,
              borderWidth: 2,
              borderColor: '#FFFFFF',
              ...shadows.soft,
            }}
          />
        ))}

        <View style={{ position: 'absolute', top: 30, right: 30, opacity: 0.6 }}>
          <Ionicons name="sparkles" size={12} color={colors.yellow} />
        </View>
        <View style={{ position: 'absolute', bottom: 40, left: 40, opacity: 0.5 }}>
          <Ionicons name="sparkles" size={14} color={colors.primary} />
        </View>
      </View>
    </View>
  );
}
