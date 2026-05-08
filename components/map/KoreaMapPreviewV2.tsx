import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Path, Text as SvgText } from "react-native-svg";
import { geoMercator, geoPath, geoCentroid } from "d3-geo";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { sigunguGeoJSON, SIGUNGU_TOTAL } from "@/data/sigungu";
import { colors, spacing, typography, radius, shadows } from "@/constants/theme";

interface KoreaMapPreviewV2Props {
  visitedCodes?: string[];
  onToggle?: (code: string) => void;
  width?: number;
  height?: number;
}

function shortName(name: string): string {
  if (name.endsWith("특별시")) return name.replace("특별시", "");
  if (name.endsWith("광역시")) return name.replace("광역시", "");
  if (name.endsWith("특별자치시")) return name.replace("특별자치시", "");
  return name;
}

const PROVINCE_NAMES: Record<string, string> = { "31": "경기", "32": "강원", "33": "충북", "34": "충남", "35": "전북", "36": "전남", "37": "경북", "38": "경남" };

export function KoreaMapPreviewV2({ visitedCodes = [], onToggle, width = 320, height = 360 }: KoreaMapPreviewV2Props) {
  const visitedSet = useMemo(() => new Set(visitedCodes), [visitedCodes]);
  const [lastTapped, setLastTapped] = useState<{ code: string; name: string } | null>(null);

  const { paths, metroLabels, provinceLabels } = useMemo(() => {
    const projection = geoMercator().fitSize([width, height], sigunguGeoJSON as any);
    const pathGenerator = geoPath(projection as any);

    const allPaths = sigunguGeoJSON.features.map((f) => ({
      code: f.properties.code,
      name: f.properties.name,
      d: pathGenerator(f as any) ?? "",
    }));

    const metros = sigunguGeoJSON.features.filter((f) => f.properties.code.endsWith("000")).map((f) => {
      const c = geoCentroid(f as any);
      const p = projection(c as [number, number]);
      return { code: f.properties.code, name: shortName(f.properties.name), x: p ? p[0] : 0, y: p ? p[1] : 0 };
    });

    const groups: Record<string, { lons: number[]; lats: number[] }> = {};
    for (const f of sigunguGeoJSON.features) {
      const code = f.properties.code;
      if (code.endsWith("000")) continue;
      const prefix = code.substring(0, 2);
      if (!PROVINCE_NAMES[prefix]) continue;
      if (!groups[prefix]) groups[prefix] = { lons: [], lats: [] };
      const c = geoCentroid(f as any);
      groups[prefix].lons.push(c[0]);
      groups[prefix].lats.push(c[1]);
    }

    const provinces = Object.entries(groups).map(([prefix, g]) => {
      const avgLon = g.lons.reduce((a, b) => a + b, 0) / g.lons.length;
      const avgLat = g.lats.reduce((a, b) => a + b, 0) / g.lats.length;
      const p = projection([avgLon, avgLat]);
      return { name: PROVINCE_NAMES[prefix], x: p ? p[0] : 0, y: p ? p[1] : 0 };
    });

    return { paths: allPaths, metroLabels: metros, provinceLabels: provinces };
  }, [width, height]);

  const visitedCount = visitedSet.size;

  const handlePathPress = (code: string, name: string) => {
    setLastTapped({ code, name });
    onToggle?.(code);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>대한민국</Text>
        <Text style={styles.subtitle}>
          <Text style={styles.count}>{visitedCount}</Text> / {SIGUNGU_TOTAL} 시·군
        </Text>
        {lastTapped && (
          <Text style={styles.lastTapped}>
            {lastTapped.name} ({lastTapped.code}) {visitedSet.has(lastTapped.code) ? "✓ 방문" : "미방문"}
          </Text>
        )}
      </View>

      <View style={[styles.mapWrapper, { width, height }]}>
        <ReactNativeZoomableView maxZoom={15} minZoom={1} zoomStep={0.5} initialZoom={1} bindToBorders={true} doubleTapZoomToCenter={false} contentWidth={width} contentHeight={height}>
          <Svg width={width} height={height}>
            {paths.map((p) => {
              const visited = visitedSet.has(p.code);
              return (
                <Path key={p.code} d={p.d} fill={visited ? colors.primary : colors.lineSoft} stroke={colors.bgAlt} strokeWidth={0.5} onPress={() => handlePathPress(p.code, p.name)} />
              );
            })}
            {provinceLabels.map((l) => (
              <SvgText key={"prov-" + l.name} x={l.x} y={l.y} fontSize={9} fontWeight="600" textAnchor="middle" fill={colors.sub} pointerEvents="none">
                {l.name}
              </SvgText>
            ))}
            {metroLabels.map((l) => (
              <SvgText key={"metro-" + l.code} x={l.x} y={l.y} fontSize={10} fontWeight="700" textAnchor="middle" fill={visitedSet.has(l.code) ? colors.bgAlt : colors.text} pointerEvents="none">
                {l.name}
              </SvgText>
            ))}
          </Svg>
        </ReactNativeZoomableView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.bgAlt, borderRadius: radius.lg, padding: spacing.md, ...shadows.card },
  header: { marginBottom: spacing.sm },
  title: { ...typography.title, color: colors.text },
  subtitle: { ...typography.body, color: colors.sub, marginTop: spacing.xs },
  count: { color: colors.primary, fontWeight: "700" },
  lastTapped: { ...typography.caption, color: colors.sub, marginTop: spacing.xs, fontWeight: "500" },
  mapWrapper: { overflow: "hidden", alignSelf: "center" },
});
