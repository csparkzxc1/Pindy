# EXIF 기반 자동 여행 기록 (예정)

## 흐름
1. expo-media-library로 사진 라이브러리 권한 + 사진 fetch
2. 각 사진의 location metadata 추출 (lat/lng, taken_at)
3. lat/lng → 행정구역 polygon 매칭으로 region id 결정
   - 국내: 시·군 GeoJSON polygon (KOSIS/행안부 데이터)
   - 해외: GeoNames admin1 또는 Natural Earth admin-1 GeoJSON
   - 매칭 실패 시 reverse geocoding API fallback (Mapbox / Google)
4. taken_at 기준 시간 클러스터링 → 1박 이상 머문 묶음을 Trip으로 자동 생성
5. Trip 단위로 mockData 자리에 삽입

## 교체 지점
- `hooks/useMockTrips.ts` → `useTrips.ts`
- `parseExif.placeholder.ts` → `parseExif.ts`
- `mockData.ts`의 visitedSigungu/visitedProvinces → DB query

## GeoJSON 데이터 소스
- 한국 시군: KOSIS 통계지리정보, 행안부 도로명주소 데이터
- 해외 admin1: GeoNames (CC-BY 4.0), Natural Earth Data (Public Domain)
