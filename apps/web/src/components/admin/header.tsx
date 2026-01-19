'use client';

interface AdminHeaderProps {
    title: string;
    description?: string;
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
    return (
        <div className="sticky top-0 z-10 border-b border-white/5 bg-deep-space/95 backdrop-blur-sm">
            <div className="flex h-16 items-center px-8">
                {/* Title */}
                <div>
                    <h1 className="text-xl font-bold text-white">{title}</h1>
                    {description && (
                        <p className="text-sm text-platinum-dim">{description}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
