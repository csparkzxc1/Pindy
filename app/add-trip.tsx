import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { colors, radius, typography } from '@/constants/theme';

type Action = {
  key: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  accent: string;
  bg: string;
};

const ACTIONS: Action[] = [
  {
    key: 'auto',
    icon: 'images-outline',
    title: '사진으로 자동 생성',
    subtitle: '갤러리에서 위치 정보가 있는 사진을 골라 여행을 자동으로 만들어요.',
    accent: colors.primary,
    bg: colors.primaryWash,
  },
  {
    key: 'manual',
    icon: 'create-outline',
    title: '직접 입력하기',
    subtitle: '여행지, 날짜, 메모를 직접 입력해서 새 여행을 추가해요.',
    accent: colors.mintDark,
    bg: colors.mintWash,
  },
  {
    key: 'memo',
    icon: 'bookmark-outline',
    title: '여행지 저장하기',
    subtitle: '나중에 가고 싶은 도시를 위시리스트에 담아두세요.',
    accent: colors.yellow,
    bg: colors.yellowWash,
  },
];

export default function AddTripModal() {
  return (
    <Screen>
      <Header
        title="새 여행 추가"
        right={
          <Pressable hitSlop={10} onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={colors.text} />
          </Pressable>
        }
      />

      <Text style={{ ...typography.body, color: colors.sub, marginTop: 8 }}>
        어떤 방식으로 여행을 추가할까요?
      </Text>

      <View style={{ gap: 12, marginTop: 16 }}>
        {ACTIONS.map((a) => (
          <Pressable key={a.key} onPress={() => {}}>
            <Card padding={16}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: radius.md,
                    backgroundColor: a.bg,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons name={a.icon} size={24} color={a.accent} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ ...typography.h2, color: colors.text }}>{a.title}</Text>
                  <Text
                    style={{ ...typography.caption, color: colors.sub, marginTop: 4 }}
                  >
                    {a.subtitle}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.sub} />
              </View>
            </Card>
          </Pressable>
        ))}
      </View>

      <View style={{ marginTop: 'auto', paddingBottom: 16 }}>
        <Button
          title="닫기"
          variant="ghost"
          size="md"
          fullWidth
          onPress={() => router.back()}
        />
      </View>
    </Screen>
  );
}
