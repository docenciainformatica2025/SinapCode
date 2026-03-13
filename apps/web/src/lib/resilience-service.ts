/**
 * Resilience Service: Data Persistence & Sync
 * 
 * Este servicio asegura que los datos crÃ­ticos generados "en el campo" 
 * no se pierdan si la seÃ±al de internet es inestable o nula.
 */

export interface PendingAction {
    id: string;
    url: string;
    method: string;
    body: any;
    headers: any;
    timestamp: number;
    retries: number;
}

class PersistenceService {
    private dbName = 'SinapCode_OfflineStore';
    private storeName = 'pending_actions';
    private db: IDBDatabase | null = null;

    constructor() {
        if (typeof window !== 'undefined') {
            this.initDB();
            window.addEventListener('online', () => this.syncAll());
        }
    }

    private initDB(): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);
            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: 'id' });
                }
            };
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Encola una acciÃ³n fallida para reintento automÃ¡tico
     */
    async enqueue(url: string, method: string, body: any, headers: any = {}): Promise<string> {
        const action: PendingAction = {
            id: crypto.randomUUID(),
            url,
            method,
            body,
            headers,
            timestamp: Date.now(),
            retries: 0
        };

        await this.saveAction(action);
        return action.id;
    }

    private async saveAction(action: PendingAction): Promise<void> {
        if (!this.db) await this.initDB();
        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.put(action);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Intenta sincronizar todas las acciones pendientes
     */
    async syncAll(): Promise<void> {
        if (!navigator.onLine) return;

        const actions = await this.getAllActions();
        if (actions.length === 0) return;

        console.log(`[Resilience] Sincronizando ${actions.length} acciones pendientes...`);

        for (const action of actions) {
            try {
                const response = await fetch(action.url, {
                    method: action.method,
                    headers: {
                        ...action.headers,
                        'Content-Type': 'application/json',
                        'X-Offline-Sync': 'true'
                    },
                    body: JSON.stringify(action.body)
                });

                if (response.ok) {
                    await this.removeAction(action.id);
                    console.log(`[Resilience] AcciÃ³n ${action.id} sincronizada con Ã©xito.`);
                } else {
                    await this.incrementRetry(action);
                }
            } catch (error) {
                console.error(`[Resilience] Error al sincronizar ${action.id}:`, error);
            }
        }
    }

    private async getAllActions(): Promise<PendingAction[]> {
        if (!this.db) await this.initDB();
        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction(this.storeName, 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    private async removeAction(id: string): Promise<void> {
        const transaction = this.db!.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);
        store.delete(id);
    }

    private async incrementRetry(action: PendingAction): Promise<void> {
        action.retries++;
        if (action.retries > 5) {
            // Descartar tras 5 intentos fallidos (evita bucles infinitos en errores 400s)
            await this.removeAction(action.id);
        } else {
            await this.saveAction(action);
        }
    }
}

export const resilienceService = new PersistenceService();
