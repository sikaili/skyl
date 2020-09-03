// workbox.setConfig({ debug: true });

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
// workbox.core.clientsClaim(); // Vue CLI 4 and Workbox v4

self.__precacheManifest = [].concat(self.__precacheManifest || []);
const arr = self.__precacheManifest.filter((obj) => {
  if ((obj.url && obj.url.indexOf('/src/projects/player/sound/') === -1) && (obj.url.indexOf('img/') === -1 || obj.url.indexOf('img/covers') !== -1)) {
    return true;
  }
  return false;
});
self.__precacheManifest = [].concat(arr || []);
const precacheController = new workbox.precaching.PrecacheController();
precacheController.addToCacheList(self.__precacheManifest);

self.addEventListener('install', (event) => {
  event.waitUntil(precacheController.install());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(precacheController.activate());
});

// Make sure to return a specific response for all navigation requests.
// Since we have a SPA here, this should be index.html always.
// https://stackoverflow.com/questions/49963982/vue-router-history-mode-with-pwa-in-offline-mode
workbox.routing.registerNavigationRoute('/index.html');

// Setup cache strategy for Google Fonts. They consist of two parts, a static one
// coming from fonts.gstatic.com (strategy CacheFirst) and a more ferquently updated on
// from fonts.googleapis.com. Hence, split in two registerroutes

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

// workbox.routing.registerRoute(
//   ({ request }) => request.destination === 'script'
//                     || request.destination === 'style',
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: 'static-resources',
//   }),
// );

const cacheName = 'assets-cache';

workbox.routing.registerRoute(/\.(?:png|gif|jpg|mp3|m4a|mp4)$/,
  new workbox.strategies.CacheFirst({
    cacheName,
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
