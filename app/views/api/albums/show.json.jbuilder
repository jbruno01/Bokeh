json.extract! @album, :id, :user_id, :title, :description
json.photos @album.photos do |photo|
  json.extract! photo, :id, :user_id, :album_id, :title, :description, :image_url
end
