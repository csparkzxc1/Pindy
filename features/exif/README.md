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

## 현재 구현 상태 (post-MVP scaffolding)

| 단계 | 위치 | 상태 |
|------|------|------|
| EXIF 파싱 | `features/exif/parseExif.placeholder.ts` | 인터페이스 확정, I/O는 stub |
| 시간 클러스터링 | `features/trips/cluster.ts` | ✅ 알고리즘 완성 (`clusterByTime`, `keepOvernightClusters`) |
| 행정구역 매칭 | `features/map/geo.ts` | ✅ point-in-polygon + bbox + `findRegionForPoint` |
| 파이프라인 | `features/trips/buildTripsFromPhotos.ts` | ✅ EXIF → 클러스터 → 지역 결정 → DraftTrip[] |
| 상태 주입 | `stores/AppContext.tsx` `addTrip()` | ✅ |

## 교체 지점
- `features/exif/parseExif.placeholder.ts` → `parseExif.ts`:
  실제 EXIF 라이브러리로 GPS/타임스탬프 추출
- 호출자에서 `RegionPolygon[]`을 GeoJSON에서 로드해 `buildDraftTripsFromPhotos`에 주입
- `(tabs)/_layout.tsx`의 "+" 버튼 → `app/add-trip.tsx`의 "사진으로 자동 생성" 액션이
  `expo-media-library`로 사진을 받아 `buildDraftTripsFromPhotos`를 호출

## GeoJSON 데이터 소스
- 한국 시군: KOSIS 통계지리정보, 행안부 도로명주소 데이터
- 해외 admin1: GeoNames (CC-BY 4.0), Natural Earth Data (Public Domain)
