class PostsController < ApplicationController
  before_action :require_permissions!, only: [:new, :create, :edit, :update, :destroy]

  def new
    @post = Post.new(blog_id: params[:blog_id])
    render :new
  end

  def create
    @post = current_user.posts.new(post_params)
    @post.status = 0
    @post.published_at = Time.now
    if @post.save
      redirect_to blog_url(@post.blog)
    else
      flash.now[:errors] = @post.errors.full_messages
      render :new
    end
  end

  def show
    @post = Post.find(params[:id])
    @comments = @post.comments_by_parent
    render :show
  end

  def update

  end

  private

  def post_params
    params.require(:post).permit(:title, :content, :status, :published_at, :blog_id)
  end

  def require_permissions!
    blog = Blog.find(params[:blog_id])
    return if blog.staff.include?(current_user)
    flash[:errors] = ["You aren't authorized to do that!"]
    redirect_to blog_url(blog)
  end

end
