        /*    
        @licstart  The following is the entire license notice for the 
        JavaScript code in this page.

        Copyright (C) 2019  Bonjour

        The JavaScript code in this page is free software: you can
        redistribute it and/or modify it under the terms of the GNU
        General Public License (GNU GPL) as published by the Free Software
        Foundation, either version 3 of the License, or (at your option)
        any later version.  The code is distributed WITHOUT ANY WARRANTY;
        without even the implied warranty of MERCHANTABILITY or FITNESS
        FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

        As additional permission under GNU GPL version 3 section 7, you
        may distribute non-source (e.g., minimized or compacted) forms of
        that code without the copy of the GNU GPL normally required by
        section 4, provided you include this license notice and a URL
        through which recipients can access the Corresponding Source.   


        @licend  The above is the entire license notice
        for the JavaScript code in this page.
        */
// serviceworker.js
const cacheName = "PWAv1";
const filesToCache = ['index.html' , 'buttons.js', 'style.css' , 'main.js' , 'roadworker.js', 'rivalsworker.js', 'colisionsworker.js' , 'favicon.png', 'favicon40.png', 'favicon192.png', 'favicon512.png', 'manifest.manifest', 'car.png', 'car1.png', 'car2.png', 'car3.png', 'car4.png', 'car5.png', 'car6.png', 'car7.png', 'car8.png', 'car9.png', 'signal_l.png', 'signal_r.png'];

self.addEventListener("install", function(event) {
  // Perform install steps
  console.log("[Servicework] Install");
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("[ServiceWorker] Caching app shell");
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("activate", function(event) {
  console.log("[Servicework] Activate");
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log("[ServiceWorker] Removing old cache shell", key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log("[ServiceWorker] Fetch");
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        let responseClone = response.clone();
        caches.open(cacheName).then(function(cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      });
    }).catch(function() {
      return caches.match(filesToCache);
    })
  );
});


