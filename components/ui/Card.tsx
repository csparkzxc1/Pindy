import React from 'react';
import { View, ViewProps } from 'react-native';
import { colors, radius, shadows } from '@/constants/theme';

export type CardProps = ViewProps & {
  padding?: number;
  rounded?: keyof typeof radius;
  flat?: boolean;
  children?: React.ReactNode;
};

export function Card({
  padding = 16,
  rounded = 'xl',
  flat = false,
  style,
  children,
  ...rest
}: CardProps) {
  return (
    <View
      {...rest}
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: radius[rounded],
          padding,
        },
        flat ? null : shadows.card,
        style,
      ]}
    >
      {children}
    </View>
  );
}
