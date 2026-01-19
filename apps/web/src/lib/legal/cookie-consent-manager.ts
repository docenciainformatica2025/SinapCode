// Cookie Consent Manager
// Manages user cookie preferences following GDPR requirements

export interface CookiePreferences {
    essential: boolean;      // Always true (required for functionality)
    functional: boolean;     // User preference (theme, language)
    analytics: boolean;      // Google Analytics
    marketing: boolean;      // Ads (currently not used)
    timestamp: Date;
    version: string;         // Policy version
}

export interface CookieConsentRecord {
    id: string;
    userId?: string;         // null for anonymous users
    preferences: CookiePreferences;
    ipAddress: string;
    userAgent: string;
    acceptedAt: Date;
    policyVersion: string;
}

class CookieConsentManager {
    private static instance: CookieConsentManager;
    private readonly COOKIE_NAME = 'cookie-consent';
    private readonly POLICY_VERSION = '1.0.0';

    private constructor() { }

    static getInstance(): CookieConsentManager {
        if (!CookieConsentManager.instance) {
            CookieConsentManager.instance = new CookieConsentManager();
        }
        return CookieConsentManager.instance;
    }

    /**
     * Get current cookie preferences from localStorage
     */
    getPreferences(): CookiePreferences | null {
        if (typeof window === 'undefined') return null;

        const stored = localStorage.getItem(this.COOKIE_NAME);
        if (!stored) return null;

        try {
            const parsed = JSON.parse(stored);
            return {
                ...parsed,
                timestamp: new Date(parsed.timestamp)
            };
        } catch {
            return null;
        }
    }

    /**
     * Save cookie preferences
     */
    async savePreferences(preferences: Omit<CookiePreferences, 'timestamp' | 'version'>): Promise<void> {
        const fullPreferences: CookiePreferences = {
            ...preferences,
            essential: true, // Always true
            timestamp: new Date(),
            version: this.POLICY_VERSION
        };

        // Save to localStorage
        localStorage.setItem(this.COOKIE_NAME, JSON.stringify(fullPreferences));

        // Send to backend for audit trail
        await this.recordConsent(fullPreferences);

        // Apply preferences immediately
        this.applyPreferences(fullPreferences);
    }

    /**
     * Record consent in backend
     */
    private async recordConsent(preferences: CookiePreferences): Promise<void> {
        try {
            await fetch('/api/legal/cookie-consent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    preferences,
                    policyVersion: this.POLICY_VERSION,
                    userAgent: navigator.userAgent,
                    timestamp: preferences.timestamp.toISOString()
                })
            });
        } catch (error) {
            console.error('Failed to record cookie consent:', error);
        }
    }

    /**
     * Apply cookie preferences (enable/disable tracking)
     */
    private applyPreferences(preferences: CookiePreferences): void {
        // Google Analytics
        if (preferences.analytics) {
            this.enableGoogleAnalytics();
        } else {
            this.disableGoogleAnalytics();
        }

        // Marketing cookies (future)
        if (preferences.marketing) {
            // Enable marketing cookies
        } else {
            // Disable marketing cookies
        }
    }

    /**
     * Enable Google Analytics
     */
    private enableGoogleAnalytics(): void {
        if (typeof window === 'undefined') return;

        // Load Google Analytics script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
        document.head.appendChild(script);

        // Initialize gtag
        (window as any).dataLayer = (window as any).dataLayer || [];
        function gtag(...args: any[]) {
            (window as any).dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
            anonymize_ip: true, // GDPR requirement
            cookie_flags: 'SameSite=None;Secure'
        });
    }

    /**
     * Disable Google Analytics
     */
    private disableGoogleAnalytics(): void {
        if (typeof window === 'undefined') return;

        // Set opt-out flag
        (window as any)[`ga-disable-${process.env.NEXT_PUBLIC_GA_ID}`] = true;

        // Delete GA cookies
        this.deleteCookie('_ga');
        this.deleteCookie('_gid');
        this.deleteCookie('_gat');
    }

    /**
     * Delete a cookie
     */
    private deleteCookie(name: string): void {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    /**
     * Check if user has given consent
     */
    hasConsent(): boolean {
        return this.getPreferences() !== null;
    }

    /**
     * Check if policy version has changed
     */
    needsUpdate(): boolean {
        const prefs = this.getPreferences();
        if (!prefs) return true;
        return prefs.version !== this.POLICY_VERSION;
    }

    /**
     * Accept all cookies
     */
    async acceptAll(): Promise<void> {
        await this.savePreferences({
            essential: true,
            functional: true,
            analytics: true,
            marketing: false // Not used yet
        });
    }

    /**
     * Reject optional cookies
     */
    async rejectOptional(): Promise<void> {
        await this.savePreferences({
            essential: true,
            functional: false,
            analytics: false,
            marketing: false
        });
    }

    /**
     * Reset consent (for testing or user request)
     */
    resetConsent(): void {
        localStorage.removeItem(this.COOKIE_NAME);
        this.disableGoogleAnalytics();
    }
}

export const cookieConsent = CookieConsentManager.getInstance();
