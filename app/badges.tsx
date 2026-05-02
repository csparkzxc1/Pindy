import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { BadgeCard } from '@/components/badges/BadgeCard';
import { BadgeProgressBar } from '@/components/badges/BadgeProgressBar';
import { useAppState } from '@/stores/AppContext';
import { colors, radius, shadows, typography } from '@/constants/theme';
import { formatDateKo } from '@/lib/format';
import type { Badge, BadgeCategory } from '@/types/badge';

const SECTIONS: { key: BadgeCategory; title: string }[] = [
  { key: 'collection', title: '수집 배지' },
  { key: 'photo', title: '사진 배지' },
  { key: 'frequency', title: '여행 빈도' },
  { key: 'special', title: '특별 배지' },
];

export default function BadgesScreen() {
  const { badges, unlockedBadgeCount } = useAppState();
  const [selected, setSelected] = useState<Badge | null>(null);

  return (
    <Screen scroll>
      <Header
        backable
        title="나의 배지"
        right={
          <Pressable hitSlop={10} onPress={() => {}}>
            <Ionicons name="share-outline" size={22} color={colors.text} />
          </Pressable>
        }
      />

      <View style={{ marginTop: 8, marginBottom: 16 }}>
        <Text style={{ ...typography.body, color: colors.sub }}>
          잠금 해제한 배지{' '}
          <Text style={{ color: colors.primary, fontWeight: '700' }}>
            {unlockedBadgeCount}
          </Text>{' '}
          / {badges.length}
        </Text>
      </View>

      {SECTIONS.map((section) => {
        const inSection = badges.filter((b) => b.category === section.key);
        if (inSection.length === 0) return null;
        return (
          <View key={section.key} style={{ marginBottom: 24 }}>
            <Text
              style={{
                ...typography.h2,
                color: colors.text,
                marginBottom: 12,
              }}
            >
              {section.title}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 12, paddingVertical: 4 }}
            >
              {inSection.map((b) => (
                <BadgeCard
                  key={b.id}
                  badge={b}
                  size="md"
                  onPress={() => setSelected(b)}
                />
              ))}
            </ScrollView>
          </View>
        );
      })}

      <Modal
        animationType="fade"
        transparent
        visible={selected !== null}
        onRequestClose={() => setSelected(null)}
      >
        <Pressable
          onPress={() => setSelected(null)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.45)',
            justifyContent: 'flex-end',
          }}
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: radius.xl,
              borderTopRightRadius: radius.xl,
              padding: 24,
              paddingBottom: 32,
              ...shadows.card,
            }}
          >
            {selected ? <BadgeDetail badge={selected} /> : null}
          </Pressable>
        </Pressable>
      </Modal>
    </Screen>
  );
}

function BadgeDetail({ badge }: { badge: Badge }) {
  const locked = badge.level === 0;
  return (
    <View>
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <BadgeCard badge={badge} size="lg" />
      </View>

      <Text
        style={{
          ...typography.title,
          color: colors.text,
          textAlign: 'center',
        }}
      >
        {badge.nameKo}
      </Text>
      <Text
        style={{
          ...typography.body,
          color: colors.sub,
          textAlign: 'center',
          marginTop: 6,
        }}
      >
        {badge.description}
      </Text>

      <Card padding={16} style={{ marginTop: 20 }}>
        <BadgeProgressBar
          progress={badge.progress}
          nextThreshold={badge.nextThreshold}
          accent={badge.color}
          label={locked ? '잠금 해제까지' : `Lv.${badge.level + 1}까지`}
        />
        {!locked && badge.unlockedAt ? (
          <Text style={{ ...typography.caption, color: colors.sub, marginTop: 12 }}>
            처음 잠금 해제: {formatDateKo(badge.unlockedAt)}
          </Text>
        ) : null}
      </Card>
    </View>
  );
}
