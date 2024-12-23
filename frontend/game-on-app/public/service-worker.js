const CACHE_NAME = 'dashboard-cache-v1';
const API_CACHE_NAME = 'slots-api';
const urlsToCache = [
    '/customer/dashboard',
    '/static/js/main.chunk.js',
    '/static/js/0.chunk.js',
    '/static/js/bundle.js',
    '/index.html',
    '/'
];

const API_URL = 'http://localhost:3000';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    if (url.origin === location.origin) {
        // Handle requests for static assets
        event.respondWith(
            caches.match(event.request)
                .then((response) => response || fetch(event.request))
        );
    } else if (url.origin === API_URL) {
        // Handle API requests
        event.respondWith(
            caches.open(API_CACHE_NAME).then((cache) => {
                return fetch(event.request).then((response) => {
                    cache.put(event.request, response.clone());
                    return response;
                }).catch(() => {
                    return cache.match(event.request);
                });
            })
        );
    }
});