self.addEventListener("push", (event) => {
  // @ts-expect-error type issue
  if (event.data) {
    // @ts-expect-error type issue
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || "/icon.png",
      badge: "/badge.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: "2",
      },
    };
    // @ts-expect-error type issue
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notification click received.");
  // @ts-expect-error type issue
  event.notification.close();
  // @ts-expect-error type issue
  event.waitUntil(clients.openWindow("http://localhost:3000"));
});
