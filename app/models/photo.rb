class Photo < ActiveRecord::Base
  validates :user_id, :image_url, presence: true

  belongs_to :user
  belongs_to :album
  has_many :comments

end
