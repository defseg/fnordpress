class Api::FollowsController < Api::ApiController

  def index
    @blogs = current_user.followed_blogs

    posts = []
    @blogs.each { |blog| posts.concat(blog.posts) }

    render json: posts
  end

  # TODO: add blog/:blog_id/follows controller

  def create
    follow = current_user.follows.new(params[:blog_id])

    if follow.save
      render json: follow
    else
      render json: follow.errors.full_messages, status: :unprocessable_entity
    end
  end
end
