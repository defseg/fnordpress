class Api::CommentsController < Api::ApiController

  def create
    comment = current_user.comments.new(comment_params)

    if @comment.save
      render json: comment
    else
      render json: comment.errors.full_messages, status: :unprocessable_entity
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
