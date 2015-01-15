class Api::FollowsController < Api::ApiController

  def index
    @page = params[:page] || 1

    @posts = Post.joins("INNER JOIN blogs ON posts.blog_id = blogs.id")
                 .joins("INNER JOIN follows ON blogs.id = follows.blog_id")
                 .joins("INNER JOIN users ON follows.user_id = users.id")
                 .where(users: {id: current_user.id})
                 .order(published_at: :desc)
                 .includes(:comments)
                 .page(@page)

    render :index
  end

  def create
    @blog = Blog.find(params[:blog_id])
    @follow = @blog.follows.new(user_id: current_user.id)
    if @follow.save
      render json: @follow
    else
      render json: @follow.errors.full_messages
    end
  end

  def destroy
    follow = Follow.find_by(blog_id: params[:blog_id], user_id: current_user.id)

    if follow.delete
      render json: {}
    else
      render json: "error"
    end
  end

  # TODO: add blog/:blog_id/follows controller

  def create
    puts params[:blog_id]
    follow = current_user.follows.new(blog_id: params[:blog_id])

    if follow.save
      render json: follow
    else
      render json: follow.errors.full_messages, status: :unprocessable_entity
    end
  end
end
