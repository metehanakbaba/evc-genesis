/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './app/**/*.{js,ts,tsx}',
    './src/**/*.{js,ts,tsx}',
    // Include shared packages from monorepo
    '../../packages/shared/**/*.{js,ts,tsx}',
    '../../packages/ui/**/*.{js,ts,tsx}',
    '../../packages/design/**/*.{js,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
