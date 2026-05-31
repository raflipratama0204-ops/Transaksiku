const CACHE_NAME = 'transaksiku-cache-v2'; // Versi diubah ke v2 untuk memaksa pembaruan
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './logo.png',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Tahap instalasi & penyimpanan aset ke memori HP
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  // Memaksa Service Worker baru untuk langsung aktif
  self.skipWaiting();
});

// Membersihkan cache lama jika ada pembaruan
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Mengambil aset dari memori lokal
self.addEventListener('fetch', (event) => {
  event.waitUntil(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});