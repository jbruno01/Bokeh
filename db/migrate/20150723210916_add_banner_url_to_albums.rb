class AddBannerUrlToAlbums < ActiveRecord::Migration
  def change
    add_column :albums, :banner_url, :string, default: "/default_banner.jpg"
  end
end
