import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        fluence: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8B5CF6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
        },
        whatsapp: {
          header: '#075E54',
          'header-light': '#128C7E',
          bg: '#ECE5DD',
          outbound: '#DCF8C6',
          'outbound-dark': '#c5e1a5',
          inbound: '#FFFFFF',
          teal: '#25D366',
        },
        agent: {
          dark: '#1F2937',
          darker: '#111827',
        },
        workspace: {
          sidebar: '#1F2937',
          'sidebar-hover': '#374151',
          conversation: '#F9FAFB',
          'conversation-dark': '#F3F4F6',
          contact: '#FFFFFF',
          'fluence-bg': '#FAF5FF',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'bounce-dot': 'bounceDot 1.4s infinite ease-in-out both',
        'gauge-fill': 'gaugeFill 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceDot: {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1)' },
        },
        gaugeFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--gauge-width)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
