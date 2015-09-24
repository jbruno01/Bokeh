json.extract! @search_results, :total_count
json.results do
  json.array! @search_results do |search_result|
    if search_result.searchable_type == "Photo"
      json.partial! "api/photos/photo", photo: search_result.searchable
      json.id "photo-#{search_result.searchable.id}"
      json.real_id search_result.searchable.id
      json._type "Photo"
    else
      json.partial! "api/users/user", user: search_result.searchable
      json.id "user-#{search_result.searchable.id}"
      json.real_id search_result.searchable.id
      json._type "User"
    end
  end
end
