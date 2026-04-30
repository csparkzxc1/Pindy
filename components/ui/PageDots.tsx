import React from 'react';
import { View } from 'react-native';
import { colors } from '@/constants/theme';

export type PageDotsProps = {
  total: number;
  active: number;
  color?: string;
};

export function PageDots({ total, active, color = colors.primary }: PageDotsProps) {
  return (
    <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === active;
        return (
          <View
            key={i}
            style={{
              width: isActive ? 24 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: isActive ? color : colors.line,
            }}
          />
        );
      })}
    </View>
  );
}
