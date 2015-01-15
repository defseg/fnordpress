json.array! @posts do |post|
  json.id post.id
  # TODO: could optimize this by also sending up a collection of blogs

  json.title post.title
  json.content post.content
  json.published_at post.published_at
  json.commentCount post.comment_count
end
