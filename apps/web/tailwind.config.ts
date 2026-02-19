import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                bg: "#0A0A0B",
                surface: "#111113",
                "deep-space": "#0B0C15", // Premium Dark Background
                "neural-blue": "#3B82F6", // AI Highlight Blue
                "platinum": "#E2E8F0", // Premium Text
                "platinum-dim": "#94A3B8", // Muted Text
                primary: "#197FE6", // Stitch Primary Blue
                "primary-dim": "#0E56A0",
                secondary: "#4F46E5", // Complementary Indigo/Blue
                text: "#FFFFFF",
                muted: "#94A3B8",
                borderSoft: "rgba(25, 127, 230, 0.15)", // Primary blue transparent
                // Premium Accents
                gold: {
                    DEFAULT: '#F59E0B',
                    light: '#FCD34D',
                    dim: '#B45309',
                    glow: 'rgba(245, 158, 11, 0.5)'
                }
            },
            backgroundImage: {
                'brain-spark': 'linear-gradient(135deg, #197FE6 0%, #4F46E5 100%)',
                'gold-gradient': 'linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)',
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                mono: ["var(--font-jetbrains)", "monospace"]
            },
            boxShadow: {
                soft: "0 10px 30px rgba(0,0,0,0.4)",
                glow: "0 0 0 1px rgba(34,211,238,.25), 0 20px 40px rgba(34,211,238,.15)",
                'glow-gold': "0 0 0 1px rgba(212, 175, 55,.25), 0 20px 40px rgba(212, 175, 55,.15)"
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'blob': 'blob 7s infinite',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                }
            }
        },
    },
    plugins: [],
};

export default config;
