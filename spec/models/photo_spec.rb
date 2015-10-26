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

require 'rails_helper'

RSpec.describe Photo, type: :model do
  it "can have details" do
    expect(FactoryGirl.build(:photo).title).to eq("Picture")
    expect(FactoryGirl.build(:photo).description).to eq("Landscape")
  end

  it { should validate_presence_of(:user_id) }
  it { should belong_to(:user) }
  it { should have_many(:comments) }
  it { should validate_attachment_presence(:image) }
  it { should validate_attachment_content_type(:image).
                  allowing('image/png', 'image/jpeg').
                  rejecting('text/plain', 'text/xml') }
  it { should have_many(:taggings) }
  it { should have_many(:tags)
        .through(:taggings)}

end
