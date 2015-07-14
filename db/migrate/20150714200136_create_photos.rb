class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.integer  :album_id
      t.integer  :user_id, null: false
      t.text     :title
      t.text     :description

      t.timestamps
    end

    add_index :photos, :user_id
    add_index :photos, :album_id
  end
end
