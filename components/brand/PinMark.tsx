import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '@/constants/theme';

export type PinMarkProps = {
  size?: number;
  pinColor?: string;
  dropColor?: string;
};

export function PinMark({
  size = 48,
  pinColor = colors.primary,
  dropColor = colors.mint,
}: PinMarkProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Path
        d="M24 4C16.27 4 10 10.27 10 18c0 9.5 12 24 13.1 25.3a1.2 1.2 0 0 0 1.8 0C26 42.3 38 27.5 38 18c0-7.73-6.27-14-14-14z"
        fill={pinColor}
      />
      <Circle cx="24" cy="18" r="6" fill="#FFFFFF" />
      <Circle cx="38" cy="38" r="5" fill={dropColor} opacity={0.85} />
    </Svg>
  );
}
