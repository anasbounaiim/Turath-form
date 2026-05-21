/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#234137',
        earth: '#183129',
        olive: '#315A4B',
        sage: '#6F8A72',
        beige: '#E7DDCF',
        cream: '#F7F2E8',
        gold: '#E6C684',
        'soft-gold': '#F0D9A3',
        'dark-brown': '#2B2019',
      },
      fontFamily: {
        sans: ['var(--font-josefin)', 'var(--font-cairo)', 'system-ui', 'sans-serif'],
        display: ['var(--font-josefin)', 'var(--font-cairo)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-cairo)', 'var(--font-josefin)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'card-slide-next': 'cardSlideNext 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
        'card-slide-previous': 'cardSlidePrevious 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
        'confetti': 'confetti 3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        cardSlideNext: {
          '0%': { opacity: '0', transform: 'translateX(42px) scale(0.96) rotate(2deg)' },
          '100%': { opacity: '1', transform: 'translateX(0) scale(1) rotate(0deg)' },
        },
        cardSlidePrevious: {
          '0%': { opacity: '0', transform: 'translateX(-42px) scale(0.96) rotate(-2deg)' },
          '100%': { opacity: '1', transform: 'translateX(0) scale(1) rotate(0deg)' },
        },
        confetti: {
          '0%': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0) rotate(0deg)',
          },
          '100%': {
            opacity: '0',
            transform: 'translate3d(var(--confetti-x), 105vh, 0) rotate(var(--confetti-rotate))',
          },
        },
      },
    },
  },
  plugins: [],
}
