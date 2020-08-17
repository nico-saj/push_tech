class NotificationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def push
    @notification = Notification.new(notification_params)
    @notification.save
    send_message
  end

  private

  def send_message
    Webpush.payload_send(
      message: message,
      endpoint: @notification.endpoint,
      p256dh: @notification.p256dh,
      auth: @notification.auth,
      vapid: {
        subject: 'mailto:mykola.saienko@rubygarage.org',
        public_key: ENV['VAPID_PUBLIC_KEY'],
        private_key: ENV['VAPID_PRIVATE_KEY']
      },
      ssl_timeout: 5,
      open_timeout: 5,
      read_timeout: 5
    )
  end

  def jsonbody
    @jsonbody ||= JSON.parse(request.body.read)
  end

  def notification_params
    {
      endpoint: jsonbody["subscription"]["endpoint"],
      p256dh: jsonbody["subscription"]["keys"]["p256dh"],
      auth: jsonbody["subscription"]["keys"]["auth"]
    }
  end

  def message
    jsonbody["message"]
  end
end
