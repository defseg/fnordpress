class Api::PostsController < Api::ApiController
  before_action :require_permissions!, only: [:new, :create, :edit, :update, :destroy]

  # to get simple_format in the controller
  include ActionView::Helpers::TextHelper

  def create
    post = current_user.posts.new(post_params)
    post.status = 0
    post.published_at = Time.now
    post.content = simple_format(post.content)
    if post.save
      render json: post
    else
      render json: post.errors.full_messages, status: :unprocessable_entity
    end
  end

  # TODO: may have to have another template for fetching unpublished posts
  def show
    @post = Post.find(params[:id])
    @comments = @post.comments
    render :show
  end

  # TODO: write a jbuilder to format the posts
  def index
    blog = Blog.find(params[:blog_id])
    puts params
    render json: blog.posts.page(params[:page] || 1)
  end

  private

  def post_params
    params.require(:post).permit(:title, :content, :status, :blog_id)
  end

  def require_permissions!
    blog = Blog.find(post_params[:blog_id])
    return if blog.staff.include?(current_user)
    render json: "You aren't allowed to do that!" # TODO: status?
  end

end
