json.extract! @album, :id, :user_id, :title, :description
json.photos @album.photos do |photo|
  json.extract! photo, :id, :user_id, :album_id, :title, :description
  json.image_url asset_path(photo.image.url(:original))
end
