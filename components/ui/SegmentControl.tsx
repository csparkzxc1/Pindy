import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors, radius, typography } from '@/constants/theme';

type SegmentOption<T extends string> = { key: T; label: string };

type Props<T extends string> = {
  options: SegmentOption<T>[];
  value: T;
  onChange: (v: T) => void;
  accent?: 'primary' | 'mint';
};

export function SegmentControl<T extends string>({
  options,
  value,
  onChange,
  accent = 'primary',
}: Props<T>) {
  const accentColor = accent === 'mint' ? colors.mintDark : colors.primary;

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.lineSoft,
        borderRadius: radius.full,
        padding: 4,
      }}
    >
      {options.map((opt) => {
        const active = opt.key === value;
        return (
          <Pressable
            key={opt.key}
            onPress={() => onChange(opt.key)}
            style={{
              flex: 1,
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: radius.full,
              backgroundColor: active ? accentColor : 'transparent',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                ...(active ? typography.bodyBold : typography.body),
                color: active ? '#FFFFFF' : colors.sub,
              }}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
