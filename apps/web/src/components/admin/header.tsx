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
        <div className="sticky -top-8 -mx-8 -mt-8 pt-8 mb-8 z-30 border-b border-white/5 bg-[#0F1117]/95 backdrop-blur-md transition-all duration-200">
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
