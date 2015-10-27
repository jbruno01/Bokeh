json.extract! @tagging, :id, :photo_id, :tag_id
json.tag_name @tagging.tag[:name]
