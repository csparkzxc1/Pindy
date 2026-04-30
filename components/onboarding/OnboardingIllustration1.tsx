import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows } from '@/constants/theme';

const SIZE = 280;

export function OnboardingIllustration1() {
  return (
    <View style={{ width: SIZE, height: SIZE, alignItems: 'center', justifyContent: 'center' }}>
      {/* Globe circle */}
      <View
        style={{
          width: 220,
          height: 220,
          borderRadius: 110,
          borderWidth: 2,
          borderColor: colors.primarySoft,
          borderStyle: 'dashed',
          backgroundColor: '#FFE4E6',
          opacity: 0.55,
        }}
      />
      {/* Inner globe shading */}
      <View
        style={{
          position: 'absolute',
          width: 200,
          height: 200,
          borderRadius: 100,
          backgroundColor: '#FFF1F2',
        }}
      />

      {/* Pin: coral (top-left) */}
      <View
        style={{ position: 'absolute', top: 50, left: 60, ...shadows.floating }}
      >
        <Ionicons name="location" size={36} color={colors.primary} />
      </View>
      {/* Pin: mint (right) */}
      <View
        style={{ position: 'absolute', top: 110, right: 50, ...shadows.soft }}
      >
        <Ionicons name="location" size={32} color={colors.mint} />
      </View>
      {/* Pin: yellow (bottom) */}
      <View style={{ position: 'absolute', bottom: 60, left: 110, ...shadows.soft }}>
        <Ionicons name="location" size={30} color={colors.yellow} />
      </View>

      {/* Airplane (top-right) */}
      <View style={{ position: 'absolute', top: 20, right: 20, opacity: 0.5 }}>
        <Ionicons name="airplane" size={28} color={colors.primary} />
      </View>

      {/* Dotted path */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            width: 5,
            height: 5,
            borderRadius: 3,
            backgroundColor: colors.primary,
            opacity: 0.4,
            top: 80 + i * 22,
            left: 150 - i * 10,
          }}
        />
      ))}

      {/* Splashes */}
      <View
        style={{
          position: 'absolute',
          top: 40,
          left: 30,
          width: 40,
          height: 28,
          borderRadius: 20,
          backgroundColor: colors.mintSoft,
          opacity: 0.7,
          transform: [{ rotate: '-15deg' }],
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 40,
          right: 35,
          width: 50,
          height: 30,
          borderRadius: 20,
          backgroundColor: colors.yellowSoft,
          opacity: 0.8,
          transform: [{ rotate: '12deg' }],
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 90,
          right: 20,
          width: 30,
          height: 22,
          borderRadius: 14,
          backgroundColor: colors.pinkSoft,
          opacity: 0.85,
        }}
      />

      {/* Sparkles */}
      <Sparkle x={30} y={120} size={14} />
      <Sparkle x={240} y={70} size={12} />
      <Sparkle x={210} y={210} size={10} />
    </View>
  );
}

function Sparkle({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
      }}
    >
      <Ionicons name="sparkles" size={size} color={colors.yellow} />
    </View>
  );
}
