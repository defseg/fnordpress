class Comment < ActiveRecord::Base

  validates :content, :post, presence: true

  belongs_to :post, inverse_of: :comments, foreign_key: :post_id
  belongs_to :author, class_name: "User", foreign_key: :author_id
  belongs_to :parent_comment, class_name: "Comment"

  has_many :child_comments, class_name: "Comment", foreign_key: :parent_comment_id

end
