/* Zorgt dat de app installeerbaar is en ook zonder internet opent. */
const CACHE = "letterbord-v1";
const CORE = [
  "./", "index.html", "manifest.webmanifest", "surahs.js", "firebase-config.js",
  "fonts/kfgqpc-hafs.otf",
  "fonts/baloo-2-latin-500-normal.woff2", "fonts/baloo-2-latin-600-normal.woff2",
  "fonts/baloo-2-latin-700-normal.woff2", "fonts/baloo-2-latin-800-normal.woff2",
  "fonts/pixelify-sans-latin-500-normal.woff2", "fonts/pixelify-sans-latin-700-normal.woff2",
  "icons/icon-192.png", "icons/icon-512.png"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  /* Firebase-database en inloggen: altijd rechtstreeks (Firebase regelt zelf offline). */
  if (/googleapis\.com$|firebaseapp\.com$/.test(url.hostname)) return;
  const same = url.origin === self.location.origin;
  const fresh = same && (req.mode === "navigate" || /\.(html|js|webmanifest)$/.test(url.pathname) || url.pathname.endsWith("/"));
  if (fresh) {
    /* Eerst internet (nieuwste versie), anders de bewaarde versie. */
    e.respondWith(fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(new Request(url.origin + url.pathname), copy)).catch(() => {}); }
      return res;
    }).catch(() => caches.match(req, {ignoreSearch: true}).then(r => r || caches.match("index.html"))));
    return;
  }
  /* Lettertypes, icoontjes en Firebase-code: eerst uit de bewaarde versie. */
  e.respondWith(caches.match(req, {ignoreSearch: true}).then(r => r || fetch(req).then(res => {
    if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  })));
});
