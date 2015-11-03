json.partial! "api/photos/photo", photo: @photo

json.taggings @photo.taggings do |tagging|
  json.extract! tagging, :id, :photo_id, :tag_id
  json.tag_name tagging.tag[:name]
end
