import { geoContains } from "d3-geo";
import { sigunguGeoJSON } from "@/data/sigungu";

/**
 * 위경도 좌표를 받아 매칭되는 시군구 코드를 반환.
 * 한국 영역 밖이거나 매칭 실패 시 null.
 *
 * @param lon 경도 (longitude, -180 ~ 180)
 * @param lat 위도 (latitude, -90 ~ 90)
 */
export function matchSigungu(lon: number, lat: number): string | null {
  // 한국 영역 빠른 사전 검사 (제주도 ~ 강원도)
  if (lat < 32 || lat > 39 || lon < 123 || lon > 133) {
    return null;
  }

  for (const feature of sigunguGeoJSON.features) {
    if (geoContains(feature as any, [lon, lat])) {
      return feature.properties.code;
    }
  }
  return null;
}

/**
 * 여러 좌표를 한꺼번에 매칭. 중복 제거된 시군구 코드 배열 반환.
 */
export function matchSigunguBatch(
  coords: Array<{ lon: number; lat: number }>,
): string[] {
  const codes = new Set<string>();
  for (const { lon, lat } of coords) {
    const code = matchSigungu(lon, lat);
    if (code) codes.add(code);
  }
  return Array.from(codes);
}
