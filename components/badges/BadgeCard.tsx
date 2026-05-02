import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows, typography } from '@/constants/theme';
import type { Badge } from '@/types/badge';

export type BadgeCardSize = 'sm' | 'md' | 'lg';

export type BadgeCardProps = {
  badge: Badge;
  size?: BadgeCardSize;
  onPress?: () => void;
};

const SIZES: Record<BadgeCardSize, { circle: number; icon: number; gap: number }> = {
  sm: { circle: 56, icon: 22, gap: 8 },
  md: { circle: 80, icon: 32, gap: 10 },
  lg: { circle: 96, icon: 40, gap: 12 },
};

export function BadgeCard({ badge, size = 'md', onPress }: BadgeCardProps) {
  const dim = SIZES[size];
  const locked = badge.level === 0;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        alignItems: 'center',
        opacity: pressed ? 0.85 : 1,
        width: dim.circle + 24,
      })}
    >
      <View
        style={{
          width: dim.circle,
          height: dim.circle,
          borderRadius: dim.circle / 2,
          backgroundColor: locked ? colors.lineSoft : badge.color,
          alignItems: 'center',
          justifyContent: 'center',
          ...(!locked ? shadows.soft : null),
        }}
      >
        <View
          style={{
            width: dim.circle - 12,
            height: dim.circle - 12,
            borderRadius: (dim.circle - 12) / 2,
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {locked ? (
            <Ionicons name="lock-closed" size={dim.icon - 4} color={colors.muted} />
          ) : (
            <Text style={{ fontSize: dim.icon }}>{badge.icon}</Text>
          )}
        </View>
        {!locked ? (
          <View
            style={{
              position: 'absolute',
              bottom: -4,
              right: -2,
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderWidth: 1.5,
              borderColor: badge.color,
            }}
          >
            <Text style={{ fontSize: 10, fontWeight: '700', color: badge.color }}>
              Lv.{badge.level}
            </Text>
          </View>
        ) : null}
      </View>

      <Text
        style={{
          ...typography.caption,
          color: locked ? colors.muted : colors.text,
          fontWeight: '700',
          marginTop: dim.gap,
          textAlign: 'center',
        }}
        numberOfLines={1}
      >
        {badge.nameKo}
      </Text>
    </Pressable>
  );
}
