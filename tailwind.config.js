/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0d1624',
        'navy-mid': '#1a2640',
        'navy-light': '#243352',
        gold: '#c9a84c',
        'gold-light': '#e2c070',
        'gold-dim': 'rgba(201, 168, 76, 0.15)',
        white: '#f5f0e8',
        'white-dim': 'rgba(245, 240, 232, 0.6)',
        'white-faint': 'rgba(245, 240, 232, 0.08)',
        border: 'rgba(201, 168, 76, 0.2)',
        'border-faint': 'rgba(245, 240, 232, 0.06)',
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'sans-serif'],
        serif: ['var(--font-dm-serif)', 'serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      animation: {
        pulseGlow: 'pulseGlow 8s ease-in-out infinite alternate',
        scrollPulse: 'scrollPulse 2s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '0.8' },
          '100%': { transform: 'translate(-50%, -50%) scale(1.1)', opacity: '1' },
        },
        scrollPulse: {
          '0%, 100%': { opacity: '0.3', width: '40px' },
          '50%': { opacity: '1', width: '60px' },
        },
      },
    },
  },
  plugins: [],
}
