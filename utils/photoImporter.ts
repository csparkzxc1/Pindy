import * as ImagePicker from "expo-image-picker";
import { matchSigunguBatch } from "./sigunguMatcher";

export interface PhotoImportResult {
  totalSelected: number;     // 선택한 총 사진 수
  withGps: number;           // GPS 정보 있는 사진 수
  matchedCodes: string[];    // 매칭된 시군구 코드 (중복 제거)
  canceled: boolean;
}

/**
 * 사진 라이브러리에서 사진 선택 → EXIF GPS 추출 → 시군구 매칭
 */
export async function importPhotosAndMatchSigungu(): Promise<PhotoImportResult> {
  // 1. 권한 요청
  const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!perm.granted) {
    throw new Error("사진 권한이 필요합니다. 설정에서 허용해주세요.");
  }

  // 2. 사진 선택 (다중)
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: true,
    selectionLimit: 100,
    exif: true, // ⭐ EXIF 메타데이터 받기
    quality: 0.1, // 빠르게 (이미지 자체는 안 쓰니 저화질 OK)
  });

  if (result.canceled) {
    return { totalSelected: 0, withGps: 0, matchedCodes: [], canceled: true };
  }

  // 3. EXIF에서 GPS 추출
  const coords: Array<{ lon: number; lat: number }> = [];
  for (const asset of result.assets) {
    const exif = asset.exif as Record<string, unknown> | undefined;
    if (!exif) continue;

    // iOS/Android EXIF 키: GPSLatitude, GPSLongitude (절댓값)
    // GPSLatitudeRef = 'N'/'S', GPSLongitudeRef = 'E'/'W'
    const lat = exif.GPSLatitude;
    const lon = exif.GPSLongitude;
    const latRef = (exif.GPSLatitudeRef as string) ?? "N";
    const lonRef = (exif.GPSLongitudeRef as string) ?? "E";

    if (typeof lat !== "number" || typeof lon !== "number") continue;
    if (lat === 0 && lon === 0) continue; // null island skip

    const finalLat = latRef === "S" ? -Math.abs(lat) : Math.abs(lat);
    const finalLon = lonRef === "W" ? -Math.abs(lon) : Math.abs(lon);

    coords.push({ lat: finalLat, lon: finalLon });
  }

  // 4. 좌표 → 시군구 코드 매칭
  const matchedCodes = matchSigunguBatch(coords);

  return {
    totalSelected: result.assets.length,
    withGps: coords.length,
    matchedCodes,
    canceled: false,
  };
}
