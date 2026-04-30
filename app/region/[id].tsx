import { ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '@/components/layout/Screen';
import { Header } from '@/components/layout/Header';
import { Pill } from '@/components/ui/Pill';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { RegionMapPreview } from '@/components/map/RegionMapPreview';
import { RegionChip } from '@/components/map/RegionChip';
import {
  getRegionById,
  popularDestinations,
  visitedSigungu,
  visitedProvinces,
} from '@/constants/mockData';
import { colors, radius, shadows, typography } from '@/constants/theme';
import { formatDateKo } from '@/lib/format';

export default function RegionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const region = id ? getRegionById(id) : undefined;

  if (!region) {
    return (
      <Screen>
        <Header backable title="지역" />
        <View style={{ alignItems: 'center', paddingVertical: 64 }}>
          <Text style={{ ...typography.body, color: colors.sub }}>
            지역 정보를 찾을 수 없어요.
          </Text>
        </View>
      </Screen>
    );
  }

  const unit = region.unit;
  const isDomestic = unit.type === 'domestic';
  const title = unit.type === 'domestic' ? unit.sigunguName : unit.provinceName;
  const subtitle =
    unit.type === 'domestic' ? `${unit.provinceName}, 한국` : unit.countryName;
  const flag = unit.type === 'overseas' ? unit.flag : undefined;

  const nearby = (isDomestic ? visitedSigungu : visitedProvinces).filter(
    (r) => r.id !== region.id,
  );

  return (
    <Screen scroll>
      <Header backable />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginTop: 8,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ ...typography.display, color: colors.text }}>{title}</Text>
          <Text
            style={{ ...typography.body, color: colors.sub, marginTop: 4 }}
          >
            {subtitle}
          </Text>
        </View>
        <View style={{ marginTop: 8 }}>
          <Pill
            label={isDomestic ? '시·군' : '도·주'}
            variant={isDomestic ? 'primary' : 'mint'}
          />
        </View>
      </View>

      <View style={{ marginTop: 16 }}>
        <RegionMapPreview
          type={region.unit.type}
          regionId={region.id}
          regionLabel={title}
          countryFlag={flag}
        />
      </View>

      <View style={{ marginTop: 12 }}>
        {isDomestic ? (
          <Text style={{ ...typography.caption, color: colors.sub }}>
            🌍 방문 횟수 {region.visitCount ?? 1}회
            {region.firstVisitDate
              ? ` · 📅 첫 방문 ${formatDateKo(region.firstVisitDate)}`
              : ''}
          </Text>
        ) : (
          <Text style={{ ...typography.caption, color: colors.sub }}>
            🌍 방문 횟수 {region.visitCount ?? 1}회 · 🏙 방문한 도시 4개
          </Text>
        )}
      </View>

      <View style={{ marginTop: 24 }}>
        <SectionHeader title="근처 지역" actionLabel="더보기" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, paddingVertical: 4 }}
        >
          {nearby.length === 0 ? (
            <Text style={{ ...typography.caption, color: colors.sub }}>
              아직 근처에 방문한 지역이 없어요.
            </Text>
          ) : (
            nearby.map((r) => <RegionChip key={r.id} region={r} />)
          )}
        </ScrollView>
      </View>

      <View style={{ marginTop: 24 }}>
        <SectionHeader title="인기 여행지" actionLabel="더보기" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, paddingVertical: 4 }}
        >
          {popularDestinations.map((p) => (
            <View
              key={p.id}
              style={{
                width: 160,
                height: 200,
                borderRadius: radius.lg,
                overflow: 'hidden',
                backgroundColor: colors.card,
                ...shadows.card,
              }}
            >
              <LinearGradient
                colors={[p.from, p.to]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ height: 120 }}
              />
              <View style={{ padding: 12 }}>
                <Text style={{ ...typography.h2, color: colors.text }}>
                  {p.name}
                </Text>
                <Text
                  style={{ ...typography.caption, color: colors.sub, marginTop: 2 }}
                  numberOfLines={1}
                >
                  {p.subtitle}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </Screen>
  );
}
