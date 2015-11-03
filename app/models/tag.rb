# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime
#  updated_at :datetime
#

class Tag < ActiveRecord::Base
  include PgSearch
  validates :name, presence: true, uniqueness: true
  multisearchable against: :name

  has_many :taggings, dependent: :destroy
  has_many :photos, through: :taggings
end
