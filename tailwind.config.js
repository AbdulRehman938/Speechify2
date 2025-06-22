/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        pulseBar: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(2)' },
        },
        slideOverlay: {
          '0%': { left: '0%' },
          '100%': { left: '100%' },
        },
      },
      animation: {
        pulseBar: 'pulseBar 2s linear infinite',
        wave: 'wave 1s infinite ease-in-out',
        'slide-overlay': 'slideOverlay 8s linear forwards',
      },
      clipPath: {
        // optional custom clip-path if needed
        'rounded-rect': 'inset(0 round 12px)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
