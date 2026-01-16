export default function AdminLoading() {
    return (
        <div className="flex h-full items-center justify-center min-h-[50vh]">
            <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-neural-blue border-r-transparent mb-4"></div>
                <div className="text-platinum-dim animate-pulse">Cargando...</div>
            </div>
        </div>
    );
}
