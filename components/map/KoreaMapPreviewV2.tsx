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

export function KoreaMapPreviewV2({ visitedCodes = [], onToggle, width = 320, height = 360 }: KoreaMapPreviewV2Props) {
  const visitedSet = useMemo(() => new Set(visitedCodes), [visitedCodes]);
  const [lastTapped, setLastTapped] = useState<{ code: string; name: string } | null>(null);

  const paths = useMemo(() => {
    const projection = geoMercator().fitSize([width, height], sigunguGeoJSON as any);
    const pathGenerator = geoPath(projection as any);

    return sigunguGeoJSON.features.map((f) => {
      const centroid = geoCentroid(f as any);
      const projected = projection(centroid as [number, number]);
      const isMetro = f.properties.code.endsWith("000");
      return {
        code: f.properties.code,
        name: f.properties.name,
        shortName: shortName(f.properties.name),
        d: pathGenerator(f as any) ?? "",
        labelX: projected ? projected[0] : 0,
        labelY: projected ? projected[1] : 0,
        isMetro,
      };
    });
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
        <ReactNativeZoomableView maxZoom={10} minZoom={1} zoomStep={0.5} initialZoom={1} bindToBorders={true} doubleTapZoomToCenter={false} contentWidth={width} contentHeight={height}>
          <Svg width={width} height={height}>
            {paths.map((p) => {
              const visited = visitedSet.has(p.code);
              return (
                <Path key={p.code} d={p.d} fill={visited ? colors.primary : colors.lineSoft} stroke={colors.bgAlt} strokeWidth={0.5} onPress={() => handlePathPress(p.code, p.name)} />
              );
            })}
            {paths.map((p) => (
              <SvgText key={"label-" + p.code} x={p.labelX} y={p.labelY} fontSize={p.isMetro ? 6 : 4.5} fontWeight={p.isMetro ? "700" : "500"} textAnchor="middle" fill={visitedSet.has(p.code) ? colors.bgAlt : colors.text} pointerEvents="none">
                {p.shortName}
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
