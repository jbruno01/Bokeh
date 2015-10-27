json.extract! @tagging, :id, :photo_id, :tag_id
json.tag @tagging.tag, :name
