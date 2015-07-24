json.array! @albums do |album|
  json.extract! album, :id, :user_id, :title, :description
  json.photos album.photos do |photo|
    json.medium_url asset_path(photo.image.url(:medium))
end
