'use client';

import { AdminHeader } from '@/components/admin/header';
import { Save, Lock, Globe, Mail, Bell, Database, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const sections = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'security', label: 'Seguridad', icon: Lock },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'system', label: 'Sistema', icon: Database },
];

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState('general');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // State for settings
    const [settings, setSettings] = useState({
        platformName: 'SinapCode',
        supportUrl: 'https://support.sinapcode.com',
        maintenanceMessage: '',
        maintenanceMode: false,
        emailAlerts: true,
        pushNotifications: false,
        twoFactorRequired: false,
        publicRegistration: true
    });

    const [systemInfo, setSystemInfo] = useState({
        appVersion: '...',
        nextVersion: '...',
        nodeEnv: '...',
        dbType: '...'
    });

    // Load settings from API
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/admin/settings');
                if (res.ok) {
                    const data = await res.json();
                    const { systemInfo: sysInfo, ...rest } = data;
                    setSettings(prev => ({ ...prev, ...rest }));
                    if (sysInfo) setSystemInfo(sysInfo);
                }
            } catch (error) {
                console.error('Error al cargar la configuración:', error);
                toast.error('Error al cargar la configuración');
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/admin/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });

            if (res.ok) {
                toast.success('Configuración guardada exitosamente');
            } else {
                const error = await res.json();
                toast.error('Error al guardar: ' + (error.message || 'Error desconocido'));
            }
        } catch (error) {
            console.error('Error al guardar la configuración:', error);
            toast.error('Error de conexión al guardar');
        } finally {
            setSaving(false);
        }
    };

    const handleDiagnostic = async (action: string) => {
        if (action === 'Logs de Error') {
            // Navegar a auditoría filtrando por errores (simulado por ahora enviando al index)
            window.location.href = '/admin/audit';
            return;
        }

        const apiAction = action === 'Verificar DB' ? 'db_check' : 'clear_cache';

        const promise = fetch('/api/admin/diagnostics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: apiAction })
        }).then(async (res) => {
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Error');
            return data.message;
        });

        toast.promise(promise, {
            loading: `Ejecutando ${action}...`,
            success: (data) => `${data}`,
            error: `Error al ejecutar ${action}`
        });
    };

    const toggleSetting = (key: string) => {
        setSettings(prev => ({
            ...prev,
            [key as keyof typeof prev]: !prev[key as keyof typeof prev]
        }));
    };

    const updateSetting = (key: string, value: string) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-neural-blue" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <AdminHeader
                title="Configuración del Sistema"
                description="Gestiona variables globales, seguridad y preferencias de la plataforma."
            />

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar de Configuración */}
                <div className="w-full lg:w-64 glass-panel rounded-xl border border-white/10 h-fit p-2">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        const isActive = activeSection === section.id;
                        return (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mb-1 ${isActive
                                    ? 'bg-neural-blue/20 text-neural-blue shadow-neon-blue font-bold'
                                    : 'text-platinum-dim hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <Icon className="h-5 w-5" />
                                <span>{section.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="flex-1 glass-panel rounded-xl border border-white/10 p-6 md:p-8">
                    {activeSection === 'general' && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4">Información General</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-platinum">Nombre de la Plataforma</label>
                                    <input
                                        type="text"
                                        value={settings.platformName}
                                        onChange={(e) => updateSetting('platformName', e.target.value)}
                                        className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-neural-blue outline-none transition"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-platinum">URL de Soporte</label>
                                    <input
                                        type="text"
                                        value={settings.supportUrl}
                                        onChange={(e) => updateSetting('supportUrl', e.target.value)}
                                        className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-neural-blue outline-none transition"
                                    />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <label className="text-sm font-medium text-platinum">Mensaje de Mantenimiento</label>
                                    <textarea
                                        rows={3}
                                        value={settings.maintenanceMessage}
                                        onChange={(e) => updateSetting('maintenanceMessage', e.target.value)}
                                        className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-neural-blue outline-none transition resize-none"
                                        placeholder="Mensaje que verán los usuarios cuando el sitio esté en mantenimiento..."
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'security' && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4">Seguridad Global</h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                                    <div>
                                        <h4 className="font-bold text-white">Autenticación de Dos Factores (2FA)</h4>
                                        <p className="text-sm text-platinum-dim">Forzar 2FA para todos los administradores</p>
                                    </div>
                                    <div
                                        onClick={() => toggleSetting('twoFactorRequired')}
                                        className={`relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer ${settings.twoFactorRequired ? 'bg-neural-blue' : 'bg-white/20'}`}
                                    >
                                        <span className={`${settings.twoFactorRequired ? 'translate-x-6' : 'translate-x-0'} absolute left-0 inline-block w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out`} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                                    <div>
                                        <h4 className="font-bold text-white">Registro de Usuarios</h4>
                                        <p className="text-sm text-platinum-dim">Permitir nuevos registros públicos</p>
                                    </div>
                                    <div
                                        onClick={() => toggleSetting('publicRegistration')}
                                        className={`relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer ${settings.publicRegistration ? 'bg-emerald-500' : 'bg-white/20'}`}
                                    >
                                        <span className={`${settings.publicRegistration ? 'translate-x-6' : 'translate-x-0'} absolute left-0 inline-block w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'notifications' && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4">Preferencias de Notificación</h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                                    <div>
                                        <h4 className="font-bold text-white">Alertas por Correo</h4>
                                        <p className="text-sm text-platinum-dim">Recibir correos sobre nuevos registros y ventas</p>
                                    </div>
                                    <div
                                        onClick={() => toggleSetting('emailAlerts')}
                                        className={`relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer ${settings.emailAlerts ? 'bg-neural-blue' : 'bg-white/20'}`}
                                    >
                                        <span className={`${settings.emailAlerts ? 'translate-x-6' : 'translate-x-0'} absolute left-0 inline-block w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out`} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                                    <div>
                                        <h4 className="font-bold text-white">Notificaciones Push</h4>
                                        <p className="text-sm text-platinum-dim">Alertas en tiempo real en el navegador</p>
                                    </div>
                                    <div
                                        onClick={() => toggleSetting('pushNotifications')}
                                        className={`relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer ${settings.pushNotifications ? 'bg-neural-blue' : 'bg-white/20'}`}
                                    >
                                        <span className={`${settings.pushNotifications ? 'translate-x-6' : 'translate-x-0'} absolute left-0 inline-block w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'system' && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4">Estado del Sistema</h3>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-bold text-white">Modo Mantenimiento</h4>
                                            <p className="text-sm text-platinum-dim">Bloquea el acceso a usuarios no administradores</p>
                                        </div>
                                        <div
                                            onClick={() => toggleSetting('maintenanceMode')}
                                            className={`relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer ${settings.maintenanceMode ? 'bg-amber-500' : 'bg-white/20'}`}
                                        >
                                            <span className={`${settings.maintenanceMode ? 'translate-x-6' : 'translate-x-0'} absolute left-0 inline-block w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out`} />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-4">
                                    <h4 className="font-bold text-white">Acciones de Diagnóstico</h4>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => handleDiagnostic('Limpiar Caché')}
                                            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition font-medium border border-white/10"
                                        >
                                            Limpiar Caché
                                        </button>
                                        <button
                                            onClick={() => handleDiagnostic('Verificar DB')}
                                            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition font-medium border border-white/10"
                                        >
                                            Verificar DB
                                        </button>
                                        <button
                                            onClick={() => handleDiagnostic('Logs de Error')}
                                            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition font-medium border border-white/10"
                                        >
                                            Logs de Error
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                    <h4 className="font-bold text-white mb-2">Información de Versión</h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex justify-between p-2 bg-black/30 rounded">
                                            <span className="text-platinum-dim">Versión App</span>
                                            <span className="text-white font-mono">v{systemInfo.appVersion}</span>
                                        </div>
                                        <div className="flex justify-between p-2 bg-black/30 rounded">
                                            <span className="text-platinum-dim">Next.js</span>
                                            <span className="text-white font-mono">{systemInfo.nextVersion}</span>
                                        </div>
                                        <div className="flex justify-between p-2 bg-black/30 rounded">
                                            <span className="text-platinum-dim">Entorno</span>
                                            <span className={`font-mono capitalize ${systemInfo.nodeEnv === 'production' ? 'text-emerald-400' : 'text-amber-400'}`}>
                                                {systemInfo.nodeEnv}
                                            </span>
                                        </div>
                                        <div className="flex justify-between p-2 bg-black/30 rounded">
                                            <span className="text-platinum-dim">Base de Datos</span>
                                            <span className="text-white font-mono">{systemInfo.dbType}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Save Button Footer */}
                    <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className={`px-6 py-2 bg-neural-blue hover:bg-blue-600 text-white font-bold rounded-lg transition shadow-neon-blue flex items-center gap-2 ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {saving ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="h-4 w-4" />
                            )}
                            {saving ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
