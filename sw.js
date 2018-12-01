/* **********************
 * 
 * TODO
 *  : boilerplate from tutorial-snippets/sw-boilerplate.js
 *  
 *  : serve cached article pages when offline
 *  : redirect to /offline/ for non-cached pages
 * 
 ********************** */

const precacheVersion = 1;
const precacheName = 'precache-v' + precacheVersion;
const precacheFiles = [
    "/offline/",
    "/assets/built/offline.css"
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
    e.respondWith(
        caches.match(e.request).then((cachedResponse) => {

            if (cachedResponse) {
                console.log("Found in cache!")
                return cachedResponse;
            }

            return fetch(e.request)
                .then((fetchResponse) => fetchResponse)
                .catch((err) => {
                    const isHTMLPage = e.request.method == "GET" && e.request.headers.get("accept").includes("text/html");
                    if (isHTMLPage) return caches.match("/offline/");
                });

        })
    );
});
