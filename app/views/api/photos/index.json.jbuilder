json.array! @photos do |photo|
  json.extract! photo, :id, :album_id, :user_id, :title, :description, :image_url
end
