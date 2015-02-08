json.array! @recommendations do |post|
  json.blog_id post.blog.id
  json.blog_title post.blog.title
  json.blog_tagline post.blog.tagline

  json.id post.id
  json.title post.title
  json.content truncate(strip_tags(post.content), length: 80)
end
