/**
 * Legal Consent Tracker
 * 
 * Registra consentimientos legales del usuario con evidencia completa
 * para cumplimiento de GDPR, COPPA, y protección legal ante demandas.
 * 
 * Inspirado en: Google, Stripe, Meta
 */

export interface ConsentData {
    documentType: 'terms' | 'privacy' | 'cookies' | 'coppa';
    documentVersion: string;
    consentMethod: 'checkbox' | 'button_click' | 'scroll_complete';
}

export interface ConsentMetadata {
    ipAddress: string;
    userAgent: string;
    geolocation: {
        latitude?: number;
        longitude?: number;
        accuracy?: number;
    } | null;
    screenResolution: string;
    language: string;
    timezone: string;
    timestamp: string;
}

export class ConsentTracker {
    /**
     * Registrar consentimiento del usuario
     * Guarda evidencia completa para protección legal
     */
    static async recordConsent(data: ConsentData): Promise<void> {
        try {
            // Obtener metadata del navegador
            const metadata = await this.collectMetadata();

            // Preparar payload completo
            const payload = {
                ...data,
                ...metadata,
            };

            // Enviar al backend
            const response = await fetch('/api/legal/consent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Failed to record consent: ${response.statusText}`);
            }

            // Guardar en localStorage como backup
            this.saveLocalConsent(payload);

            // Log para desarrollo


        } catch (error) {
            console.error('❌ Error recording consent:', error);
            // No lanzar error para no bloquear el flujo del usuario
            // Pero guardar en localStorage como fallback
            this.saveLocalConsent({
                ...data,
                timestamp: new Date().toISOString(),
                error: 'Failed to send to backend',
            });
        }
    }

    /**
     * Recolectar metadata del navegador
     */
    private static async collectMetadata(): Promise<ConsentMetadata> {
        const [ipAddress, geolocation] = await Promise.all([
            this.getClientIP(),
            this.getGeolocation(),
        ]);

        return {
            ipAddress,
            userAgent: navigator.userAgent,
            geolocation,
            screenResolution: `${screen.width}x${screen.height}`,
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timestamp: new Date().toISOString(),
        };
    }

    /**
     * Obtener IP del cliente
     * Usa servicio público (ipify.org)
     */
    private static async getClientIP(): Promise<string> {
        try {
            const response = await fetch('https://api.ipify.org?format=json', {
                signal: AbortSignal.timeout(3000), // 3s timeout
            });
            const data = await response.json();
            return data.ip;
        } catch {
            return 'unknown';
        }
    }

    /**
     * Obtener geolocalización (con permiso del usuario)
     * No es obligatorio, solo si el usuario lo permite
     */
    private static async getGeolocation(): Promise<ConsentMetadata['geolocation']> {
        return new Promise((resolve) => {
            if (!navigator.geolocation) {
                resolve(null);
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                    });
                },
                () => resolve(null), // Usuario rechazó o error
                {
                    timeout: 5000,
                    enableHighAccuracy: false, // No necesitamos alta precisión
                }
            );
        });
    }

    /**
     * Guardar en localStorage como backup
     * Útil si el backend falla o está en desarrollo
     */
    private static saveLocalConsent(data: any): void {
        try {
            const consents = JSON.parse(localStorage.getItem('legal_consents') || '[]');
            consents.push(data);

            // Limitar a últimos 50 consentimientos para no llenar localStorage
            const recentConsents = consents.slice(-50);

            localStorage.setItem('legal_consents', JSON.stringify(recentConsents));
        } catch (error) {
            console.error('Failed to save consent to localStorage:', error);
        }
    }

    /**
     * Obtener consentimientos guardados localmente
     * Útil para debugging o exportación
     */
    static getLocalConsents(): any[] {
        try {
            return JSON.parse(localStorage.getItem('legal_consents') || '[]');
        } catch {
            return [];
        }
    }

    /**
     * Limpiar consentimientos locales
     * Solo para desarrollo/testing
     */
    static clearLocalConsents(): void {
        localStorage.removeItem('legal_consents');
    }
}
