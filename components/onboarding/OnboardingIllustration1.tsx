import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PinMark } from '@/components/brand/PinMark';
import { colors } from '@/constants/theme';

const SIZE = 280;

type Blob = {
  top: number;
  left: number;
  width: number;
  height: number;
  borderRadius: number;
  color: string;
  opacity: number;
};

// 시안 v3.5: 비정형 컬러 블롭 4개 + 점선 경로 + 핀 3개 + 작은 비행기
const BLOBS: Blob[] = [
  { top: 10, left: 10, width: 110, height: 90, borderRadius: 60, color: '#FECDD3', opacity: 0.6 },
  { top: 20, left: 170, width: 90, height: 70, borderRadius: 50, color: '#FEF3C7', opacity: 0.55 },
  { top: 160, left: 20, width: 100, height: 90, borderRadius: 55, color: '#A7F3D0', opacity: 0.5 },
  { top: 170, left: 170, width: 95, height: 80, borderRadius: 50, color: '#FCE7F3', opacity: 0.6 },
];

// Curved dotted path: bottom-left → top-left → top-right → bottom-right
const PATH_DOTS: Array<{ top: number; left: number }> = [
  { top: 200, left: 50 },
  { top: 170, left: 60 },
  { top: 140, left: 70 },
  { top: 110, left: 85 },
  { top: 90, left: 110 },
  { top: 80, left: 145 },
  { top: 80, left: 180 },
  { top: 95, left: 210 },
  { top: 130, left: 225 },
  { top: 170, left: 230 },
];

const PINS: Array<{ top: number; left: number; pin: string; drop: string }> = [
  { top: 60, left: 60, pin: colors.primary, drop: colors.mint },
  { top: 80, left: 180, pin: colors.yellow, drop: colors.primary },
  { top: 170, left: 200, pin: colors.mint, drop: colors.yellow },
];

export function OnboardingIllustration1() {
  return (
    <View
      style={{
        width: SIZE,
        height: SIZE,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {BLOBS.map((b, i) => (
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
            opacity: b.opacity,
          }}
        />
      ))}

      {PATH_DOTS.map((d, i) => (
        <View
          key={`dot-${i}`}
          style={{
            position: 'absolute',
            top: d.top,
            left: d.left,
            width: 5,
            height: 5,
            borderRadius: 3,
            backgroundColor: colors.primary,
            opacity: 0.45,
          }}
        />
      ))}

      {PINS.map((p, i) => (
        <View key={`pin-${i}`} style={{ position: 'absolute', top: p.top, left: p.left }}>
          <PinMark size={36} pinColor={p.pin} dropColor={p.drop} />
        </View>
      ))}

      <View style={{ position: 'absolute', top: 20, right: 20, opacity: 0.5 }}>
        <Ionicons name="airplane" size={26} color={colors.primary} />
      </View>

      <View style={{ position: 'absolute', top: 160, left: 130, opacity: 0.7 }}>
        <Ionicons name="sparkles" size={14} color={colors.yellow} />
      </View>
      <View style={{ position: 'absolute', bottom: 30, right: 50, opacity: 0.6 }}>
        <Ionicons name="sparkles" size={12} color={colors.primary} />
      </View>
    </View>
  );
}
