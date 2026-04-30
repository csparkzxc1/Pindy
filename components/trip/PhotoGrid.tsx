import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius, spacing, typography } from '@/constants/theme';
import type { PhotoPlaceholder } from '@/types/travel';

export type PhotoGridProps = {
  photos: PhotoPlaceholder[];
  totalCount: number;
  paddingHorizontal?: number;
};

const DEFAULT_GAP = 8;
const COLS = 3;

export function PhotoGrid({
  photos,
  totalCount,
  paddingHorizontal = spacing.xl,
}: PhotoGridProps) {
  const screenW = Dimensions.get('window').width;
  const gridW = screenW - paddingHorizontal * 2;
  const cellSize = (gridW - DEFAULT_GAP * (COLS - 1)) / COLS;

  // Tile the photos to roughly match totalCount cells (max 9 visible).
  const visibleCount = Math.min(9, Math.max(photos.length, 6));
  const cells = Array.from({ length: visibleCount }).map((_, i) => photos[i % photos.length]);
  const remaining = Math.max(0, totalCount - cells.length);
  const lastIndex = cells.length - 1;

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: DEFAULT_GAP }}>
      {cells.map((p, i) => {
        if (!p) return null;
        const isLast = i === lastIndex && remaining > 0;
        return (
          <View
            key={`${p.id}-${i}`}
            style={{
              width: cellSize,
              height: cellSize,
              borderRadius: radius.md,
              overflow: 'hidden',
            }}
          >
            <LinearGradient
              colors={[p.from, p.to]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flex: 1 }}
            />
            {isLast ? (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ ...typography.h1, color: '#FFFFFF' }}>+{remaining}</Text>
              </View>
            ) : null}
          </View>
        );
      })}
      {/* Suppress unused import warning under strict mode */}
      {colors.bg ? null : <View />}
    </View>
  );
}
