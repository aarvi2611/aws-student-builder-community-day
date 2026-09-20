/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05070A",
        surface: {
          DEFAULT: "#0B1118",
          light: "#111923",
          lighter: "#182332",
        },
        aws: {
          orange: "#FF9900",
          orangeHover: "#FFAC33",
          orangeDark: "#D97706",
          blue: "#146EB4",
          blueHover: "#1E88E5",
          brightBlue: "#38BDF8",
          dark: "#05070A",
        },
        primary: "#F8FAFC",
        muted: "#94A3B8",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'dash': 'dash 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'blur(20px)' },
          '100%': { opacity: '0.8', filter: 'blur(30px)' },
        },
        dash: {
          to: { strokeDashoffset: '1000' },
        }
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
        'radial-glow': "radial-gradient(circle at 50% 50%, rgba(20, 110, 180, 0.15) 0%, rgba(5, 7, 10, 0) 70%)",
        'orange-glow': "radial-gradient(circle at 50% 50%, rgba(255, 153, 0, 0.15) 0%, rgba(5, 7, 10, 0) 70%)",
      },
    },
  },
  plugins: [],
}
