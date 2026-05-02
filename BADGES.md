# Pindy Badge Specification

> 50개 배지의 수집 기준, 임계값, 측정 데이터를 정리한 문서.
> 코드 진실성: `constants/mockBadges.ts` + `features/badges/computeProgress.ts`.

---

## 1. 레벨 시스템

- **레벨 범위**: `0` (잠금) ~ `5` (최고)
- 잠금 해제 = `level >= 1`
- 레벨은 `progress`가 `thresholds[i]`를 넘을 때마다 자동으로 `i + 1`로 갱신 (최대 5)
- `level 0 → 1` 진입 시 `unlockedAt`에 ISO 날짜(YYYY-MM-DD) 자동 기록
- 코드: `stores/AppContext.tsx` `updateBadgeProgress(id, delta)`

```ts
// 레벨 계산 (단순화)
let level = 0
for (let i = 0; i < thresholds.length; i++) {
  if (progress >= thresholds[i]) level = Math.min(5, i + 1)
}
```

---

## 2. 카테고리

| 카테고리 | 설명 | 개수 |
|---------|-----|-----|
| `collection` | 지역·장소·국가·대륙 수집 | 18 |
| `photo` | 사진 매수·시간대·주제 | 8 |
| `frequency` | 여행 빈도·시즌·기간 | 12 |
| `special` | 테마·마일스톤·동행자 | 12 |
| **합계** | | **50** |

---

## 3. 측정 가능성 표기

| 표기 | 의미 |
|-----|-----|
| ✅ | `features/badges/computeProgress.ts`에서 `addTrip` 시 자동 dispatch |
| 🟡 | 현재 데이터(Trip / Region / TravelStyle)로 측정 가능하나 아직 dispatch 미연결 |
| 🔴 | 추가 인프라 필요 (EXIF 시각, 사진 ML 분류, POI 카테고리, UNESCO 데이터, 인구 통계, 공휴일 캘린더 등) |

---

## 4. Collection (18개)

| ID | 이름 | 🪪 | 설명 | thresholds | 측정 데이터 | 자동 |
|----|------|----|------|-----------|------------|------|
| `city-collector` | 도시 수집가 | 🏙 | 누적 방문 도시 수 | `[3, 8, 15, 25, 50, 100]` | `trip.cityCount` 합산 | ✅ |
| `explorer` | 탐험가 | 🧭 | 방문한 국가 수 | `[3, 5, 10, 20, 50]` | overseas trip의 country 집합 | 🟡 |
| `country-hunter` | 국가 헌터 | 🌐 | 국경 넘은 횟수 | `[3, 10, 25, 50, 100]` | overseas trip 1회당 +1 | ✅ |
| `continent-walker` | 대륙 워커 | 🌍 | 방문 대륙 수 | `[2, 5, 7]` | region → 대륙 매핑 필요 | 🔴 |
| `korea-master` | 코리아 마스터 | 🇰🇷 | 방문한 한국 시·군 | `[3, 10, 30, 80, 226]` | domestic trip의 `regionIds` 합집합 | ✅ |
| `asia-explorer` | 아시아 탐험가 | 🏯 | 아시아 도·주 | `[2, 5, 10, 20, 40]` | region → 대륙 매핑 | 🔴 |
| `europe-explorer` | 유럽 탐험가 | 🏰 | 유럽 도·주 | `[2, 5, 10, 25, 50]` | 동일 | 🔴 |
| `americas-explorer` | 아메리카 탐험가 | 🗽 | 아메리카 도·주 | `[2, 5, 10, 25, 50]` | 동일 | 🔴 |
| `africa-explorer` | 아프리카 탐험가 | 🦁 | 아프리카 도·주 | `[1, 3, 5, 10]` | 동일 | 🔴 |
| `oceania-explorer` | 오세아니아 탐험가 | 🐨 | 오세아니아 도·주 | `[1, 3, 5, 8]` | 동일 | 🔴 |
| `island-hopper` | 섬 호퍼 | 🏝 | 섬 지역 방문 | `[1, 5, 10, 20]` | region 메타 (`isIsland`) | 🔴 |
| `coastal-traveler` | 해안 여행자 | 🌊 | 해안 도시 방문 | `[2, 5, 10, 20]` | region 메타 (`isCoastal`) | 🔴 |
| `mountain-climber` | 산악인 | ⛰ | 산악 지역 방문 | `[3, 10, 25, 50]` | region 메타 (`isMountain`) | 🔴 |
| `capital-collector` | 수도 수집가 | 🏛 | 각국 수도 방문 | `[2, 5, 10, 20, 50]` | 수도 화이트리스트 | 🔴 |
| `unesco-seeker` | 유네스코 헌터 | 🛕 | UNESCO 세계유산 | `[3, 10, 25, 50, 100]` | UNESCO 데이터셋 | 🔴 |
| `small-town-lover` | 소도시 애호가 | 🏘 | 인구 ≤10만 군 방문 | `[1, 5, 15, 30]` | 인구 통계 | 🔴 |
| `metropolis-fan` | 메트로폴리스 팬 | 🌆 | 인구 100만+ 도시 | `[1, 5, 10, 25]` | 인구 통계 | 🔴 |
| `border-crosser` | 국경 넘는 자 | 🛂 | 한 trip에서 2국가+ | `[1, 3, 5, 10]` | overseas trip의 unique country 수 | 🟡 |

---

## 5. Photo (8개)

| ID | 이름 | 🪪 | 설명 | thresholds | 측정 데이터 | 자동 |
|----|------|----|------|-----------|------------|------|
| `photographer` | 사진가 | 📸 | 누적 사진 수 | `[50, 100, 250, 500, 1000]` | `trip.photoCount` 합산 | ✅ |
| `golden-hour` | 골든 아워 | 🌇 | 16:00–18:00 사진 | `[5, 30, 100, 300]` | EXIF DateTimeOriginal | 🔴 |
| `blue-hour` | 블루 아워 | 🌌 | 04:00–06:00 사진 | `[5, 20, 60, 150]` | EXIF DateTimeOriginal | 🔴 |
| `portrait-pro` | 인물 사진가 | 🤳 | 인물 사진 | `[10, 50, 150, 400]` | 사진 분류 ML 또는 사용자 태그 | 🔴 |
| `landscape-master` | 풍경 마스터 | 🏞 | 풍경 사진 | `[20, 100, 300, 700]` | 사진 분류 | 🔴 |
| `food-blogger` | 푸드 블로거 | 🍽 | 음식 사진 | `[15, 50, 150, 400]` | 사진 분류 | 🔴 |
| `street-shooter` | 스트릿 슈터 | 🚶 | 거리 사진 | `[20, 100, 300, 700]` | 사진 분류 | 🔴 |
| `memory-keeper` | 추억 보관자 | 📁 | 누적 사진 (장기 마일스톤) | `[100, 500, 1000, 3000, 10000]` | `trip.photoCount` 합산 | ✅ |

---

## 6. Frequency (12개)

| ID | 이름 | 🪪 | 설명 | thresholds | 측정 데이터 | 자동 |
|----|------|----|------|-----------|------------|------|
| `weekend-traveler` | 주말여행자 | 🎒 | 금/토 시작 + 3일 이내 | `[5, 10, 20, 40]` | `startDate` 요일 + days | ✅ |
| `monthly-traveler` | 월간 여행자 | 📅 | 매달 1회 이상 (개월 수) | `[3, 6, 12, 24]` | 월별 trip 카운트 | 🟡 |
| `spring-traveler` | 봄의 여행자 | 🌸 | 3–5월 시작 trip | `[1, 3, 5, 10]` | `startDate.getMonth()` | ✅ |
| `summer-traveler` | 여름의 여행자 | 🏖 | 6–8월 시작 trip | `[1, 3, 5, 10]` | 동일 | ✅ |
| `autumn-traveler` | 가을의 여행자 | 🍁 | 9–11월 시작 trip | `[1, 3, 5, 10]` | 동일 | ✅ |
| `winter-traveler` | 겨울의 여행자 | ❄ | 12–2월 시작 trip | `[1, 3, 5, 10]` | 동일 | ✅ |
| `weekday-warrior` | 평일 전사 | 💼 | 월–목 시작 trip | `[5, 15, 30, 60]` | `startDate` 요일 | 🟡 |
| `holiday-hunter` | 공휴일 헌터 | 🎌 | 공휴일과 겹침 | `[5, 15, 30]` | 공휴일 캘린더 | 🔴 |
| `long-trip` | 장거리 여행자 | ✈ | 7일 이상 trip | `[1, 3, 5, 10]` | `endDate - startDate` | ✅ |
| `quick-getaway` | 짧은 휴식 | ⏱ | 1박 2일 trip | `[1, 5, 15, 30]` | 동일 | ✅ |
| `consecutive-month` | 연속 여행자 | 🔥 | 연속 달 streak | `[3, 6, 12]` | trips의 시작 월 streak 계산 | 🟡 |
| `four-seasons` | 사계절 | 🌈 | 한 도시 사계절 방문 | `[1, 3, 5]` | regionId × 계절 cross | 🟡 |

---

## 7. Special (12개)

| ID | 이름 | 🪪 | 설명 | thresholds | 측정 데이터 | 자동 |
|----|------|----|------|-----------|------------|------|
| `early-bird` | 얼리버드 | 🌅 | 06:00 이전 사진 | `[5, 15, 30, 60, 100]` | EXIF DateTimeOriginal | 🔴 |
| `foodie` | 미식가 | 🍜 | `travelStyle.미식` 점수 | `[10, 25, 50, 100]` | TravelStyle 누적 | 🟡 |
| `night-owl` | 야행성 | 🌙 | 자정–04:00 사진 | `[5, 20, 50, 100]` | EXIF DateTimeOriginal | 🔴 |
| `coffee-lover` | 커피 애호가 | ☕ | 카페 방문 기록 | `[5, 20, 50, 100]` | POI 카테고리 | 🔴 |
| `dessert-hunter` | 디저트 헌터 | 🍰 | 디저트 POI/사진 | `[5, 20, 50, 100]` | POI 또는 사진 분류 | 🔴 |
| `wine-traveler` | 와인 여행자 | 🍷 | 와인 산지 방문 | `[1, 3, 5, 10]` | 와인 산지 화이트리스트 | 🔴 |
| `festival-goer` | 축제 참여자 | 🎉 | 축제 기간 trip | `[1, 3, 5, 10]` | 축제 캘린더 | 🔴 |
| `solo-explorer` | 솔로 탐험가 | 🥾 | `members.length === 1` | `[1, 3, 5, 10]` | `trip.members` | 🟡 |
| `family-tripper` | 가족 여행자 | 👨‍👩‍👧 | 가족 태그 멤버 포함 | `[1, 3, 5, 10]` | `trip.members` 메타 (역할 태그) | 🔴 |
| `couple-getaway` | 커플 여행자 | 💑 | `members.length === 2` | `[1, 3, 5, 10]` | `trip.members` | 🟡 |
| `first-trip` | 첫 여행 | ⭐ | 첫 trip 마일스톤 | `[1]` | `trips.length === 1` | 🟡 |
| `milestone-100` | 100번째 여행 | 💯 | 누적 trip 마일스톤 | `[10, 25, 50, 100]` | `trips.length` | 🟡 |

---

## 8. 자동화 요약

| 측정 | 개수 | 비중 |
|------|------|------|
| ✅ 현재 자동 dispatch | **13** | 26% |
| 🟡 데이터 있음, dispatch 미연결 | **10** | 20% |
| 🔴 추가 인프라 필요 | **27** | 54% |

### 즉시 자동화 가능한 10개 (🟡)
다음 데이터로 측정 가능 — `addTrip` 또는 별도 effect에서 dispatch만 추가하면 됩니다:

1. `explorer` — `new Set(overseas trip의 country)` 크기
2. `border-crosser` — overseas trip의 unique country 수가 ≥ 2일 때 +1
3. `monthly-traveler` — 시작 월별 trip 카운트로 갱신
4. `weekday-warrior` — `startDate` 요일이 월–목이면 +1
5. `consecutive-month` — `trips`를 시작 월로 정렬해 streak 계산
6. `four-seasons` — `Map<regionId, Set<season>>` 채워서 4개 다 모인 region 수
7. `foodie` — `travelStyle.미식 * 100`
8. `solo-explorer` — `trip.members.length === 1` 1회당 +1
9. `couple-getaway` — `trip.members.length === 2` 1회당 +1
10. `first-trip` / `milestone-100` — `trips.length`가 1/10/25/50/100 도달 시 trigger

### 추가 인프라 필요한 27개 (🔴)
| 인프라 | 영향 받는 배지 |
|--------|---------------|
| EXIF 촬영 시각 | golden-hour, blue-hour, early-bird, night-owl |
| 대륙 매핑 (`region.id → continent`) | continent-walker, asia/europe/americas/africa/oceania-explorer |
| 사진 분류 (ML 또는 태그) | portrait-pro, landscape-master, food-blogger, street-shooter |
| 지형 메타 (`isIsland/isCoastal/isMountain`) | island-hopper, coastal-traveler, mountain-climber |
| POI 카테고리 | coffee-lover, dessert-hunter |
| 캘린더 데이터 | holiday-hunter, festival-goer |
| 화이트리스트 | capital-collector, wine-traveler |
| UNESCO 데이터셋 | unesco-seeker |
| 인구 통계 | small-town-lover, metropolis-fan |
| 멤버 역할 태그 | family-tripper |

---

## 9. 화면 표시

### 프로필 (`app/(tabs)/profile.tsx`)
- 잠금 해제(`level >= 1`) 배지 중 **앞쪽 3개** 미리보기
- "모두 보기" → `/badges`

### 배지 화면 (`app/badges.tsx`)
- 4개 카테고리 섹션 (수집/사진/여행 빈도/특별)
- 각 섹션은 가로 스크롤
- 카드 탭 → RN `Modal` 하단 시트로 진행률 + 잠금 해제일 표시

### BadgeCard 컴포넌트 (`components/badges/BadgeCard.tsx`)
- size: `sm` (56) / `md` (80) / `lg` (96)
- 잠금 상태: 회색 배경 + 🔒 아이콘
- 잠금 해제: 컬러 배경 + 이모지 + 우하단 `Lv.N` 라벨

---

## 10. 새 배지 추가 가이드

1. **`types/badge.ts`** — `BadgeId` union에 추가
2. **`constants/mockBadges.ts`** — 새 객체 추가:
   - `category`, `icon`, `color` (theme 토큰만)
   - `thresholds` 5단계 권장
   - 초기 `level: 0`, `progress: 0`
3. **`features/badges/computeProgress.ts`** — 자동 측정이라면 `deltasFromTrip`에 분기 추가
4. **`BADGES.md`** — 표에 행 추가
5. `npx tsc --noEmit` 통과 확인

### 변경 시 주의
- `BadgeId` 변경은 union이므로 컴파일러가 누락된 곳 알려줍니다
- `thresholds.length`는 자유 (1~5단계 권장). `level`은 5로 자동 cap
- `color`는 `constants/theme.ts` 토큰 또는 region 팔레트만 사용
