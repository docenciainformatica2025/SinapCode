'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Bell } from 'lucide-react';

interface Notification {
    id: string;
    type: 'info' | 'warning' | 'error' | 'success';
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
}

export function NotificationCenter() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        setNotifications([
            {
                id: '1',
                type: 'warning',
                title: 'Alto uso de CPU',
                message: 'El servidor está usando 85% de CPU',
                timestamp: new Date(Date.now() - 5 * 60000),
                read: false,
            },
            {
                id: '2',
                type: 'success',
                title: 'Backup completado',
                message: 'Backup diario completado exitosamente',
                timestamp: new Date(Date.now() - 30 * 60000),
                read: false,
            },
            {
                id: '3',
                type: 'info',
                title: 'Nuevo usuario registrado',
                message: 'Juan Pérez se registró en la plataforma',
                timestamp: new Date(Date.now() - 60 * 60000),
                read: true,
            },
        ]);
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(n => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        toast.success('Todas las notificaciones marcadas como leídas');
    };

    const getIcon = (type: Notification['type']) => {
        switch (type) {
            case 'info':
                return '💡';
            case 'warning':
                return '⚠️';
            case 'error':
                return '❌';
            case 'success':
                return '✅';
        }
    };

    const getTimeAgo = (date: Date) => {
        const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
        if (seconds < 60) return 'Hace un momento';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `Hace ${minutes}m`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `Hace ${hours}h`;
        return `Hace ${Math.floor(hours / 24)}d`;
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative rounded-lg p-2 text-platinum-dim transition-all hover:bg-white/5 hover:text-white border border-white/5 hover:border-white/10"
            >
                <Bell className="h-5 w-6" />
                {unreadCount > 0 && (
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-deep-space animate-pulse" />
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-[#0F1117] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                        <h3 className="text-lg font-bold text-white">Notificaciones</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-xs text-neural-blue hover:text-blue-400 transition"
                            >
                                Marcar todas como leídas
                            </button>
                        )}
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-platinum-dim">
                                No hay notificaciones
                            </div>
                        ) : (
                            notifications.map(notification => (
                                <div
                                    key={notification.id}
                                    onClick={() => markAsRead(notification.id)}
                                    className={`p-4 border-b border-white/5 hover:bg-white/5 transition cursor-pointer ${!notification.read ? 'bg-white/5' : ''
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl">{getIcon(notification.type)}</span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="text-sm font-semibold text-white truncate">
                                                    {notification.title}
                                                </h4>
                                                {!notification.read && (
                                                    <span className="w-2 h-2 bg-neural-blue rounded-full flex-shrink-0" />
                                                )}
                                            </div>
                                            <p className="text-xs text-platinum-dim mb-1">
                                                {notification.message}
                                            </p>
                                            <span className="text-xs text-platinum-dim/60">
                                                {getTimeAgo(notification.timestamp)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
