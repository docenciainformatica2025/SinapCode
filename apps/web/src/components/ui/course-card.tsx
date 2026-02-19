import Link from 'next/link';
import Image from 'next/image';

interface CourseCardProps {
    title: string;
    description: string;
    level: string;
    duration: string;
    image: string;
    tags: string[];
    slug?: string;
    isPro?: boolean;
    progress?: number;
}

export function CourseCard({ title, description, level, duration, image, tags, slug = '#', isPro = false, progress }: CourseCardProps) {
    return (
        <div className="group relative rounded-2xl bg-surface border border-borderSoft p-0 overflow-hidden transition-all duration-300 hover:shadow-glow hover:-translate-y-1 h-full flex flex-col">

            {/* Image Section */}
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                />
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60" />

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                    <span className="px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                        {level}
                    </span>
                    {isPro && (
                        <span className="px-3 py-1 bg-accent-gold/20 backdrop-blur-md border border-accent-gold/30 text-accent-gold text-[10px] font-black uppercase tracking-widest rounded-full">
                            PRO
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow pointer-events-none">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {title}
                </h3>

                <p className="text-sm text-platinum-dim mb-6 line-clamp-2">
                    {description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6 pointer-events-none">
                    {tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-white/5 text-platinum-dim text-[10px] font-bold uppercase rounded border border-white/10">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Progress Bar or Footer */}
                <div className="mt-auto pt-4 border-t border-white/10 pointer-events-none">
                    {progress !== undefined && progress > 0 ? (
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                                <span className="text-platinum-dim">Progreso</span>
                                <span className="text-primary">{progress}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-primary to-secondary"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">⏱️</span>
                                <span className="text-xs font-bold text-platinum-dim uppercase tracking-wider">{duration}</span>
                            </div>
                            <span className="text-primary text-sm font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                                Explorar →
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Hover Glow Border Effect */}
            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/20 pointer-events-none transition-colors duration-300 z-20" />

            {/* Main Card Link Overlay - Moved to end for stacking context */}
            <Link href={slug} className="absolute inset-0 z-50 rounded-2xl" aria-label={`Ver curso ${title}`} />
        </div>
    );
}
