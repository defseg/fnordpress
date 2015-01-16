json.title @blog.title
json.tagline @blog.tagline
json.is_staff @blog.staff.include?(current_user)
json.is_following current_user.followed_blogs.include?(@blog)
# json.posts @blog.posts.page(@page) do |post|
#   json.id post.id
#   json.title post.title
#   json.content post.content
#   json.commentCount post.comment_count
# end
