json.results do
  json.array! @search_results do |search_result|
    if search_result.searchable_type == "photo"
      json.partial! "api/posts/post", post: search_result.searchable
      json._type "Post"
    else
      json.partial! "api/users/user", user: search_result.searchable
      json._type "User"
    end
  end
end
