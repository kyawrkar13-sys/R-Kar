const cacheName = "amber-solar-v1";

const files = [
"index.html",
"style.css",
"script.js",
"manifest.json"
];


self.addEventListener("install", function(e){

e.waitUntil(

caches.open(cacheName)
.then(function(cache){

return cache.addAll(files);

})

);

});



self.addEventListener("fetch", function(e){

e.respondWith(

caches.match(e.request)
.then(function(response){

return response || fetch(e.request);

})

);

});
