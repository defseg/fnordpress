class Post < ActiveRecord::Base

  before_create :enforce_published_at

  enum status: {
    published: 0,
    draft: 1,
    pending_review: 2
  }

  belongs_to :blog
  belongs_to :author, class_name: "User", foreign_key: :author_id
  has_many :comments, dependent: :destroy

  validates :author_id, :blog_id, :content, :status, presence: true
  # TODO add custom validation/before-action: all published posts must have a published at

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

  private

  def enforce_published_at
    self.published_at = Time.now if !(self.published_at)
  end

end
