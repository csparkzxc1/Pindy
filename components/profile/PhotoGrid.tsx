import React from 'react';
import { Dimensions, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { radius, spacing } from '@/constants/theme';
import type { PhotoPlaceholder } from '@/types/travel';

export type ProfilePhotoGridProps = {
  photos: PhotoPlaceholder[];
  cells?: number;             // default 9
  paddingHorizontal?: number; // default spacing.xl
  gap?: number;               // default 4
};

export function ProfilePhotoGrid({
  photos,
  cells = 9,
  paddingHorizontal = spacing.xl,
  gap = 4,
}: ProfilePhotoGridProps) {
  const screenW = Dimensions.get('window').width;
  const gridW = screenW - paddingHorizontal * 2;
  const cellSize = (gridW - gap * 2) / 3;

  if (photos.length === 0) {
    return null;
  }

  const visible = Array.from({ length: cells }).map(
    (_, i) => photos[i % photos.length]!,
  );

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap }}>
      {visible.map((p, i) => (
        <View
          key={`${p.id}-${i}`}
          style={{
            width: cellSize,
            height: cellSize,
            borderRadius: radius.sm,
            overflow: 'hidden',
          }}
        >
          <LinearGradient
            colors={[p.from, p.to]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
          />
        </View>
      ))}
    </View>
  );
}
