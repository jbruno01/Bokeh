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

require 'rails_helper'

RSpec.describe Tagging, type: :model do
  it { should belong_to(:photo) }
  it { should belong_to(:tag) }
end
