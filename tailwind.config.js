/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#fafafa',
          elevated: '#ffffff',
        },
        ink: {
          DEFAULT: '#171717',
          body: '#4d4d4d',
          mute: '#8f8f8f',
          faint: '#a1a1a1',
        },
        hairline: {
          DEFAULT: '#ebebeb',
          soft: '#f2f2f2',
        },
        geist: {
          blue: '#0070f3',
          cyan: '#50e3c2',
          purple: '#7928ca',
          pink: '#ff0080',
          amber: '#f5a623',
          red: '#ee0000',
        },
        sebi: {
          navy: '#0b192c',
          blue: '#1e3e62',
          light: '#000000',
          accent: '#ff6500'
        },
        shield: {
          crimson: '#dc2626',
          amber: '#d97706',
          emerald: '#059669',
          slate: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['Geist', 'Plus Jakarta Sans', 'Noto Sans Devanagari', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'geist-subtle': '0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.02)',
        'geist-card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 8px 24px -4px rgba(0, 0, 0, 0.04)',
        'geist-hover': '0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '12px',
        'lg': '16px',
        'pill': '100px',
      }
    },
  },
  plugins: [],
}
