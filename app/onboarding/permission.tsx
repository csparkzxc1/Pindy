import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { PermissionIllustration } from '@/components/onboarding/PermissionIllustration';
import { colors, typography } from '@/constants/theme';

export default function PermissionScreen() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#FFF1F2', '#FEF3C7', '#FAF7F2']}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          paddingTop: insets.top + 24,
          paddingBottom: insets.bottom + 24,
        }}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <PermissionIllustration />

          <Text
            style={{
              ...typography.title,
              color: colors.text,
              textAlign: 'center',
              marginTop: 32,
            }}
          >
            위치 접근 권한이{'\n'}필요해요
          </Text>

          <Text
            style={{
              ...typography.body,
              color: colors.sub,
              textAlign: 'center',
              marginTop: 12,
            }}
          >
            방문한 지역을 자동으로 기록하고{'\n'}여행지 추천 서비스를 제공해드려요.
          </Text>
        </View>

        <View style={{ gap: 8, marginBottom: 32 }}>
          <Button
            title="권한 허용하기"
            variant="primary"
            size="lg"
            fullWidth
            onPress={() => router.replace('/(tabs)/map')}
          />
          <Button
            title="나중에 하기"
            variant="ghost"
            size="md"
            fullWidth
            onPress={() => router.replace('/(tabs)/map')}
          />
        </View>
      </View>
    </LinearGradient>
  );
}
