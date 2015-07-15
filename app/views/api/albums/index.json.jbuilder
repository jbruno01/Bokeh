json.array! @albums do |album|
  json.extract! album, :id, :user_id, :title, :description
end
