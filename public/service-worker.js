// @ts-ignore
const CACHE_NAME = "version-1"
// @ts-ignore
const urlsToCache = ["index.html"]

self.addEventListener('install', (event) => {
  // @ts-ignore
  event.waitUntil(
    // @ts-ignore
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll([
        'assets/clip.png',
        'assets/more.png',
        'assets/check.png',
        'assets/start-152x152.png',
        'manifest.json',
        'index.html',
      ])
    })
  )
})

self.addEventListener('fetch', (event) => {
  // @ts-ignore
  event.respondWith(
    // @ts-ignore
    caches.match(event.request).then((resq) => {
      if (resq) {
        return resq;
      }
      // @ts-ignore
      return fetch(event.request);
    })
  );
});






//Stores the port
//provide a communication channel between the SW and Client(app.js).
let getVersionPort;

//Data for update
const dataJob = []
// Set up channel with the same name as in app.js
// to send a message to all tabs or windows of the application at once.
const broadcast = new BroadcastChannel('ui-channel');

// Listen to the response
broadcast.onmessage = (event) => {
  if (event.data && event.data.type === 'UPDATE_UI') {
    // After sending the update to the broadcast channel, also send it to clients
    broadcast.postMessage({ payload: dataJob });
  }
};

// Listen to the request
self.addEventListener("message", (event) => {
  try {
    if (event.data && event.data.type === 'INIT_PORT') {
      getVersionPort = event.ports[0];
      console.log("Message port initialized");
    }

    if (event.data && event.data.type === 'UPDATE_UI') {
      getVersionPort.postMessage({ payload: dataJob });
      console.log("Update UI data sent to the main app");

      // Log dataJob after a delay of 10 seconds
      setTimeout(() => {
        console.log("Update UI after 10 seconds:", dataJob);
        // After sending the update to the main app, also send it to clients
        sendUpdateToClients();
      }, 10000);
    }
  } catch (error) {
    console.error('Error in service worker:', error);
  }
});

// Listen to the request
self.addEventListener("message", (event) => {
  try {
    if (event.data && event.data.type === 'INIT_PORT') {
      getVersionPort = event.ports[0];
      console.log("Message port initialized");
    }

    if (event.data && event.data.type === 'UPDATE_UI') {
      getVersionPort.postMessage({ payload: dataJob });
      console.log("Update UI data sent to the main app");

      // Broadcast the update to all clients
      broadcast.postMessage({ type: 'UPDATE_UI', payload: dataJob });

      // Log dataJob after a delay of 10 seconds
      setTimeout(() => {
        console.log("Update UI after 10 seconds:", dataJob);
        // After sending the update to the main app, also send it to clients
        sendUpdateToClients();
      }, 10000);
    }
  } catch (error) {
    console.error('Error in service worker:', error);
  }
});


//Send update data
function sendUpdateToClients() {
  // Listen to the request from the main app
  self.clients
    //Get a list of all clients (windows or tabs) that SW manage.
    .matchAll({
      includeUncontrolled: true,
      type: 'window',
    })
    .then((clients) => {
      if (clients && clients.length) {
        // Send a response - the clients array is ordered by last focused
        clients[0].postMessage({
          type: 'UPDATE_UI_CLIENTS',
          dataJob: dataJob,
        });
      }
    });
}