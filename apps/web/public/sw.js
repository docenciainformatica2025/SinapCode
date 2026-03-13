const CACHE_NAME = 'sinapcode-cache-v2';
const ASSETS_TO_CACHE = [
    '/',
    '/site.webmanifest',
    '/favicon.png',
    '/apple-touch-icon.png',
    '/grid.svg',
    '/branding/logo-minimal.svg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Solo cachear GET requests
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then((response) => {
                // No cachear si no es un OK o si es una API interna
                if (!response || response.status !== 200 || response.type !== 'basic' || event.request.url.includes('/api/')) {
                    return response;
                }

                // Estrategia Stale-While-Revalidate para fuentes y scripts estáticos
                const isStaticAsset = event.request.url.match(/\.(woff2?|js|css|svg|webp|png|jpg)$/);

                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                return response;
            }).catch(() => {
                // Offline fallback mejorado
                if (event.request.mode === 'navigate') {
                    return caches.match('/');
                }
                return new Response('Offline content not available', { status: 404 });
            });
        })
    );
});
