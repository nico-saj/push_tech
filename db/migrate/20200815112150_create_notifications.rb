class CreateNotifications < ActiveRecord::Migration[6.0]
  def change
    create_table :notifications do |t|
      t.string :endpoint
      t.string :p256dh
      t.string :auth
    end
  end
end
