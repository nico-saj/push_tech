const subscribe = () => {
  navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
    const pushManager = serviceWorkerRegistration.pushManager

    pushManager.getSubscription().then((subscription) => {
      if (subscription) {
        refreshSubscription(pushManager, subscription)
      } else {
        pushManagerSubscribe(pushManager)
      }
    })
  })
}

const refreshSubscription = (pushManager, subscription) => {
  return subscription.unsubscribe().then(() => {
    pushManagerSubscribe(pushManager)
  })
}

const pushManagerSubscribe = (pushManager) => {
  pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: window.vapidPublicKey
  })
}

const getSubscription = () => {
  return navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
    return serviceWorkerRegistration.pushManager.getSubscription()
  })
}

export { subscribe, getSubscription }
