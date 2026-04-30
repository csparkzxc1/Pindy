import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle, Polygon } from 'react-native-svg';
import { colors, typography } from '@/constants/theme';
import type { TravelStyle } from '@/types/travel';

export type RadarChartProps = {
  values: TravelStyle;
  size?: number;
};

const AXIS_KEYS: Array<keyof TravelStyle> = ['휴양', '문화역사', '자연', '미식', '도시'];
const AXIS_LABELS: Record<keyof TravelStyle, string> = {
  휴양: '휴양',
  문화역사: '문화/역사',
  자연: '자연',
  미식: '미식',
  도시: '도시',
};

export function RadarChart({ values, size = 240 }: RadarChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 40;
  const axisCount = AXIS_KEYS.length;

  // Pentagon points (angle starts at top, -90deg)
  function pointAt(angleIndex: number, scale: number): { x: number; y: number } {
    const angle = (-Math.PI / 2) + (2 * Math.PI * angleIndex) / axisCount;
    return {
      x: cx + Math.cos(angle) * radius * scale,
      y: cy + Math.sin(angle) * radius * scale,
    };
  }

  // Background grid polygons
  const gridLevels = [0.25, 0.5, 0.75, 1];
  const gridPolygons = gridLevels.map((level) =>
    AXIS_KEYS.map((_, i) => {
      const p = pointAt(i, level);
      return `${p.x},${p.y}`;
    }).join(' '),
  );

  // Data polygon
  const dataPoints = AXIS_KEYS.map((key, i) => {
    const value = Math.max(0, Math.min(1, values[key] ?? 0));
    const p = pointAt(i, value);
    return p;
  });
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  // Label positions (slightly outside vertices)
  const labelPositions = AXIS_KEYS.map((key, i) => {
    const p = pointAt(i, 1.18);
    return { key, ...p };
  });

  return (
    <View
      style={{ width: size, height: size, alignSelf: 'center', position: 'relative' }}
    >
      <Svg width={size} height={size}>
        {gridPolygons.map((points, i) => (
          <Polygon
            key={i}
            points={points}
            fill="none"
            stroke={colors.line}
            strokeWidth={1}
          />
        ))}
        <Polygon
          points={dataPolygon}
          fill={colors.primarySoft}
          fillOpacity={0.5}
          stroke={colors.primary}
          strokeWidth={1.5}
        />
        {dataPoints.map((p, i) => (
          <Circle key={i} cx={p.x} cy={p.y} r={3} fill={colors.primary} />
        ))}
      </Svg>

      {labelPositions.map((lp) => (
        <View
          key={lp.key}
          style={{
            position: 'absolute',
            left: lp.x - 28,
            top: lp.y - 8,
            width: 56,
            alignItems: 'center',
          }}
        >
          <Text
            style={{ ...typography.caption, color: colors.sub }}
            numberOfLines={1}
          >
            {AXIS_LABELS[lp.key]}
          </Text>
        </View>
      ))}
    </View>
  );
}
