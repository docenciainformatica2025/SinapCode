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
                bg: "#0B0B0F",
                "bg-surface": "#16161A",
                "bg-hover": "#1C1C20",
                separator: "#2C2C2E",
                "deep-space": "#0B0C15",
                "neural-blue": "#0A84FF", // Apple Blue
                "platinum": "#FFFFFF", // text-primary
                "platinum-dim": "#EBEBF599", // text-tertiary
                primary: "#0A84FF", // Apple Blue
                "primary-dim": "#0060DF", // Apple Active
                secondary: "#4F46E5",
                // Apple 2026 Pastel Palette
                "apple-pink": "#FFCCE7",
                "apple-mint": "#CCF6E3",
                "apple-blue": "#C8E8FF",
                "apple-lemon": "#FFF8C8",
                "apple-lavender": "#E7DAF9",
                text: "#FFFFFF",
                muted: "#EBEBF599",
                borderSoft: "rgba(10, 132, 255, 0.15)", // Apple blue transparent
                // Premium Accents
                gold: {
                    DEFAULT: '#F59E0B',
                    light: '#FCD34D',
                    dim: '#B45309',
                    glow: 'rgba(245, 158, 11, 0.5)'
                }
            },
            backgroundImage: {
                'brain-spark': 'linear-gradient(135deg, #0A84FF 0%, #4F46E5 100%)',
                'gold-gradient': 'linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)',
            },
            fontFamily: {
                sans: [
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "SF Pro Text",
                    "SF Pro Display",
                    "system-ui",
                    "sans-serif"
                ],
                mono: ["var(--font-jetbrains)", "monospace"]
            },
            boxShadow: {
                soft: "0 10px 30px rgba(0,0,0,0.4)",
                glow: "0 0 0 3px rgba(10, 132, 255, 0.35)", // Apple Focus Ring
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
