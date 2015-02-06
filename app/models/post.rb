class Post < ActiveRecord::Base

  before_create :enforce_published_at, :enforce_views

  enum status: {
    published: 0,
    draft: 1,
    pending_review: 2
  }

  belongs_to :blog
  belongs_to :author, class_name: "User", foreign_key: :author_id
  has_many :comments, dependent: :destroy

  validates :author_id, :blog_id, :content, :status, presence: true

  def comment_count
    self.comments.length
  end

  def comments_by_parent
    comments_by_parent = Hash.new { |h, k| h[k] = [] }
    self.comments.includes(:author).each do |comment|
      comments_by_parent[comment.parent_comment_id] << comment
    end
    comments_by_parent
  end

  def self.most_viewed(page = 1, per = 5)
    Post.page(page).per(per).order("views DESC").includes(:blog)
  end

  def self.most_commented(page = 1, per = 5)
    Post.joins(:comments)
        .group("posts.id")
        .page(page).per(per)
        .order("COUNT(comments) DESC")
        .includes(:blog)
  end

  private

  def enforce_published_at
    self.published_at = Time.now if !(self.published_at) && self.status == 0
  end

  def enforce_views
    self.views = 0 unless self.views
  end

end
