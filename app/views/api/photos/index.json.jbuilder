json.array! @photos do |photo|
  json.extract! photo, :id, :user_id, :title, :description
  json.user photo.user, :name, :id, :avatar_url
  json.medium_url asset_path(photo.image.url(:medium))
end
