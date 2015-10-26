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

require 'rails_helper'

RSpec.describe Comment, type: :model do
  it {should validate_presence_of(:user_id) }
  it {should validate_presence_of(:photo_id) }
  it {should validate_presence_of(:content) }
  it {should belong_to(:user) }
  it {should belong_to(:photo) }
end
