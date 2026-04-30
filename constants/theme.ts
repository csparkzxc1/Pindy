export const colors = {
  bg: '#FAF7F2',
  bgAlt: '#FFFFFF',
  card: '#FFFFFF',
  text: '#1F2937',
  sub: '#6B7280',
  muted: '#9CA3AF',
  line: '#E5E7EB',
  lineSoft: '#F3F4F6',

  primary: '#FB7185',
  primaryDark: '#E11D48',
  primarySoft: '#FECDD3',
  primaryWash: '#FFF1F2',

  mint: '#34D399',
  mintDark: '#10B981',
  mintSoft: '#A7F3D0',
  mintWash: '#ECFDF5',

  yellow: '#FCD34D',
  yellowSoft: '#FEF3C7',
  yellowWash: '#FFFBEB',

  pink: '#F9A8D4',
  pinkSoft: '#FCE7F3',

  peach: '#FED7AA',

  region: [
    '#FB7185',
    '#34D399',
    '#FCD34D',
    '#F9A8D4',
    '#FED7AA',
    '#A78BFA',
  ] as const,

  regionEmpty: '#E5E7EB',
  regionEmptyDark: '#D1D5DB',
} as const;

export const radius = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  full: 9999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 48,
} as const;

export const typography = {
  display: { fontSize: 28, fontWeight: '700' as const, lineHeight: 36 },
  title: { fontSize: 22, fontWeight: '700' as const, lineHeight: 28 },
  h1: { fontSize: 18, fontWeight: '700' as const, lineHeight: 24 },
  h2: { fontSize: 16, fontWeight: '600' as const, lineHeight: 22 },
  body: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  bodyBold: { fontSize: 14, fontWeight: '600' as const, lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
  label: { fontSize: 13, fontWeight: '700' as const, lineHeight: 16, letterSpacing: 1 },
} as const;

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
  },
  floating: {
    shadowColor: '#FB7185',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
} as const;
