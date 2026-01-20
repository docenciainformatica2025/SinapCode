'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
    tier: 'guest' | 'free' | 'pro';
    completedLessons: number;
    aiQuestionsAsked: number;
}

interface AuthContextType {
    user: User | null;
    isGuest: boolean;
    isFree: boolean;
    isPro: boolean;
    login: (email: string, password: string) => Promise<void>; // Deprecated: use signIn directly
    logout: () => void;
    register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();

    // Default guest user
    const guestUser: User = {
        id: 'guest',
        name: 'Visitante',
        email: '',
        tier: 'guest',
        completedLessons: 0,
        aiQuestionsAsked: 0,
    };

    const [user, setUser] = useState<User | null>(guestUser);

    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            // Map session user to app user
            // Note: In a real app we might fetch extra user details here
            setUser({
                id: (session.user as any).id || session.user.email,
                name: session.user.name || '',
                email: session.user.email || '',
                role: (session.user as any).role,
                tier: 'free', // Default to free for authenticated users unless fetched otherwise
                completedLessons: 0, // Placeholder
                aiQuestionsAsked: 0, // Placeholder
            });
        } else if (status === 'unauthenticated') {
            setUser(guestUser);
        }
    }, [session, status]);

    const isGuest = !user || user.tier === 'guest';
    const isFree = user?.tier === 'free';
    const isPro = user?.tier === 'pro';

    // Wrappers for compatibility
    const login = async (email: string, password: string) => {
        await signIn('credentials', { email, password });
    };

    const logout = () => {
        signOut({ callbackUrl: '/' });
    };

    const register = async (email: string, password: string, name: string) => {
        // Redirect to register page
        window.location.href = '/auth/register';
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
