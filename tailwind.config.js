/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#0A0E17',
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
        },
        ice: {
          400: '#38BDF8',
          500: '#00E5FF',
          600: '#0284C7',
        },
        indigo: {
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
        },
        steel: {
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-slower': 'spin 40s linear infinite',
        'spin-reverse-slow': 'spin-reverse 30s linear infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'fade-up': 'fade-up 0.7s ease-out forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'ticker': 'ticker 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 4s ease-in-out infinite',
      },
      keyframes: {
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.85)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'shimmer': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(56, 189, 248, 0.6)' },
        },
        'ticker': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scan': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.3' },
          '50%': { transform: 'translateY(100%)', opacity: '0.8' },
        },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(56,189,248,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.05) 1px, transparent 1px)",
        'radial-glow': 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.15), transparent 70%)',
      },
      backgroundSize: {
        'grid-40': '40px 40px',
      },
    },
  },
  plugins: [],
};
