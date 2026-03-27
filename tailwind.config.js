/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        navy:     { DEFAULT: '#1E3A5F', mid: '#2A4D7A', light: '#3B6FA0' },
        sky:      { DEFAULT: '#7AADCC', light: '#A8D4F0' },
        cream:    '#FAFAF8',
        ink:      { DEFAULT: '#1A1A2E', mid: '#2D2D2D', soft: '#555670' },
        muted:    '#8A8F9A',
        purple:   '#5A3D8A',
        teal:     '#0F8A7A',
        amber:    '#D4700A',
      },
      animation: {
        'float':         'float 4s ease-in-out infinite',
        'marquee':       'marquee 28s linear infinite',
        'dot-pulse':     'dotPulse 2s ease-in-out infinite',
        'blob-1':        'blobFloat1 12s ease-in-out infinite',
        'blob-2':        'blobFloat2 15s ease-in-out infinite',
        'blob-3':        'blobFloat3 18s ease-in-out infinite',
        'card-glow':     'cardGlow 4s ease-in-out infinite',
        'typing':        'typingBounce 1.2s ease-in-out infinite',
        'spin-slow':     'spin 0.8s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        dotPulse: {
          '0%,100%': { boxShadow: '0 0 0 3px rgba(34,197,94,0.25)' },
          '50%':     { boxShadow: '0 0 0 6px rgba(34,197,94,0.10)' },
        },
        blobFloat1: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(-40px,30px) scale(1.05)' },
          '66%':     { transform: 'translate(20px,-20px) scale(0.97)' },
        },
        blobFloat2: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '40%':     { transform: 'translate(30px,-40px) scale(1.08)' },
          '70%':     { transform: 'translate(-20px,20px) scale(0.95)' },
        },
        blobFloat3: {
          '0%,100%': { transform: 'translate(0,0)' },
          '50%':     { transform: 'translate(-30px,40px)' },
        },
        cardGlow: {
          '0%,100%': { opacity: '0.6' },
          '50%':     { opacity: '1' },
        },
        typingBounce: {
          '0%,100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%':     { transform: 'translateY(-4px)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-navy': 'linear-gradient(135deg, #2A4D7A 0%, #1E3A5F 100%)',
        'gradient-sky':  'linear-gradient(135deg, #7AADCC 0%, #3B6FA0 100%)',
      },
      boxShadow: {
        'glow-blue': '0 4px 24px rgba(59,111,160,0.3)',
        'glow-blue-lg': '0 8px 40px rgba(59,111,160,0.4)',
        'card': '0 4px 20px rgba(30,58,95,0.10)',
        'card-lg': '0 12px 40px rgba(30,58,95,0.14)',
        'card-xl': '0 24px 60px rgba(30,58,95,0.18)',
      },
    },
  },
  plugins: [],
}
