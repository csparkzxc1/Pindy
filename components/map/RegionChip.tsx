import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors, typography } from '@/constants/theme';
import type { Region } from '@/types/travel';

export type RegionChipProps = {
  region: Region;
  onPress?: () => void;
};

export function RegionChip({ region, onPress }: RegionChipProps) {
  const unit = region.unit;
  const isDomestic = unit.type === 'domestic';
  const label = isDomestic ? unit.sigunguName : unit.provinceName;
  const initial = isDomestic ? unit.sigunguName.charAt(0) : '';
  const flag = isDomestic ? '' : unit.flag;

  return (
    <Pressable onPress={onPress} style={{ alignItems: 'center', width: 64 }}>
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: colors.primaryWash,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isDomestic ? (
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.primary }}>
            {initial}
          </Text>
        ) : (
          <Text style={{ fontSize: 28 }}>{flag}</Text>
        )}
      </View>
      <Text
        style={{ ...typography.caption, color: colors.text, marginTop: 6 }}
        numberOfLines={1}
      >
        {label}
      </Text>
    </Pressable>
  );
}
