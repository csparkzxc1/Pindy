/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
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
      },
    },
  },
  plugins: [],
};
