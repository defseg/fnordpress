class Blog < ActiveRecord::Base

  validates :path, null: false, length: {maximum: 30}
  validates :title, :tagline, null: false, length: {maximum: 255}

  has_many :permissions, inverse_of: :blog
  has_many :staff, through: :permissions, source: :user_id
  has_many :posts

end
