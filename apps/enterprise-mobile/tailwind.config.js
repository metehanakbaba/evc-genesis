/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './app/**/*.{js,ts,tsx}',
    './src/**/*.{js,ts,tsx}',
    './shared/**/*.{js,ts,tsx}',
    // Include shared packages from monorepo
    '../../packages/shared/**/*.{js,ts,tsx}',
    '../../packages/ui/**/*.{js,ts,tsx}',
    '../../packages/design/**/*.{js,ts,tsx}',
    // Include admin-web components for consistency
    '../admin-web/src/shared/**/*.{js,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Shared design tokens from admin-web
      colors: {
        'glass-blue': 'rgba(59, 130, 246, 0.1)',
        'glass-emerald': 'rgba(16, 185, 129, 0.1)',
        'glass-purple': 'rgba(139, 92, 246, 0.1)',
        'glass-teal': 'rgba(20, 184, 166, 0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
};
