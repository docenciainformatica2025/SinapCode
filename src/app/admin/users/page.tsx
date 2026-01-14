'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { AdminHeader } from '@/components/admin/header';
import { EditUserModal } from '@/components/admin/modals/edit-user-modal';
import { DeleteUserModal } from '@/components/admin/modals/delete-user-modal';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'suspended' | 'pending';
    lastLogin: string;
    createdAt: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState<string>('all');

    // Modals
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [deletingUser, setDeletingUser] = useState<User | null>(null);

    // Obtener usuarios reales de la API
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/admin/users');
            const data = await response.json();

            if (response.ok) {
                console.log('✅ Usuarios obtenidos de la API:', data.users);
                setUsers(data.users);
            } else {
                console.error('❌ Error de API:', data.error);
                toast.error(data.error || 'Error al cargar usuarios');
            }
        } catch (error) {
            console.error('❌ Error fetching users:', error);
            toast.error('Error al cargar usuarios');
        } finally {
            setLoading(false);
        }
    };

    const handleSuspendUser = async (user: User) => {
        const action = user.status === 'suspended' ? 'activate' : 'suspend';

        try {
            const response = await fetch(`/api/admin/users/${user.id}/${action}`, {
                method: 'POST',
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(`✅ Usuario ${action === 'suspend' ? 'suspendido' : 'activado'} exitosamente`);
                fetchUsers(); // Recargar lista
            } else {
                toast.error(data.error || `Error al ${action} usuario`);
            }
        } catch (error) {
            console.error(`Error ${action} user:`, error);
            toast.error(`Error al ${action} usuario`);
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <AdminHeader
                title="Gestión de Usuarios"
                description="Administra cuentas, roles y permisos de usuarios"
            />

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-neural-blue border-r-transparent mb-4"></div>
                        <div className="text-white text-lg">Cargando usuarios desde Supabase...</div>
                    </div>
                </div>
            ) : (
                <>
                    {/* Filters */}
                    <div className="glass-panel p-6 rounded-xl border border-white/10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="text-sm text-platinum-dim mb-2 block">Buscar</label>
                                <input
                                    type="text"
                                    placeholder="Nombre o email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-neural-blue outline-none transition"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-platinum-dim mb-2 block">Rol</label>
                                <select
                                    value={filterRole}
                                    onChange={(e) => setFilterRole(e.target.value)}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-neural-blue outline-none transition"
                                >
                                    <option value="all">Todos los Roles</option>
                                    <option value="STUDENT">Estudiantes</option>
                                    <option value="TEACHER">Profesores</option>
                                    <option value="ADMIN">Administradores</option>
                                    <option value="SUPER_ADMIN">Super Admins</option>
                                </select>
                            </div>
                            <div className="flex items-end">
                                <div className="text-sm text-platinum-dim">
                                    Mostrando <span className="text-white font-bold">{filteredUsers.length}</span> de {users.length} usuarios
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Users Table */}
                    <div className="glass-panel rounded-xl overflow-hidden border border-white/10">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5 border-b border-white/10">
                                    <tr>
                                        <th className="text-left p-4 text-sm font-bold text-platinum-dim uppercase tracking-wider">Usuario</th>
                                        <th className="text-left p-4 text-sm font-bold text-platinum-dim uppercase tracking-wider">Rol</th>
                                        <th className="text-left p-4 text-sm font-bold text-platinum-dim uppercase tracking-wider">Estado</th>
                                        <th className="text-left p-4 text-sm font-bold text-platinum-dim uppercase tracking-wider">Último Login</th>
                                        <th className="text-left p-4 text-sm font-bold text-platinum-dim uppercase tracking-wider">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="p-8 text-center text-platinum-dim">
                                                No hay usuarios en la base de datos
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredUsers.map((user) => (
                                            <motion.tr
                                                key={user.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="border-b border-white/5 hover:bg-white/5 transition"
                                            >
                                                <td className="p-4">
                                                    <div>
                                                        <div className="text-white font-medium">{user.name}</div>
                                                        <div className="text-sm text-platinum-dim">{user.email}</div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === 'ADMIN' || user.role === 'SUPER_ADMIN' ? 'bg-rose-500/20 text-rose-400' :
                                                            user.role === 'TEACHER' ? 'bg-purple-500/20 text-purple-400' :
                                                                'bg-blue-500/20 text-blue-400'
                                                        }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' :
                                                            user.status === 'suspended' ? 'bg-rose-500/20 text-rose-400' :
                                                                'bg-amber-500/20 text-amber-400'
                                                        }`}>
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-platinum-dim text-sm">{user.lastLogin}</td>
                                                <td className="p-4">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => setEditingUser(user)}
                                                            className="px-3 py-1 bg-neural-blue/20 hover:bg-neural-blue/30 text-neural-blue rounded text-xs font-medium transition"
                                                            title="Editar usuario"
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            onClick={() => handleSuspendUser(user)}
                                                            className={`px-3 py-1 rounded text-xs font-medium transition ${user.status === 'suspended'
                                                                    ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400'
                                                                    : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-400'
                                                                }`}
                                                            title={user.status === 'suspended' ? 'Activar cuenta' : 'Suspender cuenta'}
                                                        >
                                                            {user.status === 'suspended' ? 'Activar' : 'Suspender'}
                                                        </button>
                                                        <button
                                                            onClick={() => setDeletingUser(user)}
                                                            className="px-3 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded text-xs font-medium transition"
                                                            title="Eliminar usuario"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {/* Modals */}
            <EditUserModal
                user={editingUser}
                isOpen={!!editingUser}
                onClose={() => setEditingUser(null)}
                onSuccess={fetchUsers}
            />

            <DeleteUserModal
                user={deletingUser}
                isOpen={!!deletingUser}
                onClose={() => setDeletingUser(null)}
                onSuccess={fetchUsers}
            />
        </div>
    );
}
