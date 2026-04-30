import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors, radius } from '@/constants/theme';

export type PillVariant = 'primary' | 'mint' | 'neutral' | 'translucent';

export type PillProps = {
  label: string;
  active?: boolean;
  variant?: PillVariant;
  onPress?: () => void;
};

export function Pill({ label, active = false, variant = 'primary', onPress }: PillProps) {
  const { bg, fg } = pillColors(variant, active);

  const Container: any = onPress ? Pressable : View;

  return (
    <Container
      onPress={onPress}
      style={{
        backgroundColor: bg,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: radius.full,
        alignSelf: 'flex-start',
      }}
    >
      <Text
        style={{
          color: fg,
          fontSize: 13,
          fontWeight: '700',
          lineHeight: 16,
        }}
      >
        {label}
      </Text>
    </Container>
  );
}

function pillColors(variant: PillVariant, active: boolean): { bg: string; fg: string } {
  if (variant === 'primary') {
    return active
      ? { bg: colors.primary, fg: '#FFFFFF' }
      : { bg: colors.primaryWash, fg: colors.primary };
  }
  if (variant === 'mint') {
    return active
      ? { bg: colors.mint, fg: '#FFFFFF' }
      : { bg: colors.mintWash, fg: colors.mintDark };
  }
  if (variant === 'translucent') {
    return { bg: 'rgba(255,255,255,0.25)', fg: '#FFFFFF' };
  }
  return active
    ? { bg: colors.text, fg: '#FFFFFF' }
    : { bg: colors.lineSoft, fg: colors.sub };
}
