import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadows } from '@/constants/theme';

export function PermissionIllustration() {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: 80,
          height: 96,
          borderRadius: radius.xl,
          backgroundColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          ...shadows.floating,
        }}
      >
        <Ionicons name="location" size={56} color="#FFFFFF" />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: -8,
          right: -8,
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
          ...shadows.soft,
        }}
      >
        <Ionicons name="camera" size={20} color={colors.primary} />
      </View>
    </View>
  );
}
