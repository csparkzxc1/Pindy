import { Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { OnboardingIllustration2 } from '@/components/onboarding/OnboardingIllustration2';
import { PageDots } from '@/components/ui/PageDots';
import { colors, typography } from '@/constants/theme';

export default function OnboardingTwo() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#ECFDF5', '#D1FAE5', '#FAF7F2']}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          paddingTop: insets.top + 12,
          paddingBottom: insets.bottom + 32,
        }}
      >
        <View style={{ alignItems: 'flex-end' }}>
          <Pressable
            onPress={() => router.replace('/(tabs)/map')}
            hitSlop={10}
          >
            <Text style={{ ...typography.body, color: colors.sub }}>건너뛰기</Text>
          </Pressable>
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <OnboardingIllustration2 />
        </View>

        <Text
          style={{ ...typography.display, color: colors.text, textAlign: 'center' }}
        >
          기록할수록{'\n'}지도가 완성돼요
        </Text>

        <Text
          style={{
            ...typography.body,
            color: colors.sub,
            textAlign: 'center',
            marginTop: 12,
          }}
        >
          방문한 나라와 도시가{'\n'}컬러로 채워지는 재미를 느껴보세요.
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 32,
          }}
        >
          <PageDots total={3} active={1} color={colors.mint} />
          <Pressable
            onPress={() => router.push('/onboarding/permission')}
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: colors.mint,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#34D399',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.25,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <Ionicons name="arrow-forward" size={26} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}