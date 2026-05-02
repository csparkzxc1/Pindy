import React from 'react';
import { Text, View } from 'react-native';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { colors, typography } from '@/constants/theme';
import { formatNumber } from '@/lib/format';

export type BadgeProgressBarProps = {
  progress: number;
  nextThreshold: number;
  accent: string;
  label?: string;
};

export function BadgeProgressBar({
  progress,
  nextThreshold,
  accent,
  label,
}: BadgeProgressBarProps) {
  const ratio = nextThreshold > 0 ? Math.min(1, progress / nextThreshold) : 1;

  return (
    <View>
      {label ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 6,
          }}
        >
          <Text style={{ ...typography.caption, color: colors.sub }}>{label}</Text>
          <Text style={{ ...typography.caption, color: accent, fontWeight: '700' }}>
            {formatNumber(progress)} / {formatNumber(nextThreshold)}
          </Text>
        </View>
      ) : null}
      <ProgressBar
        value={ratio}
        height={8}
        trackColor={colors.lineSoft}
        fillColor={accent}
      />
    </View>
  );
}
