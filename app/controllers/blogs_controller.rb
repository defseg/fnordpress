class BlogsController < ApplicationController
  before_action :require_permissions!, only: [:edit, :update]

  def new
  end

  def create
    blog = Blog.new(blog_params)
    permission = blog.permissions.new(
      user_id: current_user.id,
      role: 0,
      is_moderator: true
    )
    if blog.save
      redirect_to blog_url(blog)
    else
      flash.now[:errors] = blog.errors.full_messages
      render :new
    end
  end

  def show
    @blog = Blog.find(params[:id])
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
