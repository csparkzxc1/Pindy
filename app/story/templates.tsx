import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Header } from '@/components/layout/Header';
import { Pill } from '@/components/ui/Pill';
import { TemplateCard } from '@/components/story/TemplateCard';
import {
  TEMPLATE_CATEGORIES,
  TEMPLATE_CATEGORY_LABELS,
  storyTemplates,
} from '@/constants/mockStoryTemplates';
import { colors, typography } from '@/constants/theme';
import type { StoryTemplateCategory } from '@/types/story';

export default function StoryTemplatesScreen() {
  const params = useLocalSearchParams<{ trip?: string }>();
  const tripId = params.trip;
  const [category, setCategory] = useState<StoryTemplateCategory>('recommended');

  const visible = useMemo(
    () => storyTemplates.filter((t) => t.category === category),
    [category],
  );

  return (
    <Screen scroll>
      <Header
        title="스토리 만들기"
        right={
          <Pressable hitSlop={10} onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={colors.text} />
          </Pressable>
        }
      />

      {!tripId ? (
        <Text
          style={{ ...typography.caption, color: colors.sub, marginTop: 8 }}
        >
          여행이 선택되지 않았어요. 여행 상세에서 다시 시도해주세요.
        </Text>
      ) : null}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingVertical: 12 }}
      >
        {TEMPLATE_CATEGORIES.map((c) => (
          <Pill
            key={c}
            label={TEMPLATE_CATEGORY_LABELS[c]}
            active={category === c}
            variant="primary"
            onPress={() => setCategory(c)}
          />
        ))}
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 12,
          marginTop: 8,
        }}
      >
        {visible.map((t) => (
          <View key={t.id} style={{ width: '47.8%' }}>
            <TemplateCard
              template={t}
              onPress={() => {
                if (!tripId) return;
                router.push(
                  `/story/editor?template=${encodeURIComponent(t.id)}&trip=${encodeURIComponent(tripId)}`,
                );
              }}
            />
          </View>
        ))}
      </View>
    </Screen>
  );
}
