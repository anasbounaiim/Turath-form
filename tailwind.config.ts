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
        primary: '#3E5C50',
        earth: '#173F32',
        olive: '#2F6A57',
        sage: '#DFEEE4',
        beige: '#EEF7F0',
        cream: '#FFFFFF',
        gold: '#A38655',
        'soft-gold': '#D8C3A5',
        'dark-brown': '#173F32',
        brand: {
          primary: '#3E5C50',
          dark: '#173F32',
          leaf: '#2F6A57',
          sage: '#DFEEE4',
          muted: '#58756A',
          background: '#EEF7F0',
          soft: '#DFEEE4',
          mist: '#F7FBF8',
          taupe: '#D8C3A5',
          amber: '#A38655',
          'amber-dark': '#6F5732',
          text: '#173F32',
        },
      },
      fontFamily: {
        sans: ['var(--font-cairo)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cairo)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-cairo)', 'system-ui', 'sans-serif'],
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
