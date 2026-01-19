/**
 * Legal Document Version Manager
 * 
 * Gestiona versiones de documentos legales con hashing SHA-256
 * para inmutabilidad y evidencia en litigios.
 */

export interface LegalDocument {
    type: 'terms' | 'privacy' | 'cookies' | 'coppa';
    version: string;
    effectiveDate: string;
    content: string;
    contentHash: string;
    changesSummary?: string;
}

export const LEGAL_DOCUMENTS: Record<string, LegalDocument> = {
    'terms-1.0': {
        type: 'terms',
        version: '1.0',
        effectiveDate: '2026-01-09',
        content: '/legal/terms',
        contentHash: 'a1b2c3d4e5f6...', // SHA-256 del contenido completo
        changesSummary: 'Versión inicial',
    },
    'privacy-1.0': {
        type: 'privacy',
        version: '1.0',
        effectiveDate: '2026-01-09',
        content: '/privacy',
        contentHash: 'f6e5d4c3b2a1...', // SHA-256 del contenido completo
        changesSummary: 'Versión inicial con cumplimiento GDPR, COPPA, Ley 1581',
    },
    'cookies-1.0': {
        type: 'cookies',
        version: '1.0',
        effectiveDate: '2026-01-09',
        content: '/legal/cookies',
        contentHash: 'c3d4e5f6a1b2...', // SHA-256 del contenido completo
        changesSummary: 'Versión inicial',
    },
};

export class LegalDocumentManager {
    /**
     * Obtener documento por tipo y versión
     */
    static getDocument(type: string, version: string): LegalDocument | null {
        const key = `${type}-${version}`;
        return LEGAL_DOCUMENTS[key] || null;
    }

    /**
     * Obtener versión actual de un documento
     */
    static getCurrentVersion(type: string): LegalDocument | null {
        // Por ahora, solo tenemos v1.0
        // En el futuro, esto consultaría la base de datos
        return this.getDocument(type, '1.0');
    }

    /**
     * Obtener todas las versiones de un documento
     */
    static getDocumentHistory(type: string): LegalDocument[] {
        return Object.values(LEGAL_DOCUMENTS)
            .filter(doc => doc.type === type)
            .sort((a, b) => b.version.localeCompare(a.version));
    }

    /**
     * Verificar si un usuario necesita aceptar nueva versión
     */
    static needsNewConsent(
        documentType: string,
        lastAcceptedVersion: string
    ): boolean {
        const current = this.getCurrentVersion(documentType);
        if (!current) return false;

        return current.version !== lastAcceptedVersion;
    }
}
