json.title @blog.title
json.tagline @blog.tagline
if logged_in?
  json.is_staff @blog.staff.include?(current_user)
  json.is_following current_user.followed_blogs.include?(@blog)
else
  json.is_staff false
  json.is_following false
end
# json.posts @blog.posts.page(@page) do |post|
#   json.id post.id
#   json.title post.title
#   json.content post.content
#   json.commentCount post.comment_count
# end
