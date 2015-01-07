class PostsController < ApplicationController

  def new
    @post = Post.new(blog_id: params[:blog_id])
    render :new
  end

  def create
    # TODO implement status
    @post = current_user.posts.new(post_params)
    @post.status = 0
    if @post.save
      redirect_to blog_url(@post.blog)
    else
      flash.now[:errors] = @post.errors.full_messages
      render :new
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :content, :status, :blog_id)
  end

end
