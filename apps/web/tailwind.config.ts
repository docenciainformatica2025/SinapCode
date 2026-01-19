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
                bg: "#0B0F14",
                surface: "#111827",
                surfaceSoft: "#0F172A",
                primary: "#22D3EE",
                secondary: "#A78BFA",
                text: "#E5E7EB",
                muted: "#9CA3AF",
                borderSoft: "rgba(34, 211, 238, 0.15)",
                // Architectural aliases for backward compatibility or semantic use
                'deep-space': '#0B0F14',
                'neural-blue': '#22D3EE',
                'accent-gold': '#A78BFA', // Remapped to secondary for now
                'platinum': '#E5E7EB', // Mapped to text
                'platinum-dim': '#9CA3AF', // Mapped to muted
                'cyber-platinum': '#9CA3AF', // Mapped to muted
                'synapse-purple': '#A78BFA', // Mapped to secondary
                'brain-spark': 'linear-gradient(135deg, #22D3EE 0%, #A78BFA 100%)', // Updated gradient using new primary/secondary
                // Premium Gold Accents (Subtle & Professional)
                gold: {
                    DEFAULT: '#D4AF37', // Metalllic Gold
                    light: '#F3E5AB',   // Champagne
                    dim: '#8A795D',     // Bronze/Dark Gold
                    glow: 'rgba(212, 175, 55, 0.5)'
                }
            },
            backgroundImage: {
                'brain-spark': 'linear-gradient(135deg, #22D3EE 0%, #A78BFA 100%)',
                'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F3E5AB 100%)',
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                mono: ["var(--font-jetbrains)", "monospace"]
            },
            boxShadow: {
                soft: "0 10px 30px rgba(0,0,0,0.4)",
                glow: "0 0 0 1px rgba(34,211,238,.25), 0 20px 40px rgba(34,211,238,.15)",
                'glow-gold': "0 0 0 1px rgba(212, 175, 55,.25), 0 20px 40px rgba(212, 175, 55,.15)"
            }
        },
    },
    plugins: [],
};

export default config;
