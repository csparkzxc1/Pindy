import React from 'react';
import { Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { colors, typography } from '@/constants/theme';
import { formatPercent, formatNumber } from '@/lib/format';
import type { TravelStats } from '@/types/travel';

export type ProgressSummaryCardProps = {
  stats: TravelStats;
  variant?: 'default' | 'compact';
  mode?: 'domestic' | 'overseas' | 'all';
};

export function ProgressSummaryCard({
  stats,
  variant = 'default',
  mode = 'all',
}: ProgressSummaryCardProps) {
  if (mode === 'domestic') {
    const ratio = stats.totalSigungu > 0
      ? stats.visitedSigungu / stats.totalSigungu
      : 0;
    return (
      <Card padding={20} rounded="xl">
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ ...typography.h2, color: colors.text }}>국내 여행 진행률</Text>
          <Text style={{ ...typography.h2, color: colors.primary }}>
            {formatPercent(ratio, 1)}
          </Text>
        </View>
        <View style={{ marginTop: 12 }}>
          <ProgressBar value={ratio} trackColor={colors.primaryWash} fillColor={colors.primary} />
        </View>
        {variant === 'compact' ? null : (
          <View style={{ marginTop: 16 }}>
            <Column
              label="방문한 시·군"
              value={stats.visitedSigungu}
              total={250}
              accent={colors.primary}
            />
          </View>
        )}
      </Card>
    );
  }

  if (mode === 'overseas') {
    const ratio = stats.totalProvinces > 0
      ? stats.visitedProvinces / stats.totalProvinces
      : 0;
    return (
      <Card padding={20} rounded="xl">
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ ...typography.h2, color: colors.text }}>해외 여행 진행률</Text>
          <Text style={{ ...typography.h2, color: colors.mintDark }}>
            {formatPercent(ratio, 1)}
          </Text>
        </View>
        <View style={{ marginTop: 12 }}>
          <ProgressBar value={ratio} trackColor={colors.mintWash} fillColor={colors.mintDark} />
        </View>
        {variant === 'compact' ? null : (
          <View style={{ marginTop: 16 }}>
            <Column
              label="방문한 도·주"
              value={stats.visitedProvinces}
              total={1200}
              accent={colors.mintDark}
            />
          </View>
        )}
      </Card>
    );
  }

  return (
    <Card padding={20} rounded="xl">
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ ...typography.h2, color: colors.text }}>여행 진행률</Text>
        <Text style={{ ...typography.h2, color: colors.primary }}>
          {formatPercent(stats.progress, 1)}
        </Text>
      </View>

      <View style={{ marginTop: 12 }}>
        <ProgressBar value={stats.progress} />
      </View>

      {variant === 'compact' ? null : (
        <View
          style={{
            marginTop: 16,
            flexDirection: 'row',
            alignItems: 'stretch',
          }}
        >
          <Column
            label="방문한 시·군"
            value={stats.visitedSigungu}
            total={stats.totalSigungu}
            accent={colors.primary}
          />
          <View style={{ width: 1, backgroundColor: colors.line, marginHorizontal: 12 }} />
          <Column
            label="방문한 도·주"
            value={stats.visitedProvinces}
            total={stats.totalProvinces}
            accent={colors.mintDark}
          />
        </View>
      )}
    </Card>
  );
}

function Column({
  label,
  value,
  total,
  accent,
}: {
  label: string;
  value: number;
  total: number;
  accent: string;
}) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ ...typography.caption, color: colors.sub }}>{label}</Text>
      <View
        style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: 6 }}
      >
        <Text style={{ ...typography.display, color: accent }}>{formatNumber(value)}</Text>
        <Text style={{ ...typography.body, color: colors.muted }}>
          {' / '}
          {formatNumber(total)}
        </Text>
      </View>
    </View>
  );
}
