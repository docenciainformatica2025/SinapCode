'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, Check, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    createdAt: Date;
    read: boolean;
}

// MOCK_NOTIFICATIONS removed


export function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    // Fetch Notifications
    const fetchNotifications = async () => {
        try {
            const res = await fetch('/api/admin/notifications');
            if (res.ok) {
                const data = await res.json();
                // Map API data to UI format if needed, or assume consistency
                // Ensure dates are parsed
                const parsed = data.map((n: any) => ({
                    ...n,
                    createdAt: new Date(n.createdAt),
                    read: n.isRead, // Mapping prisma isRead to UI read
                    type: n.type === 'USER_REGISTER' ? 'success' : 'info' // Map simple types
                }));
                setNotifications(parsed);
            }
        } catch (error) {
            console.error('Failed to fetch notifications', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
        // Optional: Poll every 30s
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const markAsRead = async (id: string) => {
        // Optimistic update
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
        try {
            await fetch(`/api/admin/notifications?id=${id}`, { method: 'PUT' });
        } catch (error) {
            console.error('Error marking as read', error);
        }
    };

    const markAllAsRead = async () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        try {
            await fetch('/api/admin/notifications', { method: 'PUT' });
        } catch (error) {
            console.error('Error marking all as read', error);
        }
    };

    const deleteNotification = async (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
        try {
            await fetch(`/api/admin/notifications?id=${id}`, { method: 'DELETE' });
        } catch (error) {
            console.error('Error deleting notification', error);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 hover:bg-white/10 rounded-lg transition-colors focus:outline-none"
            >
                <Bell className={cn("h-5 w-5 transition-colors", isOpen ? "text-white" : "text-platinum-dim hover:text-white")} />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-neon-red">
                        {unreadCount}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-deep-space border border-white/10 shadow-2xl overflow-hidden z-50 ring-1 ring-black/5"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                            <h3 className="font-bold text-white">Notificaciones</h3>
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="text-xs text-neural-blue hover:text-blue-400 transition-colors flex items-center gap-1 font-medium"
                                >
                                    <Check className="h-3 w-3" />
                                    Marcar todo leído
                                </button>
                            )}
                        </div>

                        {/* List */}
                        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-platinum-dim">
                                    <Bell className="h-8 w-8 mx-auto mb-3 opacity-20" />
                                    <p className="text-sm">No tienes notificaciones</p>
                                </div>
                            ) : (
                                notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={cn(
                                            "p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group relative",
                                            !notification.read ? "bg-neural-blue/5" : ""
                                        )}
                                    >
                                        <div className="flex gap-3">
                                            <div className={cn(
                                                "w-2 h-2 rounded-full mt-2 shrink-0",
                                                notification.type === 'success' ? "bg-emerald-500 shadow-neon-green" :
                                                    notification.type === 'warning' ? "bg-amber-500 shadow-neon-orange" :
                                                        "bg-neural-blue shadow-neon-blue"
                                            )} />
                                            <div className="flex-1 space-y-1">
                                                <div className="flex justify-between items-start gap-2">
                                                    <p className={cn("text-sm font-medium", !notification.read ? "text-white" : "text-platinum")}>
                                                        {notification.title}
                                                    </p>
                                                    <span className="text-[10px] text-platinum-dim shrink-0">
                                                        {formatDistanceToNow(notification.createdAt, { addSuffix: true, locale: es })}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-platinum-dim leading-relaxed">
                                                    {notification.message}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                            {!notification.read && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); markAsRead(notification.id); }}
                                                    className="p-1.5 hover:bg-white/10 rounded-md text-platinum hover:text-white"
                                                    title="Marcar como leído"
                                                >
                                                    <Check className="h-3 w-3" />
                                                </button>
                                            )}
                                            <button
                                                onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id); }}
                                                className="p-1.5 hover:bg-rose-500/20 rounded-md text-platinum hover:text-rose-500"
                                                title="Eliminar"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-3 border-t border-white/5 bg-white/5 text-center">
                            <button className="text-xs text-platinum hover:text-white transition-colors">
                                Ver historial completo
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
