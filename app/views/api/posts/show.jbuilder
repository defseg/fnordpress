json.content simple_format(@post.content)
json.(@post, :id, :blog_id, :author_id, :title, :published_at)
json.comments @post.comments_by_parent
