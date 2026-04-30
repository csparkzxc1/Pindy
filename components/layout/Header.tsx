import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors, typography } from '@/constants/theme';

export type HeaderProps = {
  title?: string;
  backable?: boolean;
  right?: React.ReactNode;
  onBack?: () => void;
};

export function Header({ title, backable = false, right, onBack }: HeaderProps) {
  const handleBack = () => {
    if (onBack) onBack();
    else if (router.canGoBack()) router.back();
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        minHeight: 48,
      }}
    >
      <View style={{ width: 36 }}>
        {backable ? (
          <Pressable onPress={handleBack} hitSlop={8}>
            <Ionicons name="chevron-back" size={26} color={colors.text} />
          </Pressable>
        ) : null}
      </View>
      <Text style={{ ...typography.h1, color: colors.text }} numberOfLines={1}>
        {title ?? ''}
      </Text>
      <View style={{ width: 36, alignItems: 'flex-end' }}>{right}</View>
    </View>
  );
}
