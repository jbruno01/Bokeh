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
  include PgSearch
  multisearchable against: :title
  validates :user_id, presence: true

  has_attached_file :image, default_url: "missing.png", styles: {
                            avatar: "200x200#",
                            small: "300x300>",
                            medium: "400x400>"
                          }

  validates_attachment :image,
          presence: true,
          content_type: {content_type: ["image/jpeg", "image/png"]},
          size: { in: 0..5.megabytes }

  belongs_to :user
  belongs_to :album
  has_many :comments

end
