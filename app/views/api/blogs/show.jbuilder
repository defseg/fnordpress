json.title @blog.title
json.tagline @blog.tagline
json.posts @blog.posts do |post|
  json.id post.id
  json.title post.title
  json.content simple_format(post.content)
  json.commentCount post.comment_count
end
