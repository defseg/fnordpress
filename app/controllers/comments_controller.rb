class CommentsController < ApplicationController

  def new
    @comment = Comment.new(post_id: params[:post_id])
    render :new
  end

  def create
    @comment = current_user.comments.new(comment_params)

    if @comment.save
      redirect_to blog_post_url(id: @comment.post_id)
    else
      flash.now[:errors] = @comment.errors.full_messages
      redirect_to new_blog_post_comment_url(@comment.post_id)
    end
  end

  def show
    @comment = Comment.find(params[:id])
    render :show
  end

  private

  def comment_params
    params.require(:comment).permit(:content, :post_id, :parent_comment_id)
  end

end
