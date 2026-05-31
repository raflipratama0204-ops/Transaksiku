const CACHE_NAME = 'transaksiku-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './Logo Transaksiku.png',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Tahap instalasi & penyimpanan aset ke memori HP
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Mengambil aset dari memori lokal (bisa diakses offline & instan)
self.addEventListener('fetch', (event) => {
  event.waitUntil(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});