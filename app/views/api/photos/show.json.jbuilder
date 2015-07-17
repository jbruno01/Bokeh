json.extract! @photo, :id, :user_id, :album_id, :description, :title, :image_url

json.comments @photo.comments do |comment|
  json.extract! comment, :user_id, :content, :updated_at, :created_at
end
