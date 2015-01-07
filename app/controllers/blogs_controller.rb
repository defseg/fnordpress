class BlogsController < ApplicationController

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

end
