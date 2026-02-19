import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

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
        <div className="group relative rounded-3xl bg-surface/40 backdrop-blur-3xl border border-white/5 p-0 overflow-hidden transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-2 h-full flex flex-col hover:border-primary/20">
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

            {/* Image Section */}
            <div className="relative h-56 w-full overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                    <span className="px-3 py-1 bg-apple-blue/10 backdrop-blur-xl border border-apple-blue/20 text-apple-blue text-[10px] font-bold uppercase tracking-widest rounded-lg">
                        {level}
                    </span>
                    {isPro && (
                        <span className="px-3 py-1 bg-apple-lemon/10 backdrop-blur-xl border border-apple-lemon/20 text-apple-lemon text-[10px] font-bold uppercase tracking-widest rounded-lg">
                            PRO
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-apple-blue transition-colors duration-500 tracking-tight text-balance">
                    {title}
                </h3>

                <p className="text-xs text-platinum-dim mb-6 line-clamp-2 leading-relaxed text-pretty opacity-60">
                    {description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 bg-white/[0.02] text-platinum-dim text-[9px] font-bold uppercase tracking-wider rounded-md border border-white/5">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Progress Bar or Footer */}
                <div className="mt-auto pt-6 border-t border-white/5">
                    {progress !== undefined && progress > 0 ? (
                        <div className="space-y-3">
                            <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                                <span className="text-platinum-dim opacity-60">Progreso</span>
                                <span className="text-primary">{progress}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-platinum-dim/60 group-hover:text-white transition-colors duration-500">
                                <span className="text-[10px] font-bold uppercase tracking-widest">{duration}</span>
                            </div>
                            <span className="text-apple-blue text-xs font-bold tracking-tight group-hover:translate-x-1 transition-transform duration-500 flex items-center gap-1.5">
                                Protocolo <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Card Link Overlay */}
            <Link href={slug} className="absolute inset-0 z-10 rounded-[2.5rem]" aria-label={`Ver curso ${title}`} />
        </div>
    );
}
