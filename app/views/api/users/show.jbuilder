json.username @user.username
json.blogs @user.blogs do |blog|
  json.title blog.title
  json.id blog.id
end
