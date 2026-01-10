'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AuditLogger } from '@/lib/audit/audit-logger';
import { toast } from 'sonner';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'STUDENT' | 'TEACHER' | 'ADMIN';
    status: 'active' | 'suspended' | 'pending';
    lastLogin: string;
    createdAt: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([
        {
            id: '1',
            name: 'María García',
            email: 'maria.garcia@student.com',
            role: 'STUDENT',
            status: 'active',
            lastLogin: '2 hours ago',
            createdAt: '2025-12-15',
        },
        {
            id: '2',
            name: 'Carlos Rodríguez',
            email: 'carlos.r@teacher.com',
            role: 'TEACHER',
            status: 'active',
            lastLogin: '1 day ago',
            createdAt: '2025-11-20',
        },
        {
            id: '3',
            name: 'Ana Martínez',
            email: 'ana.m@student.com',
            role: 'STUDENT',
            status: 'pending',
            lastLogin: 'Never',
            createdAt: '2026-01-08',
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState<string>('all');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const handleBanUser = async (user: User) => {
        const newStatus = user.status === 'suspended' ? 'active' : 'suspended';
        const actionType = newStatus === 'suspended' ? 'USER_BAN' : 'USER_UNBAN';

        // Update local state
        setUsers(users.map(u => u.id === user.id ? { ...u, status: newStatus } : u));

        // Log Audit
        await AuditLogger.logAction({
            actorId: 'current-admin-id', // In real app, from session
            actorName: 'You (Admin)',
            action: actionType,
            description: `${actionType === 'USER_BAN' ? 'Suspended' : 'Reactivated'} user access for ${user.email}`,
            targetId: user.id,
            targetName: user.name
        });

        toast.success(`User ${newStatus === 'suspended' ? 'suspended' : 'activated'} successfully`);
    };

    const handleSaveUser = async () => {
        if (!selectedUser) return;

        // Perform mock save
        setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));

        await AuditLogger.logAction({
            actorId: 'current-admin-id',
            actorName: 'You (Admin)',
            action: 'ROLE_CHANGE',
            description: `Updated profile details/role for ${selectedUser.email}`,
            targetId: selectedUser.id
        });

        toast.success('User updated successfully');
        setSelectedUser(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">User Management</h2>
                    <p className="text-platinum-dim">Manage user accounts, roles, and permissions</p>
                </div>
                <button className="px-6 py-3 bg-neural-blue text-white rounded-lg font-bold hover:bg-blue-600 transition shadow-neon-blue">
                    + New User
                </button>
            </div>

            {/* Filters */}
            <div className="glass-panel p-6 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="text-sm text-platinum-dim mb-2 block">Search</label>
                        <input
                            type="text"
                            placeholder="Name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-neural-blue outline-none transition"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-platinum-dim mb-2 block">Role</label>
                        <select
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-neural-blue outline-none transition"
                        >
                            <option value="all">All Roles</option>
                            <option value="STUDENT">Students</option>
                            <option value="TEACHER">Teachers</option>
                            <option value="ADMIN">Admins</option>
                        </select>
                    </div>
                    <div className="flex items-end">
                        <div className="text-sm text-platinum-dim">
                            Showing <span className="text-white font-bold">{filteredUsers.length}</span> of {users.length} users
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
                                <th className="text-left p-4 text-sm font-bold text-platinum-dim uppercase tracking-wider">User</th>
                                <th className="text-left p-4 text-sm font-bold text-platinum-dim uppercase tracking-wider">Role</th>
                                <th className="text-left p-4 text-sm font-bold text-platinum-dim uppercase tracking-wider">Status</th>
                                <th className="text-left p-4 text-sm font-bold text-platinum-dim uppercase tracking-wider">Last Login</th>
                                <th className="text-left p-4 text-sm font-bold text-platinum-dim uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
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
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === 'ADMIN' ? 'bg-rose-500/20 text-rose-400' :
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
                                                onClick={() => setSelectedUser(user)}
                                                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-medium transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleBanUser(user)}
                                                className={`px-3 py-1 rounded text-xs font-medium transition ${user.status === 'suspended'
                                                        ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400'
                                                        : 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-400'
                                                    }`}
                                            >
                                                {user.status === 'suspended' ? 'Activate' : 'Suspend'}
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            {selectedUser && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-panel max-w-md w-full p-8 rounded-2xl border border-white/20"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">Edit User</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-platinum-dim mb-2 block">Name</label>
                                <input
                                    type="text"
                                    value={selectedUser.name}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-neural-blue outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-platinum-dim mb-2 block">Email</label>
                                <input
                                    type="email"
                                    value={selectedUser.email}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-neural-blue outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-platinum-dim mb-2 block">Role</label>
                                <select
                                    value={selectedUser.role}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value as any })}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-neural-blue outline-none transition"
                                >
                                    <option value="STUDENT">Student</option>
                                    <option value="TEACHER">Teacher</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm text-platinum-dim mb-2 block">Status</label>
                                <select
                                    value={selectedUser.status}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value as any })}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-neural-blue outline-none transition"
                                >
                                    <option value="active">Active</option>
                                    <option value="suspended">Suspended</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveUser}
                                className="flex-1 px-4 py-2 bg-neural-blue hover:bg-blue-600 text-white rounded-lg font-bold transition shadow-neon-blue"
                            >
                                Save Changes
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
