import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { geoMercator, geoPath } from "d3-geo";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { sigunguGeoJSON, SIGUNGU_TOTAL } from "@/data/sigungu";
import { colors, spacing, typography, radius, shadows } from "@/constants/theme";

interface KoreaMapPreviewV2Props {
  visitedCodes?: string[];
  width?: number;
  height?: number;
}

export function KoreaMapPreviewV2({
  visitedCodes = [],
  width = 320,
  height = 360,
}: KoreaMapPreviewV2Props) {
  const visitedSet = useMemo(() => new Set(visitedCodes), [visitedCodes]);

  const paths = useMemo(() => {
    const projection = geoMercator().fitSize([width, height], sigunguGeoJSON as any);
    const pathGenerator = geoPath(projection as any);

    return sigunguGeoJSON.features.map((f) => ({
      code: f.properties.code,
      name: f.properties.name,
      d: pathGenerator(f as any) ?? "",
    }));
  }, [width, height]);

  const visitedCount = visitedSet.size;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>대한민국</Text>
        <Text style={styles.subtitle}>
          <Text style={styles.count}>{visitedCount}</Text> / {SIGUNGU_TOTAL} 시·군
        </Text>
      </View>

      <View style={[styles.mapWrapper, { width, height }]}>
        <ReactNativeZoomableView
          maxZoom={6}
          minZoom={1}
          zoomStep={0.5}
          initialZoom={1}
          bindToBorders={true}
          doubleTapZoomToCenter={false}
          contentWidth={width}
          contentHeight={height}
        >
          <Svg width={width} height={height}>
            {paths.map((p) => {
              const visited = visitedSet.has(p.code);
              return (
                <Path
                  key={p.code}
                  d={p.d}
                  fill={visited ? colors.primary : colors.lineSoft}
                  stroke={colors.bgAlt}
                  strokeWidth={0.5}
                />
              );
            })}
          </Svg>
        </ReactNativeZoomableView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgAlt,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadows.card,
  },
  header: {
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.sub,
    marginTop: spacing.xs,
  },
  count: {
    color: colors.primary,
    fontWeight: "700",
  },
  mapWrapper: {
    overflow: "hidden",
    alignSelf: "center",
  },
});
