json.extract! @photo, :id, :user_id, :album_id, :description, :title, :image_url

json.comments @photo.comments do |comment|
  json.extract! comment, :user_id, :content, :update_at, :created_at
end
