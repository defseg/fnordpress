json.content @post.content
json.(@post, :id, :blog_id, :author_id, :title, :published_at)
json.blog_title @post.blog.title
json.blog_tagline @post.blog.tagline
json.comments @comments do |comment|
  json.id comment.id
  json.parent_comment_id comment.parent_comment_id
  json.content comment.content
  json.author comment.author.username
  json.created_at comment.created_at
end
