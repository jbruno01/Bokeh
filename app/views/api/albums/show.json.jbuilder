json.extract! @album, :id, :user_id, :title, :description, :banner_url
json.photos @album.photos do |photo|
  json.extract! photo, :id, :user_id, :album_id, :title, :description
  json.medium_url asset_path(photo.image.url(:medium))
end
