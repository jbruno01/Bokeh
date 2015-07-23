class ChangeAvatarUrlColumnInUsers < ActiveRecord::Migration
  def change
    remove_column :users, :avatar_url
    add_column :users, :avatar_url, :string, default: "/default_avatar.jpg"
  end
end
