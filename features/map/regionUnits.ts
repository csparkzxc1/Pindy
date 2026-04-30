/**
 * 행정구역 단위 정의
 *
 * 국내(한국):
 *   - 색칠 단위: 시(市) / 군(郡)
 *   - 전체 카운트: 약 226~250 (시군구 통합/분리 변동 있음)
 *   - 데이터 소스: KOSIS, 행정안전부
 *
 * 해외:
 *   - 색칠 단위: 도(道) / 주(州) / Province / State / Region
 *   - 전체 카운트: 약 1,200 (전세계 합계, 추정)
 *   - 데이터 소스: GeoNames admin1, ISO 3166-2
 *
 * MVP 단계에서는 mock 카운트만 사용. 실제 구현 시:
 * - GeoJSON으로 시군 / admin1 폴리곤 로드
 * - 사진 EXIF lat/lng → polygon 매칭으로 region id 결정
 * - 매칭 실패 시 reverse geocoding API fallback
 */

export const REGION_UNIT_DESCRIPTIONS = {
  domestic: {
    label: '시·군',
    fullLabel: '시·군 단위',
    description: '한국의 행정구역 시(市), 군(郡) 기준',
    totalEstimate: 250,
  },
  overseas: {
    label: '도·주',
    fullLabel: '도/주(Province/State) 단위',
    description: '해외의 1차 행정구역 (Province, State, Region 등)',
    totalEstimate: 1200,
  },
} as const;

export type RegionUnitType = keyof typeof REGION_UNIT_DESCRIPTIONS;
