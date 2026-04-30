import { Redirect } from 'expo-router';

// Placeholder route for the center "+" tab button. The button itself is
// rendered by `_layout.tsx` with `href: null`, so this screen should never
// actually mount; the redirect is a safety net.
export default function AddPlaceholder() {
  return <Redirect href="/(tabs)/map" />;
}
