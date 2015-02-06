json.id @blog.id
json.title @blog.title
json.tagline @blog.tagline
if logged_in?
  json.is_staff @blog.staff.include?(current_user)
  json.is_following current_user.followed_blogs.include?(@blog)
else
  json.is_staff false
  json.is_following false
end
