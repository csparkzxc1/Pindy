# Brand Assets

The user-supplied watercolor pin icon goes here. `app.json` references three
PNGs at the project's `./assets/` root (one level above this folder).

## Required files (place at `/Pindy/assets/`)

| Path | Size | Purpose |
|------|------|---------|
| `assets/icon.png` | 1024×1024 PNG | iOS app icon, web favicon |
| `assets/adaptive-icon.png` | 1024×1024 PNG (foreground only, transparent bg, ~20% safe padding) | Android adaptive icon |
| `assets/splash.png` | 1242×2436+ PNG (or 1024×1024 with `resizeMode: contain`) | Splash screen |

For the watercolor pin icon, the simplest path is to drop the same artwork
into all three slots — Expo will scale it. iOS rounds the corners
automatically; Android adaptive icon needs ~20% padding around the pin so it
isn't clipped on circular masks.

## After dropping the files

```powershell
git add assets/icon.png assets/adaptive-icon.png assets/splash.png
git commit -m "Add Pindy app icon (watercolor coral pin)"
git push origin claude/pindy-mvp-implementation-iaGeN
```

## Optional further assets

| Path | Purpose |
|------|---------|
| `assets/brand/wordmark.svg` | Hand-lettered "Pindy" wordmark (currently a text fallback in `components/brand/Wordmark.tsx`) |
| `assets/brand/wordmark-mono.svg` | Mono variant for dark backgrounds |
| `assets/brand/pin-mark.svg` | Simplified pin used in UI (currently inline SVG in `components/brand/PinMark.tsx`) |

These are nice-to-have. The app already renders text/SVG fallbacks for them.
