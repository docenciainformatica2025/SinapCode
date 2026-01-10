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
                'deep-space': '#0a0a0a',
                'platinum': '#ededed',
                'platinum-dim': '#a0a0a0',
                'cyber-platinum': '#c0c0c0',
                'neural-blue': '#3b82f6',
                'synapse-purple': '#a855f7',
                'brain-spark': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'accent-gold': '#fbbf24',
            },
            backgroundImage: {
                'brain-spark': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [],
};

export default config;
