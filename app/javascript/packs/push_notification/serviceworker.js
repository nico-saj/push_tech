self.addEventListener("push", (event) => {
  let title = (event.data && event.data.text()) || "Hola from a push notification"
  let body = "We have received a push message"
  let tag = "push-simple-demo-notification-tag"
  var icon = '/assets/turtle-logo-192x192.png'

  event.waitUntil(
    self.registration.showNotification(title, { body, icon, tag })
  )
})
