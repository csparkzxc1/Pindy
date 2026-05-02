import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '@/constants/theme';

export type ToolbarTabKey = 'layout' | 'background' | 'text' | 'sticker' | 'filter';

export type StoryToolbarProps = {
  active: ToolbarTabKey;
  onChange: (k: ToolbarTabKey) => void;
};

const TABS: Array<{ key: ToolbarTabKey; label: string; icon: keyof typeof Ionicons.glyphMap }> = [
  { key: 'layout', label: '레이아웃', icon: 'grid-outline' },
  { key: 'background', label: '배경', icon: 'color-palette-outline' },
  { key: 'text', label: '텍스트', icon: 'text-outline' },
  { key: 'sticker', label: '스티커', icon: 'happy-outline' },
  { key: 'filter', label: '필터', icon: 'aperture-outline' },
];

export function StoryToolbar({ active, onChange }: StoryToolbarProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 8,
        paddingTop: 12,
        paddingBottom: 8,
        borderTopWidth: 1,
        borderTopColor: colors.lineSoft,
      }}
    >
      {TABS.map((t) => {
        const isActive = t.key === active;
        return (
          <Pressable
            key={t.key}
            onPress={() => onChange(t.key)}
            style={{ flex: 1, alignItems: 'center', paddingVertical: 6 }}
            hitSlop={4}
          >
            <Ionicons
              name={t.icon}
              size={22}
              color={isActive ? colors.primary : colors.muted}
            />
            <Text
              style={{
                ...typography.caption,
                color: isActive ? colors.primary : colors.muted,
                marginTop: 2,
                fontWeight: isActive ? '700' : '500',
              }}
            >
              {t.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
