# == Schema Information
#
# Table name: taggings
#
#  id         :integer          not null, primary key
#  photo_id   :integer
#  tag_id     :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :tagging do
    photo nil
tag nil
  end

end
