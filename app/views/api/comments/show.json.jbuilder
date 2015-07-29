json.extract! @comment, :id, :user_id, :photo_id, :content, :created_at
json.user @comment.user, :name, :avatar_url
