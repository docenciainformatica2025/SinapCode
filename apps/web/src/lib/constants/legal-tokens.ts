/**
 * Design System Tokens for Legal Components
 * Standardized for SINAPCODE SaaS Infrastructure (Estonia, EU)
 */

export const legalTokens = {
    colors: {
        background: "theme-light bg-[#F1F0E8] text-[#1E1E1E]",
        textPrimary: "text-[#1E1E1E] font-sans",
        textSecondary: "text-[#1E1E1E]/70 font-medium",
        textMuted: "text-[#1E1E1E]/40",
        border: "border-[#1E1E1E]/10",
        accent: "text-[#C9A78A]",
        hover: "hover:text-[#1E1E1E]",
        card: "bg-white/50 backdrop-blur-md rounded-2xl border border-black/5",
    },

    spacing: {
        container: "max-w-7xl mx-auto px-6 md:px-12",
        footerPadding: "py-16 md:py-24",
        sectionGap: "gap-12 md:gap-20",
    },

    typography: {
        small: "text-sm tracking-tight",
        base: "text-base leading-relaxed",
        heading: "text-4xl md:text-6xl font-black tracking-tighter italic uppercase font-outfit",
        subheading: "text-xl md:text-2xl font-bold tracking-tight text-[#1E1E1E]/90 font-outfit",
        brand: "font-black tracking-widest uppercase text-neural-blue",
    },

    shadows: {
        sm: "shadow-sm",
        md: "shadow-md shadow-black/20",
        lg: "shadow-2xl shadow-neural-blue/10",
    },

    transitions: {
        fast: "transition-all duration-300 ease-out",
        base: "transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)",
    }
};
