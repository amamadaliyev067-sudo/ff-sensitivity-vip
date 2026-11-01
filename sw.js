/* Oddiy service worker: avval internetdan oladi (rasmlar yangilansa darhol ko'rinadi), internet bo'lmasa saqlangan sahifani ko'rsatadi */
var C="ffsensi-v1";
self.addEventListener("install",function(e){self.skipWaiting();e.waitUntil(caches.open(C).then(function(c){return c.addAll(["./"])}).catch(function(){}))});
self.addEventListener("activate",function(e){e.waitUntil(self.clients.claim())});
self.addEventListener("fetch",function(e){
 if(e.request.method!=="GET")return;
 e.respondWith(fetch(e.request).then(function(r){
  if(e.request.mode==="navigate"){var cp=r.clone();caches.open(C).then(function(c){c.put("./",cp)})}
  return r}).catch(function(){return caches.match(e.request).then(function(m){return m||caches.match("./")})}))});
