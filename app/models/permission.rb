class Permission < ActiveRecord::Base

  # enum role: {
  #   owner: 0,
  #   administrator: 1,
  #   editor: 2,
  #   author: 3,
  #   contributor: 4
  # }

  enum role: {
    administrator: 1
  }

  validates :user_id, presence: true
  validates :blog, presence: true
  validates :is_moderator, presence: true
  before_save :owners_and_admins_are_always_moderators

  belongs_to :blog
  belongs_to :user

  private

  # before save,

  def owners_and_admins_are_always_moderators
    if ["owner", "administrator"].include?(role)
      is_moderator = true
    end
  end

end
