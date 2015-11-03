json.extract! tag, :id, :name
json.photos tag.photos do |photo|
  json.extract! photo, :id
  json.small_url asset_path(photo.image.url(:small))
end
