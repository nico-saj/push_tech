import { ready } from "../serviceworker-companion"

const subscribe = () => {
  navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
    const pushManager = serviceWorkerRegistration.pushManager
    pushManager.getSubscription().then((subscription) => {
      if (subscription) {
        refreshSubscription(pushManager, subscription);
      } else {
        pushManagerSubscribe(pushManager);
      }
    })
  });
}

const refreshSubscription = (pushManager, subscription) => {
  console.log('Refreshing subscription');
  return subscription.unsubscribe().then(() => {
    pushManagerSubscribe(pushManager);
  });
}

const pushManagerSubscribe = (pushManager) => {
  console.log('Subscribing started...', window.vapidPublicKey);

  pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: window.vapidPublicKey
  }).then(() => { console.log('Subcribing finished: success!')})
  .catch((e) => {
    if (Notification.permission === 'denied') {
      console.warn('Permission to send notifications denied');
    } else {
      console.error('Unable to subscribe to push', e);
    }
  });
}

const getSubscription = () => {
  return navigator.serviceWorker.ready
  .then((serviceWorkerRegistration) => {
    return serviceWorkerRegistration.pushManager.getSubscription()
    .catch((error) => {
      console.warn('Error during getSubscription()', error);
    });
  });
}

const sendNotification = () => {
  getSubscription().then((subscription) => {
    return fetch("/notifications/push", {
      headers: formHeaders(),
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ subscription: subscription.toJSON(), message: $('#message').val() })
    }).then((response) => {
      console.log("Push response", response);
      if (response.status >= 500) {
        console.error(response.statusText);
        alert("Sorry, there was a problem sending the notification. Try resubscribing to push messages and resending.");
      }
    })
    .catch((e) => {
      console.error("Error sending notification", e);
    });
  })
}

const formHeaders = () => {
  return new Headers({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token': authenticityToken(),
  });
}

const authenticityToken = () => {
  return document.querySelector('meta[name=csrf-token]').content;
}

$(document).ready(() => {
  ready()

  $('#subscribe').on('click', subscribe)
  console.log('send-message', $('#send-message'))
  $('#send-message').on('click', sendNotification)

  if (!window.PushManager) {
    console.warn('Push messaging is not supported in your browser');
  }

  if (!ServiceWorkerRegistration.prototype.showNotification) {
    console.warn('Notifications are not supported in your browser');
    return;
  }

  if (Notification.permission !== 'granted') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        console.log('Permission to receive notifications granted!');
      }
    });
    return;
  } else {
    console.log('Permission to receive notifications granted!');
  }
})
