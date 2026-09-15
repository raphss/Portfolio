const CACHE_NAME = 'portfolio-storage-assets-v1';

function isSupabaseStorageAsset(request) {
  if (request.method !== 'GET') return false;

  const url = new URL(request.url);
  return (
    url.hostname.endsWith('.supabase.co') &&
    url.pathname.startsWith('/storage/v1/object/public/')
  );
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  if (cached) return cached;

  const response = await fetch(request);

  if (response.ok || response.type === 'opaque') {
    try {
      await cache.put(request, response.clone());
    } catch {
      // Storage quota failures must not prevent the image from being shown.
    }
  }

  return response;
}

globalThis.addEventListener('install', (event) => {
  event.waitUntil(globalThis.skipWaiting());
});

globalThis.addEventListener('activate', (event) => {
  event.waitUntil(globalThis.clients.claim());
});

globalThis.addEventListener('fetch', (event) => {
  if (isSupabaseStorageAsset(event.request)) {
    event.respondWith(cacheFirst(event.request));
  }
});
