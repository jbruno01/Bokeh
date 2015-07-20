json.array! @photos do |photo|
  json.extract! photo, :id, :album_id, :user_id, :title, :description
  json.image_url asset_path(photo.image.url(:original))
end
