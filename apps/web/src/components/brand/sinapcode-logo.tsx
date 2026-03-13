'use client';

import React from 'react';

interface LogoProps {
    className?: string;
    variant?: 'icon' | 'text' | 'full';
    theme?: 'dark' | 'light' | 'color';
}

export const SinapcodeLogo: React.FC<LogoProps> = ({
    className = "h-8",
    variant = "full",
    theme = "color"
}) => {
    // Colors from the brand manual
    const colors = {
        terracotta: "#C9A78A",
        bioGraphing: "#A7C1C0",
        black: "#1E1E1E",
        white: "#F1F0E8"
    };

    const logoColor = theme === 'light' ? colors.white : theme === 'color' ? colors.terracotta : colors.black;
    const textColor = theme === 'light' ? colors.white : colors.black;

    const renderIcon = () => (
        <svg
            viewBox="0 0 100 100"
            className="h-full w-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* The Circle - Border as in Proposal 3 */}
            <circle
                cx="50"
                cy="50"
                r="38"
                stroke={logoColor}
                strokeWidth="2"
                opacity={theme === 'color' ? "0.3" : "0.5"}
            />

            {/* The 'S' Fold - Continuous line passing through */}
            <path
                d="M5 55 C20 55 35 25 50 25 C65 25 80 75 95 75"
                stroke={theme === 'color' ? "url(#logoGradient)" : logoColor}
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
            />

            {/* Gradient Version Definitions */}
            {theme === 'color' && (
                <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={colors.bioGraphing} />
                        <stop offset="50%" stopColor={colors.white} />
                        <stop offset="100%" stopColor={colors.terracotta} />
                    </linearGradient>
                </defs>
            )}
        </svg>
    );

    const renderText = () => (
        <span
            className="font-sans font-medium tracking-tight text-xl ml-3"
            style={{ color: textColor }}
        >
            Sinapcode
        </span>
    );

    return (
        <div className={`flex items-center ${className}`}>
            {(variant === 'icon' || variant === 'full') && renderIcon()}
            {(variant === 'text' || variant === 'full') && renderText()}
        </div>
    );
};
