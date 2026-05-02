import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius, shadows, typography } from '@/constants/theme';
import type { StoryTemplate } from '@/types/story';

export type TemplateCardProps = {
  template: StoryTemplate;
  onPress?: () => void;
};

export function TemplateCard({ template, onPress }: TemplateCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flex: 1,
        aspectRatio: 1,
        borderRadius: radius.lg,
        overflow: 'hidden',
        opacity: pressed ? 0.85 : 1,
        ...shadows.soft,
      })}
    >
      <LinearGradient
        colors={[template.thumbnail.from, template.thumbnail.to]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, padding: 12, justifyContent: 'flex-end' }}
      >
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.85)',
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: radius.full,
            alignSelf: 'flex-start',
          }}
        >
          <Text style={{ ...typography.caption, color: colors.text, fontWeight: '700' }}>
            {template.name}
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}
