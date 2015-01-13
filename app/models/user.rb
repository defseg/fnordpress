class User < ActiveRecord::Base
  validates :username, :password_digest, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  attr_reader :password

  validates :username, length: {maximum: 30}
  validates :email, presence: true, length: {maximum: 255}

  has_many :permissions
  has_many :blogs, through: :permissions
  has_many :posts, foreign_key: :author_id
  has_many :comments, foreign_key: :author_id
  has_many :follows
  has_many :followed_blogs, through: :follows, source: :blog

  after_initialize :ensure_session_token

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.is_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

end
