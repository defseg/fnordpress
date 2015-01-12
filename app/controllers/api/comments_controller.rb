class Api::CommentsController < Api::ApiController

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

  private

  def comment_params
    params.require(:comment).permit(:content, :post_id, :parent_comment_id)
  end

end
