json.extract! photo, :id, :user_id, :album_id, :description, :image_file_name, :title
json.original_url asset_path(photo.image.url(:original))
json.medium_url asset_path(photo.image.url(:medium))
json.small_url asset_path(photo.image.url(:small))
json.user photo.user, :name, :id


json.comments photo.comments do |comment|
  json.extract! comment, :id, :user_id, :content, :updated_at, :created_at, :photo_id
  json.user comment.user, :name, :avatar_url
end
