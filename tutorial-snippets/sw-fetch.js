
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
  