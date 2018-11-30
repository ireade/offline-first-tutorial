// Set a name for the current cache
const precacheVersion = 1;
const precacheName = 'precache-v' + precacheVersion;

// Default files to always cache
var precacheFiles = [
  "/assets/images/profile.png",
  "/assets/images/profile.webp",
  "/assets/built/offline.css",
  "/offline/"
];

self.addEventListener('install', (e) => {
  console.log('[ServiceWorker] Installed');

  self.skipWaiting();

  e.waitUntil(
    caches.open(precacheName).then((cache) => {
      console.log('[ServiceWorker] Precaching files');
      return cache.addAll(precacheFiles);
    }) // end caches.open()
  ); // end e.waitUntil
});

self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activated');

  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.map((thisCacheName) => {

        if (thisCacheName.includes("precache") && thisCacheName !== precacheName) {
          console.log('[ServiceWorker] Removing cached files from old cache - ', thisCacheName);
          return caches.delete(thisCacheName);
        }

      }));
    }) // end caches.keys()
  ); // end e.waitUntil
});

self.addEventListener('fetch', (e) => {

  // Ignore resources from external sources
  if (!e.request.url.includes(e.request.referrer)) {
    e.respondWith(fetch(e.request));
    return;
  }

  e.respondWith(
    caches.match(e.request)
      .then((response) => {

        if (response) {
          console.log("[ServiceWorker] Found in cache", e.request.url);
          return response;
        }

        return fetch(e.request)
          .then((fetchResponse) => fetchResponse)
          .catch((err) => {
            const isHTMLPage = e.request.method === "GET" && e.request.headers.get("accept").includes("text/html");
            if (isHTMLPage) return caches.match("/offline/");
          })

      }) // end caches.match(e.request)
  ); // end e.respondWith
});