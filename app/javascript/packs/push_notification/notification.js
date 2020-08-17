import { getSubscription } from "./subscription"

export const sendNotification = () => {
  getSubscription().then((subscription) => {
    return fetch("/notifications/push", {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ subscription: subscription.toJSON(), message: $('#message').val() })
    })
  })
}
