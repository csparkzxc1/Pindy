import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/theme';

export type WordmarkProps = {
  size?: number;
  color?: string;
  showHeart?: boolean;
};

// TODO: replace with hand-lettered SVG when brand assets ready
export function Wordmark({
  size = 28,
  color = colors.primary,
  showHeart = true,
}: WordmarkProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      <View>
        {showHeart ? (
          <View style={{ position: 'absolute', top: -size * 0.35, left: size * 0.05 }}>
            <Ionicons name="heart" size={Math.round(size * 0.35)} color={color} />
          </View>
        ) : null}
        <Text
          style={{
            fontSize: size,
            fontWeight: '800',
            color,
            letterSpacing: -0.5,
            lineHeight: size * 1.1,
          }}
        >
          Pindy
        </Text>
      </View>
    </View>
  );
}
