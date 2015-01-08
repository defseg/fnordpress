class Post < ActiveRecord::Base

  enum status: {
    published: 0,
    draft: 1,
    pending_review: 2
  }

  belongs_to :blog
  belongs_to :author, class_name: "User", foreign_key: :author_id
  has_many :comments

  validates :author_id, :blog_id, :content, :status, presence: true

  def comment_count
    Comment.where(post_id: id).count()
  end

end
