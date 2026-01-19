export function LoadingSkeleton() {
    return (
        <div className="animate-pulse space-y-4">
            <div className="h-8 bg-white/10 rounded-lg w-3/4"></div>
            <div className="h-4 bg-white/5 rounded w-1/2"></div>
            <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="h-32 bg-white/10 rounded-xl"></div>
                <div className="h-32 bg-white/10 rounded-xl"></div>
                <div className="h-32 bg-white/10 rounded-xl"></div>
            </div>
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div className="glass-panel p-6 rounded-2xl animate-pulse">
            <div className="h-6 bg-white/10 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-white/5 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-white/5 rounded w-1/2"></div>
        </div>
    );
}
