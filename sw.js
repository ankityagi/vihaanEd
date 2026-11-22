/* Offline support, so this site works on a flight or with bad Wi-Fi.
   - The first visit saves every file listed below; each later visit with internet refreshes them.
   - With internet, files come fresh from the site (so new quests show up as usual).
     With no internet, or Wi-Fi that is connected but not working, the saved copy is used
     after a short wait.
   - Google Fonts are saved the first time they load; without them the site uses a plain font.
   - Progress uploads (GitHub) are never touched here: they wait in the site's own queue. */
const CACHE = 'vihaan-offline-v1';
const FONTS = 'vihaan-fonts';
const FILES = ["/", "/index.html", "/playcode.js", "/admin.html"];
const NET_WAIT_MS = 3000;
let slowUntil = 0; // after the site fails to answer, use saved copies straight away for a short while

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.all(FILES.map(async (f) => {
      try {
        const res = await fetch(new Request(f, { cache: 'reload' }));
        if (res.ok) await cache.put(f, res);
      } catch { /* saved on a later visit */ }
    }));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((n) => n.startsWith('vihaan-') && n !== CACHE && n !== FONTS).map((n) => caches.delete(n)));
    await self.clients.claim();
  })());
});

const savedCopy = async (req) => {
  const cache = await caches.open(CACHE);
  const url = new URL(req.url);
  return (await cache.match(url.pathname)) ||
    (req.mode === 'navigate' ? (await cache.match('/index.html')) || (await cache.match('/')) : undefined);
};

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith((async () => {
      const cache = await caches.open(FONTS);
      const hit = await cache.match(req);
      if (hit) return hit;
      try {
        const res = await fetch(req);
        if (res.ok || res.type === 'opaque') cache.put(req, res.clone());
        return res;
      } catch {
        return Response.error();
      }
    })());
    return;
  }
  if (url.origin !== self.location.origin || url.pathname === '/sw.js') return;

  // fresh from the site when it answers in time, saved copy otherwise
  event.respondWith((async () => {
    if (Date.now() < slowUntil) {
      const hit = await savedCopy(req);
      if (hit) return hit;
    }
    const net = fetch(req).then(async (res) => {
      if (!res.ok || res.type !== 'basic') throw new Error('not a real answer');
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(url.pathname, copy)).catch(() => {});
      return res;
    });
    net.catch(() => {});
    const late = new Promise((r) => setTimeout(r, NET_WAIT_MS)).then(() => savedCopy(req));
    try {
      const res = await Promise.race([net.then((r) => ({ r, fresh: true })), late.then((s) => (s ? { r: s, fresh: false } : net.then((r) => ({ r, fresh: true }))))]);
      if (!res.fresh) slowUntil = Date.now() + 30000;
      if (res.r) return res.r;
    } catch { /* use the saved copy */ }
    slowUntil = Date.now() + 30000;
    return (await savedCopy(req)) || (await net.catch(() => null)) || Response.error();
  })());
});
