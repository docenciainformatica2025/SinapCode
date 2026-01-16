'use client';

import { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/admin/header';
import { Plus, Edit, Eye, FileText, CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BlogPostsPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/posts');
            const data = await res.json();
            if (data.posts) setPosts(data.posts);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleCreate = () => {
        // ideally redirect to a full editor: /admin/posts/new
        // but for now we can have a simple modal or just a placeholder alert
        // implementing simple create via API for MVP
        const title = prompt("Título del Artículo:");
        if (!title) return;

        createPost(title);
    };

    const createPost = async (title: string) => {
        const res = await fetch('/api/admin/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content: 'Escribe tu contenido aquí...', isPublished: false })
        });
        if (res.ok) {
            fetchPosts();
        }
    };

    return (
        <div className="space-y-6">
            <AdminHeader title="Gestión de Blog" description="Crea y edita artículos de noticias y tutoriales" />

            <div className="flex justify-end">
                <button
                    onClick={handleCreate}
                    className="bg-neural-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition shadow-neon-blue"
                >
                    <Plus className="w-5 h-5" />
                    Nuevo Artículo
                </button>
            </div>

            <div className="glass-panel rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-white/5 border-b border-white/10">
                        <tr>
                            <th className="text-left p-4 text-sm font-bold text-platinum-dim">Título</th>
                            <th className="text-left p-4 text-sm font-bold text-platinum-dim">Estado</th>
                            <th className="text-left p-4 text-sm font-bold text-platinum-dim">Autor</th>
                            <th className="text-left p-4 text-sm font-bold text-platinum-dim">Fecha</th>
                            <th className="text-right p-4 text-sm font-bold text-platinum-dim">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {posts.map((post) => (
                            <tr key={post.id} className="hover:bg-white/5 transition">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/5 rounded-lg">
                                            <FileText className="w-5 h-5 text-platinum" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">{post.title}</div>
                                            <div className="text-xs text-platinum-dim font-mono">/{post.slug}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${post.isPublished ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                                        }`}>
                                        {post.isPublished ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                        {post.isPublished ? 'Publicado' : 'Borrador'}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-platinum">
                                    {post.author?.name || 'Admin'}
                                </td>
                                <td className="p-4 text-xs text-platinum-dim">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-4 text-right">
                                    <button className="p-2 hover:bg-white/10 rounded-lg text-platinum transition" title="Editar">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
