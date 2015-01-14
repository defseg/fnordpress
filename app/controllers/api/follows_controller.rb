class Api::FollowsController < Api::ApiController

  def index
    @posts = Post.joins("INNER JOIN blogs ON posts.blog_id = blogs.id")
                 .joins("INNER JOIN follows ON blogs.id = follows.blog_id")
                 .joins("INNER JOIN users ON follows.user_id = users.id")
                 .where(users: {id: current_user.id})
                 .order(published_at: :desc)
                 .includes(:comments)
                 .page(1)

    @page = params[:page] || 1
    render :index
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
