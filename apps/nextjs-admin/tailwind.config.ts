import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // EV Charging brand colors - Complete design tokens
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        electric: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Custom semantic colors from web-admin
        surface: {
          primary: 'rgba(255, 255, 255, 0.05)',
          secondary: 'rgba(255, 255, 255, 0.1)',
          tertiary: 'rgba(255, 255, 255, 0.15)',
        },
        border: {
          primary: 'rgba(255, 255, 255, 0.15)',
          focus: 'rgba(255, 255, 255, 0.25)',
        }
      },
      // Enhanced spacing system for proper layout
      spacing: {
        '18': '4.5rem',   // 72px
        '72': '18rem',    // 288px
        '84': '21rem',    // 336px
        '96': '24rem',    // 384px
        '128': '32rem',   // 512px
        '144': '36rem',   // 576px
        '192': '48rem',   // 768px
        '256': '64rem',   // 1024px
      },
      // Professional layout containers
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      // Complete animation system
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'revolutionary-spin': 'revolutionary-spin 2s linear infinite',
        'revolutionary-float': 'revolutionaryFloat 3s ease-in-out infinite',
        'revolutionary-pulse': 'revolutionaryPulse 2s ease-in-out infinite',
        'slide-in-up': 'slideInUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          from: { boxShadow: '0 0 20px -10px rgba(34, 197, 94, 0.8)' },
          to: { boxShadow: '0 0 20px -10px rgba(34, 197, 94, 0.2)' },
        },
        'revolutionary-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        // Revolutionary animations from web-admin
        revolutionaryFloat: {
          '0%, 100%': { 
            transform: 'translateY(0px) scale(1)' 
          },
          '50%': { 
            transform: 'translateY(-10px) scale(1.05)' 
          },
        },
        revolutionaryPulse: {
          '0%, 100%': { 
            transform: 'scale(1)',
            opacity: '1' 
          },
          '50%': { 
            transform: 'scale(1.1)',
            opacity: '0.8' 
          },
        },
        slideInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          from: {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideIn: {
          from: {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      },
      // Enhanced typography
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      // Professional shadows
      boxShadow: {
        'glass': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'glow': '0 0 20px rgba(34, 197, 94, 0.3)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-teal': '0 0 20px rgba(20, 184, 166, 0.3)',
      },
      // Animation delays for staggered effects
      animationDelay: {
        '0': '0ms',
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
    },
  },
  plugins: [
    function({ addUtilities, addComponents }: { addUtilities: any; addComponents: any }) {
      // Glass morphism utilities
      const glassmorphismUtilities = {
        '.glass-card': {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        },
        '.glass-surface': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        },
        '.glass-header': {
          background: 'rgba(17, 24, 39, 0.8)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
        },
      };

      // Revolutionary loader and effects
      const revolutionaryUtilities = {
        '.revolutionary-loader': {
          background: 'conic-gradient(from 0deg, #22c55e, #3b82f6, #8b5cf6, #22c55e)',
          animation: 'revolutionary-spin 2s linear infinite',
        },
        '.revolutionary-glow': {
          filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.4))',
        },
        '.text-gradient': {
          background: 'linear-gradient(to right, #ffffff, #60a5fa, #34d399)',
          backgroundClip: 'text',
          color: 'transparent',
        },
      };

      // Animation delay utilities
      const animationDelayUtilities = {
        '.animation-delay-0': { animationDelay: '0ms' },
        '.animation-delay-100': { animationDelay: '100ms' },
        '.animation-delay-200': { animationDelay: '200ms' },
        '.animation-delay-300': { animationDelay: '300ms' },
        '.animation-delay-500': { animationDelay: '500ms' },
        '.animation-delay-700': { animationDelay: '700ms' },
        '.animation-delay-1000': { animationDelay: '1000ms' },
      };

      addUtilities({
        ...glassmorphismUtilities,
        ...revolutionaryUtilities,
        ...animationDelayUtilities,
      });
    }
  ],
};

export default config; 