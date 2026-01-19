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
}

export function CourseCard({ title, description, level, duration, image, tags, slug = '#', isPro = false }: CourseCardProps) {
    return (
        <div className="group relative rounded-2xl bg-surface border border-borderSoft p-0 overflow-hidden transition-all duration-300 hover:shadow-glow hover:-translate-y-1 h-full flex flex-col">

            {/* Image Section */}
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 right-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-surface/80 backdrop-blur border border-white/10 text-xs font-semibold text-white">
                        {level}
                    </span>
                    {isPro && (
                        <span className="px-2.5 py-1 rounded-full bg-gold/20 backdrop-blur border border-gold/50 text-xs font-bold text-gold shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                            PRO
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {title}
                </h3>

                <p className="text-muted text-sm line-clamp-2 mb-4">
                    {description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((tag) => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider font-medium px-2 py-1 rounded bg-white/5 text-muted border border-white/5">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs font-medium text-muted">
                    <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {duration}
                    </div>

                    <Link href={slug} className="text-primary font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0 transition-all duration-300 flex items-center gap-1 group/link outline-none">
                        Ver Curso
                        <span className="group-hover/link:translate-x-1 group-focus-visible/link:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </div>

            {/* Hover Glow Border Effect */}
            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/20 pointer-events-none transition-colors duration-300" />
        </div>
    );
}
