require 'rails_helper'

RSpec.describe Photo, type: :model do
  it "can have details" do
    expect(FactoryGirl.build(:photo).title).to eq("Picture")
    expect(FactoryGirl.build(:photo).description).to eq("Landscape")
  end

  it { should validate_presence_of(:user_id) }
  it { should belong_to(:user) }
  it { should have_many(:comments) }
  it { should have_attached_file(:image) }
  it { should validate_attachment_presence(:image) }
  it { should validate_attachment_content_type(:image).
                  allowing('image/png', 'image/jpeg').
                  rejecting('text/plain', 'text/xml') }

end
