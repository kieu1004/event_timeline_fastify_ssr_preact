// @ts-ignore
const CACHE_NAME = "version-1"
// @ts-ignore
const urlsToCache = ["index.html"]

self.addEventListener('install', (event) => {
  // @ts-ignore
  event.waitUntil(
    // @ts-ignore
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll([
        'assets/clip.png',
        'assets/more.png',
        'assets/check.png',
        'assets/start-152x152.png',
        'manifest.json',
        'index.html',
      ])
    })
  )
})

self.addEventListener('fetch', (event) => {
  // @ts-ignore
  event.respondWith(
    // @ts-ignore
    caches.match(event.request).then((resq) => {
      if (resq) {
        return resq;
      }
      // @ts-ignore
      return fetch(event.request);
    })
  );
});