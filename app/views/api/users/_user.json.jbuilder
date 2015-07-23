json.extract! user, :id, :name, :email, :created_at, :avatar_url
json.photos user.photos do |photo|
  json.extract! photo, :id, :user_id, :title, :description, :created_at
  json.original_url asset_path(photo.image.url(:original))
  json.medium_url asset_path(photo.image.url(:medium))
end

json.albums user.albums do |album|
  json.extract! album, :id, :title, :description, :created_at, :user_id
end
