import React from 'react';
import { View } from 'react-native';
import { colors } from '@/constants/theme';

export type ProgressBarProps = {
  value: number; // 0..1
  height?: number;
  trackColor?: string;
  fillColor?: string;
};

export function ProgressBar({
  value,
  height = 8,
  trackColor = colors.primaryWash,
  fillColor = colors.primary,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(1, value));
  return (
    <View
      style={{
        height,
        backgroundColor: trackColor,
        borderRadius: height / 2,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          width: `${clamped * 100}%`,
          height: '100%',
          backgroundColor: fillColor,
          borderRadius: height / 2,
        }}
      />
    </View>
  );
}
