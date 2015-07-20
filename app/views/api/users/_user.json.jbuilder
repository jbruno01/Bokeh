json.extract! user, :id, :name, :email, :created_at
json.photos user.photos do |photo|
  json.extract! photo, :id, :user_id, :title, :description, :created_at
  json.image_url asset_path(photo.image.url(:original))
end

json.albums user.albums do |album|
  json.extract! album, :id, :title, :description, :created_at
end
