export const checkPermissions = () => {
  if (!window.PushManager) {
    console.warn('Push messaging is not supported in your browser')
  }

  if (!ServiceWorkerRegistration.prototype.showNotification) {
    console.warn('Notifications are not supported in your browser')
    return;
  }

  if (Notification.permission !== 'granted') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        console.log('Permission to receive notifications granted!')
      }
    })
    return
  } else {
    console.log('Permission to receive notifications granted!')
  }
}
