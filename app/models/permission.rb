class Permission < ActiveRecord::Base

  enum role: {
    owner: 0,
    administrator: 1,
    editor: 2,
    author: 3,
    contributor: 4
  }

  validates :user_id, presence: true
  validates :blog, presence: true
  # TODO: should also validate that owners/admins are always moderators

  belongs_to :blog
  belongs_to :user

end
