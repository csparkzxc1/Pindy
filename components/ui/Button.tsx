import React from 'react';
import { ActivityIndicator, Pressable, Text, View, ViewStyle } from 'react-native';
import { colors, radius, shadows } from '@/constants/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'mint';
export type ButtonSize = 'md' | 'lg' | 'circle';

export type ButtonProps = {
  title?: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
}: ButtonProps) {
  const sizeStyle: ViewStyle =
    size === 'lg'
      ? { height: 56, paddingHorizontal: 24, borderRadius: radius.full }
      : size === 'circle'
        ? { width: 56, height: 56, borderRadius: 28, paddingHorizontal: 0 }
        : { height: 44, paddingHorizontal: 16, borderRadius: radius.full };

  const textSize = size === 'lg' ? 16 : 14;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        {
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 8,
          opacity: disabled ? 0.4 : pressed ? 0.85 : 1,
          backgroundColor: variantBg(variant, pressed),
          width: fullWidth ? '100%' : undefined,
        },
        sizeStyle,
        variant === 'primary' || variant === 'mint' ? shadows.soft : null,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variantText(variant)} size="small" />
      ) : (
        <>
          {icon ? <View>{icon}</View> : null}
          {title ? (
            <Text
              style={{
                color: variantText(variant),
                fontSize: textSize,
                fontWeight: '700',
                lineHeight: textSize + 4,
              }}
            >
              {title}
            </Text>
          ) : null}
        </>
      )}
    </Pressable>
  );
}

function variantBg(variant: ButtonVariant, pressed: boolean): string {
  if (variant === 'primary') return pressed ? colors.primaryDark : colors.primary;
  if (variant === 'mint') return pressed ? colors.mintDark : colors.mint;
  if (variant === 'secondary') return colors.primaryWash;
  return 'transparent';
}

function variantText(variant: ButtonVariant): string {
  if (variant === 'primary' || variant === 'mint') return '#FFFFFF';
  if (variant === 'secondary') return colors.primary;
  return colors.sub;
}
