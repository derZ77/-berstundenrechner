
const CACHE_NAME = "ueberstunden-cache-v2";// Update v1 -> v2
const OFFLINE_URLS = [
  "./",
  "index.html",
  "libs/jspdf.umd.min.js",
  "icon-192x192.png",
  "icon-512x512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(response => {
      return response || fetch(event.request);
    }).catch(() => {
      return caches.match("index.html");
    })
  );
});
