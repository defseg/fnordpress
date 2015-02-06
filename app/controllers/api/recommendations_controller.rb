class Api::RecommendationsController < Api::ApiController
  def index
    @recommendations = Post.most_commented.zip(Post.most_viewed).flatten.uniq
    render :index
  end
end
