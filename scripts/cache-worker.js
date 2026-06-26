const pwaCache = "pwa_cache";
const precachedResources = [
    "/bilibili-subtitles-converter/",
    "/bilibili-subtitles-converter/index.html",
    "/bilibili-subtitles-converter/index.js",
    "/bilibili-subtitles-converter/styles.css",
    "/bilibili-subtitles-converter/manifest.json",
    "/bilibili-subtitles-converter/icons/pwa-icon-512.png",
    "/bilibili-subtitles-converter/scripts/converter.js",
    "/bilibili-subtitles-converter/scripts/dom-handler.js",
    "/bilibili-subtitles-converter/scripts/cache-worker.js"
];

async function precache() {
    const cache = await caches.open(pwaCache);
    return cache.addAll(precachedResources);
}

async function cacheFirst(request) {
    const responseCached = await caches.match(request);
    if (responseCached) 
    return responseCached;

    // if response not matched, fetch and add to cache as well
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(pwaCache);
            cache.put(request, response.clone());
        }
        return response;
    } catch(error) {
        return Response.error();
    }

}


self.addEventListener("install", (event) => {
    event.waitUntil(precache());
});


self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);
    if (precachedResources.includes(url.pathname)) {
        event.respondWith(cacheFirst(event.request));
    }
});


self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)));
});