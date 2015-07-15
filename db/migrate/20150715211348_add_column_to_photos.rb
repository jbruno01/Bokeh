class AddColumnToPhotos < ActiveRecord::Migration
  def change
     add_column :photos, :image_url, :string, null: false
  end
end
