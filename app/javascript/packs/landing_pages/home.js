import { ready } from "../push_notification/serviceworker-companion"
import { subscribe } from "../push_notification/subscription"
import { sendNotification } from "../push_notification/notification"
import { checkPermissions } from "../push_notification/validation"

$(document).ready(() => {
  checkPermissions()
  ready()

  $('#subscribe').on('click', subscribe)
  $('#send-message').on('click', sendNotification)
})
