import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius, shadows } from '@/constants/theme';

const SIZE = 280;

type CardSpec = {
  rotate: string;
  translateX: number;
  translateY: number;
  from: string;
  to: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
};

const CARDS: CardSpec[] = [
  { rotate: '-10deg', translateX: -70, translateY: 10, from: '#FED7AA', to: '#FB7185', icon: 'leaf', iconColor: '#FFFFFF' },
  { rotate: '5deg', translateX: 0, translateY: -10, from: '#ECFDF5', to: '#34D399', icon: 'sunny', iconColor: '#FFFFFF' },
  { rotate: '12deg', translateX: 70, translateY: 20, from: '#FFFBEB', to: '#FCD34D', icon: 'camera', iconColor: '#FFFFFF' },
];

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
      {CARDS.map((c, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            width: 120,
            height: 140,
            borderRadius: radius.md,
            transform: [
              { translateX: c.translateX },
              { translateY: c.translateY },
              { rotate: c.rotate },
            ],
            ...shadows.card,
          }}
        >
          <LinearGradient
            colors={[c.from, c.to]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              flex: 1,
              borderRadius: radius.md,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 8,
              borderWidth: 4,
              borderColor: '#FFFFFF',
            }}
          >
            <Ionicons name={c.icon} size={36} color={c.iconColor} />
          </LinearGradient>
        </View>
      ))}

      {/* Sparkles */}
      <Sparkle x={30} y={40} size={14} />
      <Sparkle x={230} y={50} size={16} />
      <Sparkle x={20} y={210} size={12} />
      <Sparkle x={240} y={220} size={14} />
      <Sparkle x={140} y={20} size={10} />
    </View>
  );
}

function Sparkle({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <View style={{ position: 'absolute', left: x, top: y }}>
      <Ionicons name="sparkles" size={size} color={colors.yellow} />
    </View>
  );
}
