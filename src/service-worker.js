workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.routing.registerRoute(
  /static\/images\/icon_.*\.png/,
  new workbox.strategies.CacheFirst(),
);
