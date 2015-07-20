json.extract! @photo, :id, :user_id, :album_id, :description, :image_file_name
json.image_url asset_path(@photo.image.url(:original))
json.user @photo.user, :name


json.comments @photo.comments do |comment|
  json.extract! comment, :user_id, :content, :updated_at, :created_at
  json.user comment.user, :name
end
