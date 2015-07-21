# == Schema Information
#
# Table name: photos
#
#  id          :integer          not null, primary key
#  album_id    :integer
#  user_id     :integer          not null
#  title       :text
#  description :text
#  created_at  :datetime
#  updated_at  :datetime
#  image_url   :string           not null
#

class Photo < ActiveRecord::Base
  validates :user_id, presence: true

  has_attached_file :image, default_url: "missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to :user
  belongs_to :album
  has_many :comments

end