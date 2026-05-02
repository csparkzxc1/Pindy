import React from 'react';
import { Text, View } from 'react-native';
import { colors, typography } from '@/constants/theme';

export type StatItem = {
  key: string;
  value: string;
  label: string;
};

export type ProfileStatsRowProps = {
  items: StatItem[];
};

export function ProfileStatsRow({ items }: ProfileStatsRowProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 8,
      }}
    >
      {items.map((it, i) => (
        <React.Fragment key={it.key}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ ...typography.display, color: colors.text }}>{it.value}</Text>
            <Text
              style={{ ...typography.caption, color: colors.sub, marginTop: 2 }}
              numberOfLines={1}
            >
              {it.label}
            </Text>
          </View>
          {i < items.length - 1 ? (
            <View
              style={{
                width: 1,
                backgroundColor: colors.line,
                alignSelf: 'stretch',
                marginVertical: 8,
              }}
            />
          ) : null}
        </React.Fragment>
      ))}
    </View>
  );
}
