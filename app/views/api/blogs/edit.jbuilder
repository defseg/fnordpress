json.partial! 'blog', blog: @blog
json.staff @blog.staff, :id, :email # TODO username
json.posts @posts
# send up:
# * blog staff
# * posts per page
