'use client';

import { Component, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        // Log to error reporting service (Sentry, etc.)
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-deep-space flex items-center justify-center p-6">
                    <div className="glass-panel max-w-md w-full p-8 rounded-2xl border border-rose-500/30 text-center">
                        <div className="text-6xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Error del Sistema
                        </h2>
                        <p className="text-platinum-dim mb-6">
                            Algo salió mal. Nuestro equipo ha sido notificado.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-neural-blue text-white rounded-lg font-bold hover:bg-blue-600 transition"
                        >
                            Recargar Página
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
