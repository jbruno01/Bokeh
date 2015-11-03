# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  name            :string
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime
#  updated_at      :datetime
#  provider        :string
#  uid             :string
#  banner_url      :string           default("/default_banner.jpg")
#  avatar_url      :string           default("/default_avatar.jpg")
#

require 'rails_helper'

RSpec.describe User, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:email) }
  it { should validate_length_of(:password) }
  it { should validate_presence_of(:session_token) }
  it { should validate_presence_of(:password_digest) }
end
