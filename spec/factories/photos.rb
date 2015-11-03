# == Schema Information
#
# Table name: photos
#
#  id                 :integer          not null, primary key
#  album_id           :integer
#  user_id            :integer          not null
#  title              :text
#  description        :text
#  created_at         :datetime
#  updated_at         :datetime
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

FactoryGirl.define do
  factory :photo do
    title "Picture"
    user_id 1
    description "Landscape"
  end

end
