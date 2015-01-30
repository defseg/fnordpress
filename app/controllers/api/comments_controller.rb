class Api::CommentsController < Api::ApiController
  before_action :require_permissions!, only: [:update]
  before_action :require_author_or_permissions!, only: [:destroy]

  # to get simple_format in the controller
  include ActionView::Helpers::TextHelper

  def create
    @comment = current_user.comments.new(comment_params)
    @comment.content = simple_format(@comment.content)

    if @comment.save
      render json: @comment
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    comment = Comment.find(params[:id])
    render json: comment
  end

  def update
    @comment = Post.find(params[:id])
    if @comment.update_attributes(comment_params)
      render json: @comment
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content, :post_id, :parent_comment_id)
  end

  def require_permissions!
    blog = Blog.find(Comment.find(params[:id]).post.blog.id)
    return if blog.staff.include?(current_user)
    flash[:errors] = ["You aren't authorized to do that!"]
    redirect_to blog_url(blog)
  end

  def require_author_or_permissions!
    comment = Comment.find(params[:id])
    return if comment.user_id == current_user.id
    blog = Blog.find(comment.post.blog.id)
    return if blog.staff.include?(current_user)
    flash[:errors] = ["You aren't authorized to do that!"]
    redirect_to blog_url(blog)
  end
end
