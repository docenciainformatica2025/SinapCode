'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    tier: 'guest' | 'free' | 'pro';
    completedLessons: number;
    aiQuestionsAsked: number;
}

interface AuthContextType {
    user: User | null;
    isGuest: boolean;
    isFree: boolean;
    isPro: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    // Mock user - replace with real auth
    const [user, setUser] = useState<User | null>({
        id: 'guest',
        name: 'Visitante',
        email: '',
        tier: 'guest',
        completedLessons: 0,
        aiQuestionsAsked: 0,
    });

    const isGuest = user?.tier === 'guest';
    const isFree = user?.tier === 'free';
    const isPro = user?.tier === 'pro';

    const login = async (email: string, password: string) => {
        // Mock login
        setUser({
            id: '1',
            name: 'María García',
            email,
            tier: 'free',
            completedLessons: 2,
            aiQuestionsAsked: 15,
        });
    };

    const logout = () => {
        setUser({
            id: 'guest',
            name: 'Visitante',
            email: '',
            tier: 'guest',
            completedLessons: 0,
            aiQuestionsAsked: 0,
        });
    };

    const register = async (email: string, password: string, name: string) => {
        // Mock register
        setUser({
            id: '2',
            name,
            email,
            tier: 'free',
            completedLessons: 0,
            aiQuestionsAsked: 0,
        });
    };

    return (
        <AuthContext.Provider value={{ user, isGuest, isFree, isPro, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
