json.array! @photos do |photo|
  json.extract! photo, :id, :album_id, :user_id, :title, :description
  json.original_url asset_path(photo.image.url(:original))
  json.medium_url asset_path(photo.image.url(:medium))

end
