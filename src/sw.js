// workbox.setConfig({ debug: true });
self.addEventListener('message', (event) => {
  console.log(event);
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
const arr = self.__precacheManifest.filter((obj) => {
  if ((obj.url && obj.url.indexOf('/src/projects/player/sound/') === -1) && (obj.url.indexOf('img/') === -1 || obj.url.indexOf('img/covers') !== -1)) {
    return true;
  }
  return false;
});
console.log(arr);
self.__precacheManifest = [].concat(arr || []);

const precacheController = new workbox.precaching.PrecacheController('precache-list');
precacheController.addToCacheList(self.__precacheManifest);

self.addEventListener('install', (event) => {
  event.waitUntil(() => precacheController.install());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(precacheController.activate());
});

// Make sure to return a specific response for all navigation requests.
// Since we have a SPA here, this should be index.html always.
// https://stackoverflow.com/questions/49963982/vue-router-history-mode-with-pwa-in-offline-mode
workbox.routing.registerNavigationRoute('/index.html');

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-stylesheets',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  /^https:\/\/cdnjs\.cloudflare\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'ionicons',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 60,
      }),
    ],
  }),
);

workbox.routing.registerRoute(/tachyons.min.css$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'tachyons',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 60,
      }),
    ],
  }));

workbox.routing.registerRoute(/p5.min.js$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'p5',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 60,
      }),
    ],
  }));

workbox.routing.registerRoute(/\.(?:png|gif|jpg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200],
      }),
      new workbox.rangeRequests.Plugin(),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 30,
        maxEntries: 60,
      }),
    ],
  }));

workbox.routing.registerRoute(/\.(?:m4a)$/,
  new workbox.strategies.NetworkOnly({
    cacheName: 'm4a',
  }));

workbox.routing.registerRoute(
  ({ request }) => request.destination === 'script',
  new workbox.strategies.CacheFirst({
    cacheName: 'static-resources',
  }),
);

const { setDefaultHandler, setCatchHandler } = workbox.routing;
const { StaleWhileRevalidate } = workbox.strategies;

// Use a stale-while-revalidate strategy for all other requests.
setDefaultHandler(new StaleWhileRevalidate());

// This "catch" handler is triggered when any of the other routes fail to
// generate a response.
setCatchHandler(({ event }) => {
  // The FALLBACK_URL entries must be added to the cache ahead of time, either
  // via runtime or precaching. If they are precached, then call
  // `matchPrecache(FALLBACK_URL)` (from the `workbox-precaching` package)
  // to get the response from the correct cache.
  //
  // Use event, request, and url to figure out how to respond.
  // One approach would be to use request.destination, see
  // https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c
  switch (event.request.destination) {
    case 'document':
      // If using precached URLs:
      // return matchPrecache(FALLBACK_HTML_URL);
      return precacheController.matchPrecache('index.html');
      break;
    case 'image':
      // If using precached URLs:
      // return matchPrecache(FALLBACK_IMAGE_URL);
      return precacheController.matchPrecache('/');
      break;
    case 'font':
      // If using precached URLs:
      // return matchPrecache(FALLBACK_FONT_URL);
      return precacheController.matchPrecache('/');
      break;
    default:
      return Response.error();
  }
});
