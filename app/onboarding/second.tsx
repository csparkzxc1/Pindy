import { Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { OnboardingIllustration2 } from '@/components/onboarding/OnboardingIllustration2';
import { PageDots } from '@/components/ui/PageDots';
import { colors, shadows, typography } from '@/constants/theme';

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
          사진으로 추억을 남기고{'\n'}스토리를 만드세요
        </Text>

        <Text
          style={{
            ...typography.body,
            color: colors.sub,
            textAlign: 'center',
            marginTop: 12,
          }}
        >
          여행 사진을 정리하고{'\n'}멋진 콜라주와 스토리를 만들어보세요.
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
            style={({ pressed }) => [
              {
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: pressed ? colors.mintDark : colors.mint,
                alignItems: 'center',
                justifyContent: 'center',
              },
              shadows.floating,
            ]}
          >
            <Ionicons name="arrow-forward" size={24} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}
