# Pindy Badge Specification

> 23개 배지의 수집 기준, 임계값, 측정 데이터를 정리한 문서.
> 코드 진실성: `constants/mockBadges.ts` + `features/badges/computeProgress.ts`.
>
> 모든 배지는 `Trip` / `TravelStyle` 데이터로 자동 측정 가능합니다.
> 추가 인프라(EXIF 시각, 사진 분류 ML, POI 카테고리, UNESCO 데이터,
> 인구 통계, 공휴일 캘린더 등)가 필요한 배지는 v4 단계에서 제거되었습니다.

---

## 1. 레벨 시스템

- **레벨 범위**: `0` (잠금) ~ `5` (최고)
- 잠금 해제 = `level >= 1`
- 레벨은 `progress`가 `thresholds[i]`를 넘을 때마다 자동으로 `i + 1`로 갱신 (최대 5)
- `level 0 → 1` 진입 시 `unlockedAt`에 ISO 날짜(YYYY-MM-DD) 자동 기록
- 코드: `stores/AppContext.tsx` `recomputeLevel`

```ts
let level = 0;
for (let i = 0; i < thresholds.length; i++) {
  if (progress >= thresholds[i]) level = Math.min(5, i + 1);
}
```

---

## 2. 자동 산출

`AppContext`가 `trips`(또는 `travelStyle`)이 변경될 때마다
`computeAbsoluteProgress(trips, travelStyle)`을 호출해서 23개 배지의
**progress를 절대값으로 다시 계산**합니다. Idempotent — 같은 입력 → 같은 결과.
trip을 삭제하면 progress도 자동으로 줄어듭니다.

```ts
useEffect(() => {
  const abs = computeAbsoluteProgress(trips, travelStyle);
  setBadges(prev => prev.map(b =>
    abs[b.id] === undefined ? b : recomputeLevel(b, abs[b.id]!)
  ));
}, [trips]);
```

---

## 3. 카테고리 분포

| 카테고리 | 개수 |
|---------|-----|
| `collection` | 5 |
| `photo` | 2 |
| `frequency` | 11 |
| `special` | 5 |
| **합계** | **23** |

---

## 4. Collection (5개)

| ID | 이름 | 🪪 | 설명 | thresholds | 측정 |
|----|------|----|------|-----------|------|
| `city-collector` | 도시 수집가 | 🏙 | 누적 방문 도시 수 | `[3, 8, 15, 25, 50, 100]` | `Σ trip.cityCount` |
| `explorer` | 탐험가 | 🧭 | 방문한 국가 수 | `[3, 5, 10, 20, 50]` | overseas trip의 country prefix unique 수 |
| `country-hunter` | 국가 헌터 | 🌐 | 국경 넘은 횟수 | `[3, 10, 25, 50, 100]` | overseas trip 개수 |
| `korea-master` | 코리아 마스터 | 🇰🇷 | 한국 시·군 수집 | `[3, 10, 30, 80, 226]` | domestic trip의 시군 ID unique 수 |
| `border-crosser` | 국경 넘는 자 | 🛂 | 한 trip에서 2국가+ | `[1, 3, 5, 10]` | 한 trip에 country ≥ 2개인 trip 수 |

---

## 5. Photo (2개)

| ID | 이름 | 🪪 | 설명 | thresholds | 측정 |
|----|------|----|------|-----------|------|
| `photographer` | 사진가 | 📸 | 누적 사진 수 | `[50, 100, 250, 500, 1000]` | `Σ trip.photoCount` |
| `memory-keeper` | 추억 보관자 | 📁 | 누적 사진 (장기 마일스톤) | `[100, 500, 1000, 3000, 10000]` | 동일 |

---

## 6. Frequency (11개)

| ID | 이름 | 🪪 | 설명 | thresholds | 측정 |
|----|------|----|------|-----------|------|
| `weekend-traveler` | 주말여행자 | 🎒 | 금/토 시작 + 3일 이내 | `[5, 10, 20, 40]` | `startDate` 요일 + days |
| `monthly-traveler` | 월간 여행자 | 📅 | 여행한 월 수 (YYYY-MM unique) | `[3, 6, 12, 24]` | unique YYYY-MM 수 |
| `spring-traveler` | 봄의 여행자 | 🌸 | 3–5월 시작 trip | `[1, 3, 5, 10]` | 시작 월 분기 카운트 |
| `summer-traveler` | 여름의 여행자 | 🏖 | 6–8월 시작 trip | `[1, 3, 5, 10]` | 동일 |
| `autumn-traveler` | 가을의 여행자 | 🍁 | 9–11월 시작 trip | `[1, 3, 5, 10]` | 동일 |
| `winter-traveler` | 겨울의 여행자 | ❄ | 12–2월 시작 trip | `[1, 3, 5, 10]` | 동일 |
| `weekday-warrior` | 평일 전사 | 💼 | 월–목 시작 trip | `[5, 15, 30, 60]` | `startDate` 요일 1..4 |
| `long-trip` | 장거리 여행자 | ✈ | 7일 이상 trip | `[1, 3, 5, 10]` | days ≥ 7 |
| `quick-getaway` | 짧은 휴식 | ⏱ | 1박 2일 trip | `[1, 5, 15, 30]` | days ≤ 2 |
| `consecutive-month` | 연속 여행자 | 🔥 | 연속 월 streak 최댓값 | `[3, 6, 12]` | YYYY-MM 정렬 후 streak 계산 |
| `four-seasons` | 사계절 | 🌈 | 한 region 사계절 방문 | `[1, 3, 5]` | regionId × season cross-product |

---

## 7. Special (5개)

| ID | 이름 | 🪪 | 설명 | thresholds | 측정 |
|----|------|----|------|-----------|------|
| `foodie` | 미식가 | 🍜 | 미식 여행 스타일 점수 | `[10, 25, 50, 100]` | `Math.round(travelStyle.미식 × 100)` |
| `solo-explorer` | 솔로 탐험가 | 🥾 | 혼자 떠난 여행 | `[1, 3, 5, 10]` | `members.length === 1` trip 수 |
| `couple-getaway` | 커플 여행자 | 💑 | 둘이서 떠난 여행 | `[1, 3, 5, 10]` | `members.length === 2` trip 수 |
| `first-trip` | 첫 여행 | ⭐ | 여행의 시작 | `[1]` | `trips.length ≥ 1` |
| `milestone-100` | 100번째 여행 | 💯 | 여행 100회 마일스톤 | `[10, 25, 50, 100]` | `trips.length` |

---

## 8. 화면 표시

### 프로필 (`app/(tabs)/profile.tsx`)
- 잠금 해제(`level >= 1`) 배지 중 **앞쪽 3개** 미리보기
- "모두 보기" → `/badges`

### 배지 화면 (`app/badges.tsx`)
- 4개 카테고리 섹션 (수집 / 사진 / 여행 빈도 / 특별)
- 각 섹션은 가로 스크롤
- 카드 탭 → RN `Modal` 하단 시트로 진행률 + 잠금 해제일 표시

### BadgeCard 컴포넌트 (`components/badges/BadgeCard.tsx`)
- size: `sm` (56) / `md` (80) / `lg` (96)
- 잠금 상태: 회색 배경 + 🔒 아이콘
- 잠금 해제: 컬러 배경 + 이모지 + 우하단 `Lv.N` 라벨

---

## 9. 새 배지 추가 가이드

새 배지를 추가하려면 **자동 측정 가능해야** 합니다. 추가 데이터(EXIF 시각,
사진 분류 등)가 필요한 배지는 그 데이터가 trip 모델에 들어온 다음 추가합니다.

1. **`types/badge.ts`** — `BadgeId` union에 추가
2. **`constants/mockBadges.ts`** — 새 객체 추가:
   - `category`, `icon`, `color` (theme 토큰만)
   - `thresholds` 권장 5단계
   - 초기 `level: 0`, `progress: 0`
3. **`features/badges/computeProgress.ts`** —
   `computeAbsoluteProgress` 분기 추가 (필수). `deltasFromTrip`도 옵션
4. **`BADGES.md`** — 4–7절 표에 행 추가
5. `npx tsc --noEmit` 통과 확인

### 변경 시 주의
- `BadgeId` 변경은 union이므로 컴파일러가 누락된 곳 알려줍니다
- `thresholds.length`는 자유 (1–5단계 권장). `level`은 5로 자동 cap
- `color`는 `constants/theme.ts` 토큰 또는 region 팔레트만 사용

---

## 10. 변경 이력 (v4)

- 50개 → **23개**로 정리
- 추가 인프라(EXIF 시각, 사진 분류 ML, POI, UNESCO, 인구 통계, 공휴일 캘린더,
  지형 메타, 화이트리스트, 멤버 역할 태그)가 필요한 27개 제거
- 남은 23개 모두 현재 `Trip` / `TravelStyle` 데이터만으로 자동 측정 가능
