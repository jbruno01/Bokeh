json.extract! @search_results, :total_count
json.results do
  json.array! @search_results do |search_result|
    if search_result.searchable_type == "Photo"
      json.partial! "api/photos/photo", photo: search_result.searchable
      json.id "photo-#{search_result.searchable.id}"
      json.real_id search_result.searchable.id
      json._type "Photo"
    elsif search_result.searchable_type == "User"
      json.partial! "api/users/user", user: search_result.searchable
      json.id "user-#{search_result.searchable.id}"
      json.real_id search_result.searchable.id
      json._type "User"
    else
      json.partial! "api/tags/tag", tag: search_result.searchable
      json.id "tagging-#{search_result.searchable.id}"
      json.real_id search_result.searchable.id
      json._type "Tagging"
    end
  end
end
