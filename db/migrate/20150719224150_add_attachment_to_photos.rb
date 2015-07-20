class AddAttachmentToPhotos < ActiveRecord::Migration
  def change
    change_table :photos do |t|
      t.attachment :image
    end
  end
end
