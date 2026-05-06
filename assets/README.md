# Pindy 앱 어셋 — 적용 가이드 (v2)

새 아이콘 (둥근 모서리 없음, 더 깔끔)으로 다시 작업한 어셋 풀세트.

---

## 📦 다운로드 파일

| 파일 | 용도 | 사이즈 |
|---|---|---|
| `icon.png` | iOS 메인 아이콘 (App Store + 홈) | 1024×1024 |
| `adaptive-icon.png` | Android 적응형 (단순) | 1024×1024 |
| `adaptive-icon-foreground.png` | Android 적응형 — foreground (안전영역 적용) | 1024×1024 |
| `adaptive-icon-background.png` | Android 적응형 — background (흰색) | 1024×1024 |
| `splash.png` | 앱 스플래시 (정사각, 크림 배경) | 2048×2048 |
| `splash-iphone.png` | iPhone 전용 세로 스플래시 (대안) | 1242×2436 |
| `favicon.png` | Web 브라우저 탭 | 48×48 |
| `favicon.ico` | 레거시 브라우저 | 16/32/48 |
| `comparison-preview.png` | 미리보기 (참고용) | — |
| `splash-preview.png` | 스플래시 미리보기 (참고용) | — |

---

## 🚀 적용 — 3단계 (5분)

### Step 1: 파일 복사

PowerShell:

```powershell
cd C:\Users\admin\Desktop\Pindy
New-Item -ItemType Directory -Force -Path assets
```

다운받은 4개 파일을 `assets/` 폴더로 복사:
- `icon.png`
- `adaptive-icon.png`
- `splash.png`
- `favicon.png`

(나머지 파일은 선택 — 필요할 때 추가)

### Step 2: app.json 업데이트

```powershell
notepad app.json
```

기존 내용 모두 지우고 (Ctrl+A, Delete) 아래 통째로 붙여넣기:

```json
{
  "expo": {
    "name": "Pindy",
    "slug": "pindy",
    "version": "0.1.0",
    "orientation": "portrait",
    "scheme": "pindy",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#FAF7F2"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.csparkzxc.pindy",
      "infoPlist": {
        "ITSAppUsesNonExemptEncryption": false
      }
    },
    "android": {
      "package": "com.csparkzxc.pindy",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FAF7F2"
      }
    },
    "web": {
      "bundler": "metro",
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-router"
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "2096f317-2980-461d-b07a-b33c732c928b"
      }
    },
    "owner": "csparkzxc"
  }
}
```

저장 (Ctrl+S).

### Step 3: 커밋 + 빌드

```powershell
git add assets/icon.png assets/adaptive-icon.png assets/splash.png assets/favicon.png app.json
git commit -m "feat(brand): add app icon and splash screen"
git push

eas build --platform ios --profile preview
```

⏱ 20~30분 후 새 ipa로 폰 설치 → **새 아이콘 확인!**

---

## 🎨 디자인 컨셉

- **코랄 핀** — 위치/여행지 상징
- **수채화 스플래시** (코랄/민트/옐로우/핑크) — "여행은 색으로" 시각화
- **흰 배경** — 깔끔한 iOS 톤
- **둥근 모서리 없음** — iOS가 자동으로 마스킹 (이중 라운딩 방지)

---

## ✅ Apple 통과 체크리스트

업로드한 어셋이 모두 충족:

- ✅ `icon.png` 정확히 1024×1024
- ✅ RGB (RGBA 아님) — 투명도 없음
- ✅ 정사각형 가장자리까지 꽉 참
- ✅ 둥근 모서리 미리 적용 안 됨
- ✅ 텍스트 없음
- ✅ Apple 로고 / 다른 브랜드 미사용
- ✅ sRGB 색공간

---

## 🐛 자주 묻는 질문

### Q: 모서리가 둥글게 깎였어요?
A: 정상. iOS가 자동으로 모든 앱 아이콘을 둥글게 마스킹합니다. `comparison-preview.png` 보면 어떻게 보일지 미리 확인 가능.

### Q: TestFlight "Invalid icon" 에러
A: icon.png가 정확히 1024×1024, RGB, 투명 없음 확인. 위 어셋은 모두 통과.

### Q: 스플래시 너무 작거나 큼
A: `app.json`의 `splash.resizeMode`:
- `"contain"` (기본): 비율 유지하며 화면에 맞춤 (작아 보일 수 있음)
- `"cover"`: 화면 꽉 채움 (잘릴 수 있음)
- `"native"`: iOS 기본 동작

### Q: Android에서 아이콘 잘림
A: `adaptive-icon-foreground.png` 사용. 33% 안전 영역 적용된 버전.

---

## 🚀 다음 단계 (선택)

이 어셋으로 **TestFlight 베타 배포 가능**. 정식 출시 전 추가 작업:

1. **App Store 제출용 스크린샷** (6.7" iPhone, 1290×2796 6장)
2. **App Store 메타데이터** (한글/영문 제목, 부제, 설명, 키워드)
3. **마케팅 어셋** (Instagram 카드, 프레스킷, 출시 보도자료)
