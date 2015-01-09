class Api::BlogsController < Api::ApiController
  before_action :require_permissions!, only: [:edit, :update]

  def index_by_user
    user = User.find(params[:user_id])
    render json: user.blogs
  end

  def create
    blog = Blog.new(blog_params)
    permission = blog.permissions.new(
      user_id: current_user.id,
      role: 0,
      is_moderator: true
    )
    if blog.save
      render json: blog
    else
      render json: blog.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    blog = Blog.find(params[:id])
    render json: blog
  end

  def index
    render json: Blog.all
  end

  private

  def blog_params
    params.require(:blog).permit(:path, :title, :tagline)
  end

  def require_permissions!
    blog = Blog.find(params[:id])
    return if blog.staff.include?(current_user)
    flash[:errors] = ["You aren't authorized to do that!"]
    redirect_to blog_url(blog)
  end

end
