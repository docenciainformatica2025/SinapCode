'use client';

interface AdminHeaderProps {
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export function AdminHeader({ title, description, action }: AdminHeaderProps) {
    return (
        <div className="sticky top-0 z-10 border-b border-white/5 bg-deep-space/95 backdrop-blur-sm">
            <div className="flex h-16 items-center px-8 justify-between">
                {/* Title */}
                <div>
                    <h1 className="text-xl font-bold text-white">{title}</h1>
                    {description && (
                        <p className="text-sm text-platinum-dim">{description}</p>
                    )}
                </div>

                {/* Action */}
                {action && (
                    <button
                        onClick={action.onClick}
                        className="px-4 py-2 bg-neural-blue hover:bg-blue-600 text-white rounded-lg text-sm font-bold transition shadow-neon-blue flex items-center gap-2"
                    >
                        {action.label}
                    </button>
                )}
            </div>
        </div>
    );
}
