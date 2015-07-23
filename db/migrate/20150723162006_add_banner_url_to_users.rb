class AddBannerUrlToUsers < ActiveRecord::Migration
  def change
    add_column :users, :banner_url, :string, default: "/default_banner.jpg"
  end
end
