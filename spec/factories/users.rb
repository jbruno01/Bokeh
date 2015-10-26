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

FactoryGirl.define do
  factory :user do
    email "sample@email.com"
    name "Jack Sparrow"
    password "password"
  end

end
