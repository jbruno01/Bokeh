# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  photo_id   :integer          not null
#  content    :text             not null
#  created_at :datetime
#  updated_at :datetime
#

FactoryGirl.define do
  factory :comment do
    user_id 1
    photo_id 1
    content "Comment"
  end

end
