# Pindy

> 여행은 색으로, 추억은 지도 위에.

방문한 지역을 시·군 / 도·주 단위로 색칠하고, 사진 메타데이터로 여행을 자동 기록하는 라이프로그 앱.

## 기능

- 🗺 **세계 지도 위 색칠** — 국내는 시·군 단위(약 250개), 해외는 도·주 단위(약 1,200개)
- 📷 **사진 자동 기록** — EXIF 위치/시각 메타데이터로 여행을 자동 클러스터링
- 📅 **타임라인** — 월별 여행 카드 + 국내/해외 필터
- 📊 **통계** — 방문 진행률, 여행 스타일 레이더 차트
- 🎨 **콜라주** — 여행별 사진을 모아 공유 카드 생성 *(예정)*

> 현재 1차 MVP 단계로 지도/EXIF/서버 연동은 placeholder입니다. 데이터 모델과 인터페이스는 실 데이터 교체에 맞춰 설계되어 있습니다.

## 기술 스택

- **Expo SDK 52** + **React Native 0.76** + **TypeScript** (strict)
- **Expo Router** (file-based routing)
- **NativeWind v4** + **Tailwind**
- **react-native-svg**, **expo-linear-gradient**
- **React Context** 기반 상태 관리 (의존성 최소화 원칙)

## 시작하기

```bash
# 의존성 설치
npm install

# 타입 체크
npx tsc --noEmit

# 개발 서버
npx expo start
# i = iOS 시뮬레이터, a = Android 에뮬레이터
```

## 디자인 시스템

코랄 + 민트 + 따뜻한 크림 톤. 모든 색·간격·라운드·폰트는 `constants/theme.ts`에서만 가져옵니다.

| 토큰 | 값 | 용도 |
|------|-----|------|
| `colors.primary` | `#FB7185` | 코랄 — 메인 CTA, 핀, 강조 |
| `colors.mint` | `#34D399` | 민트 — 보조 액센트 |
| `colors.bg` | `#FAF7F2` | 따뜻한 크림 배경 |
| `colors.region[]` | 6색 팔레트 | 방문 지역 색칠 순환 |

## 프로젝트 구조

```
app/                  # 라우트 (expo-router file-based)
  (tabs)/             # 5탭 + 중앙 "+" 버튼
  trip/[id].tsx       # 여행 상세
  region/[id].tsx     # 지역 상세
  add-trip.tsx        # 새 여행 모달
  onboarding/         # 온보딩 3단계

components/
  ui/                 # Button, Card, Pill, ProgressBar, ...
  layout/             # Screen, Header
  brand/              # Wordmark, PinMark
  map/                # WorldMapPreview, RegionMapPreview, ...
  timeline/           # TripCard
  stats/              # RadarChart
  trip/               # PhotoGrid
  onboarding/         # 일러스트

stores/AppContext.tsx # 단일 React Context store
hooks/                # useTrips, useTrip
constants/
  theme.ts            # 디자인 토큰
  mockData.ts         # 단일 더미 데이터 출처
types/travel.ts       # Region, Trip, TravelStats 등
features/
  exif/               # EXIF 파싱 (placeholder)
  map/                # geo.ts, regionUnits.ts
  trips/              # cluster.ts, buildTripsFromPhotos.ts
lib/format.ts         # 포맷 유틸
```

## 색칠 단위 (핵심 규칙)

방문 기록 단위는 **국내는 시·군**, **해외는 도·주(Province/State)** 입니다. 도시 단위가 아니라 행정구역 폴리곤을 색칠합니다.

| 구분 | 단위 | 전체 카운트 (추정) | 데이터 소스 (예정) |
|------|------|-------------------|------------------|
| 국내 | 시·군 | ~250 | KOSIS, 행정안전부 |
| 해외 | 도·주 | ~1,200 | GeoNames admin1, ISO 3166-2 |

`features/map/regionUnits.ts`에서 정의됩니다.

## 데이터 흐름 (계획)

```
사진 갤러리
   ↓ (expo-media-library)
EXIF 추출 (lat/lng, takenAt)
   ↓ (features/exif/parseExif)
시간 클러스터링
   ↓ (features/trips/cluster)
행정구역 매칭 (point-in-polygon)
   ↓ (features/map/geo)
DraftTrip[] → AppContext.addTrip
```

`features/trips/buildTripsFromPhotos.ts`가 단일 진입점입니다. MVP는 polygon 데이터가 비어있어 region id 매칭이 빈 배열로 떨어지지만, GeoJSON만 주입하면 동일한 코드가 그대로 동작합니다.

## 로드맵

- [x] MVP 화면 8종 + 라우팅
- [x] 디자인 토큰 + 컴포넌트 시스템
- [x] React Context 상태 관리
- [x] 시간 클러스터링 + point-in-polygon 알고리즘
- [ ] 브랜드 이미지 어셋 (icon, splash, wordmark SVG)
- [ ] AsyncStorage 영속화
- [ ] `expo-media-library` 실연결
- [ ] GeoJSON 폴리곤 번들 (시군 + admin1)
- [ ] `react-native-maps` 또는 `maplibre` 도입
- [ ] 콜라주 생성 + 공유

## 라이선스

Private.
