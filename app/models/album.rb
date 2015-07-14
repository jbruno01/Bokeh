# == Schema Information
#
# Table name: albums
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  title       :string           not null
#  description :text
#  created_at  :datetime
#  updated_at  :datetime
#

class Album < ActiveRecord::Base
  validates :title, :user_id, presence: true

  belongs_to :user
end
