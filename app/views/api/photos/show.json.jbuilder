json.extract! @photo, :id, :user_id, :album_id, :description, :title
json.image_url asset_path(@photo.image.url(:original))


json.comments @photo.comments do |comment|
  json.extract! comment, :user_id, :content, :updated_at, :created_at
end
