/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        // Cybernetic Luxury Color Palette
        'void': {
          'black': '#050505',
          'charcoal': '#121212',
          'dark': '#0a0a0a',
        },
        'imperial': {
          'gold': '#D4AF37',
          'light': '#E8C547',
          'dark': '#B8941F',
        },
        'cyber': {
          'silver': '#E0E0E0',
          'light': '#F5F5F5',
          'dark': '#B0B0B0',
        },
        // Legacy colors for backward compatibility
        'sentinel': {
          'dark': '#0a0e27',
          'blue': '#00d4ff',
          'purple': '#7c3aed',
          'green': '#10b981',
          'red': '#ef4444',
        },
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Courier New', 'monospace'],
        'sans': ['Inter', 'Rajdhani', 'system-ui', 'sans-serif'],
        'display': ['Rajdhani', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 6s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'scan': 'scan 3s linear infinite',
        'scan-fast': 'scan 1.5s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '0.6', filter: 'brightness(1)' },
          '50%': { opacity: '1', filter: 'brightness(1.2)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
