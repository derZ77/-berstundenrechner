
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('ueberstunden-cache').then(function(cache) {
      return cache.addAll([
        './ueberstunden_app_block5_hinweis.html',
        './icon.png',
        './manifest.json'
      ]);
    })
  );
});
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
