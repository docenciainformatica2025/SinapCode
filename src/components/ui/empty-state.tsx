import { ReactNode } from 'react';

interface EmptyStateProps {
    icon: string;
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="text-7xl mb-6 opacity-50">{icon}</div>
            <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
            <p className="text-platinum-dim max-w-md mb-8">{description}</p>
            {action && (
                <button
                    onClick={action.onClick}
                    className="px-6 py-3 bg-neural-blue text-white rounded-lg font-bold hover:bg-blue-600 transition shadow-neon-blue"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
}
