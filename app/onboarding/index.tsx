import { Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { OnboardingIllustration1 } from '@/components/onboarding/OnboardingIllustration1';
import { PageDots } from '@/components/ui/PageDots';
import { colors, shadows, typography } from '@/constants/theme';

export default function OnboardingOne() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#FFF1F2', '#FFE4E6', '#FAF7F2']}
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
        {/* Skip */}
        <View style={{ alignItems: 'flex-end' }}>
          <Pressable
            onPress={() => router.replace('/(tabs)/map')}
            hitSlop={10}
          >
            <Text style={{ ...typography.body, color: colors.sub }}>건너뛰기</Text>
          </Pressable>
        </View>

        {/* Illustration */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <OnboardingIllustration1 />
        </View>

        {/* Title */}
        <Text
          style={{ ...typography.display, color: colors.text, textAlign: 'center' }}
        >
          당신의 여행을,{'\n'}색으로 남기세요
        </Text>

        <Text
          style={{
            ...typography.body,
            color: colors.sub,
            textAlign: 'center',
            marginTop: 12,
          }}
        >
          여행의 순간을 기록하고{'\n'}나만의 컬러로 세계를 채워보세요.
        </Text>

        {/* Bottom row */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 32,
          }}
        >
          <PageDots total={3} active={0} color={colors.primary} />
          <Pressable
            onPress={() => router.push('/onboarding/second')}
            style={({ pressed }) => [
              {
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: pressed ? colors.primaryDark : colors.primary,
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
