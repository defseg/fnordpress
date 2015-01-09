json.content simple_format(@post.content)
json.(@post, :id, :blog_id, :author_id, :title, :published_at)
json.comments @comments do |comment|
  json.id comment.id
  json.parent_comment_id comment.parent_comment_id
  json.content simple_format(comment.content)
  json.author comment.author.username
  json.created_at comment.created_at
end
