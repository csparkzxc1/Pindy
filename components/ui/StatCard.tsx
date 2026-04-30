import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from './Card';
import { colors, typography } from '@/constants/theme';

export type StatCardProps = {
  label: string;
  value: string | number;
  total?: string;
  accentColor?: string;
  icon?: keyof typeof Ionicons.glyphMap;
};

export function StatCard({
  label,
  value,
  total,
  accentColor = colors.primary,
  icon,
}: StatCardProps) {
  return (
    <Card padding={16} style={{ flex: 1, minHeight: 120 }}>
      <Text style={{ ...typography.caption, color: colors.sub }}>{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 8, gap: 4 }}>
        <Text style={{ ...typography.display, color: accentColor }}>{value}</Text>
        {total ? (
          <Text style={{ ...typography.body, color: colors.muted }}>{total}</Text>
        ) : null}
      </View>
      {icon ? (
        <View style={{ position: 'absolute', right: 16, bottom: 16 }}>
          <Ionicons name={icon} size={24} color={accentColor} />
        </View>
      ) : null}
    </Card>
  );
}
