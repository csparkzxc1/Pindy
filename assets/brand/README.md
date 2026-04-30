# Brand Assets

Drop the following files here when ready (managed in a separate package):

```
icon.png                # 1024×1024, app icon (watercolor + coral pin)
icon-foreground.png     # Android adaptive (foreground only)
splash.png              # Splash screen
wordmark.svg            # "Pindy" wordmark (coral hand-letter, P with small heart)
wordmark-mono.svg       # Mono variant
pin-mark.svg            # Simplified pin used in UI (NOT the watercolor version)
```

Until the real assets land, the app uses:
- A text fallback Wordmark (`components/brand/Wordmark.tsx`).
- An inline SVG pin (`components/brand/PinMark.tsx`).
- Default Expo icon/splash via app.json (no custom icon paths).

Once assets arrive, point `app.json` `icon` / `splash.image` /
`android.adaptiveIcon.foregroundImage` to the new files and replace the
`Wordmark` component with the SVG version.
