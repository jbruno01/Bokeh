# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  name            :string
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  include PgSearch
  multisearchable against: :name
  validates :name, presence: true
  validates :email, :session_token, :password_digest, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many(
    :photos,
    class_name: "Photo",
    foreign_key: :user_id,
    primary_key: :id
  )

  has_many(
    :comments,
    class_name: "Comment",
    foreign_key: :user_id,
    primary_key: :id
  )

  attr_reader :password

  after_initialize :ensure_session_token

  def self.find_or_create_by_auth_hash(auth_hash)
    user = User.find_by(
            provider: auth_hash[:provider],
            uid: auth_hash[:uid])

    unless user
      user = User.create!(
            provider: auth_hash[:provider],
            uid: auth_hash[:uid],
            name: auth_hash[:info][:name],
            email: auth_hash[:info][:email],
            password: SecureRandom::urlsafe_base64)
    end

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
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    return user if !user.nil? && user.is_password?(password)

    return nil
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

end
