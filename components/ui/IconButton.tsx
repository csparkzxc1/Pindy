import React from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows } from '@/constants/theme';

export type IconButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  size?: number;
  iconSize?: number;
  color?: string;
  backgroundColor?: string;
  shadow?: boolean;
};

export function IconButton({
  icon,
  onPress,
  size = 36,
  iconSize,
  color = colors.text,
  backgroundColor = colors.card,
  shadow = false,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: pressed ? 0.85 : 1,
        },
        shadow ? shadows.soft : null,
      ]}
    >
      <Ionicons name={icon} size={iconSize ?? Math.round(size * 0.55)} color={color} />
    </Pressable>
  );
}
