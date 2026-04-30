import { Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/layout/Screen';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { colors, typography } from '@/constants/theme';

type Row = {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  trailing?: string;
};

const ROWS: Row[] = [
  { key: 'photo', label: '사진 권한 관리', icon: 'images-outline' },
  { key: 'map', label: '지도 데이터 관리', icon: 'map-outline' },
  { key: 'collage', label: '콜라주 워터마크 제거', icon: 'sparkles-outline' },
  { key: 'privacy', label: '개인정보 처리방침', icon: 'shield-checkmark-outline' },
  { key: 'version', label: '앱 버전', icon: 'information-circle-outline', trailing: 'v0.1.0' },
];

export default function ProfileScreen() {
  return (
    <Screen scroll>
      <View style={{ alignItems: 'center', paddingVertical: 24 }}>
        <View
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            backgroundColor: colors.primaryWash,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 36, fontWeight: '700', color: colors.primary }}>
            여
          </Text>
        </View>
        <Text style={{ ...typography.h1, color: colors.text, marginTop: 12 }}>
          여행자
        </Text>
        <View style={{ marginTop: 8 }}>
          <Pill label="Lv. 3 City Collector" variant="primary" />
        </View>
      </View>

      <Card padding={0} rounded="xl" style={{ marginTop: 16 }}>
        {ROWS.map((row, i) => (
          <Pressable
            key={row.key}
            android_ripple={{ color: colors.lineSoft }}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 16,
              paddingHorizontal: 20,
              borderTopWidth: i === 0 ? 0 : 1,
              borderTopColor: colors.lineSoft,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Ionicons name={row.icon} size={24} color={colors.sub} />
            <Text
              style={{ ...typography.body, color: colors.text, marginLeft: 12, flex: 1 }}
            >
              {row.label}
            </Text>
            {row.trailing ? (
              <Text style={{ ...typography.caption, color: colors.muted }}>
                {row.trailing}
              </Text>
            ) : (
              <Ionicons name="chevron-forward" size={18} color={colors.sub} />
            )}
          </Pressable>
        ))}
      </Card>
    </Screen>
  );
}
