source 'https://rubygems.org'

gem 'rails', '4.2.1'
gem 'pg'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.1.0'
gem 'newrelic_rpm'
gem 'jquery-rails'
gem 'jbuilder', '~> 2.0'
gem 'sdoc', '~> 0.4.0', group: :doc
gem 'bcrypt', '~> 3.1.7'
gem 'backbone-on-rails'
gem 'figaro'
gem 'paperclip'
gem 'aws-sdk', '~> 1.6'
gem "omniauth-google-oauth2"
gem "pg_search"
gem "kaminari"
gem "font-awesome-rails"
gem 'jquery-ui-rails'

# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development do
  gem 'annotate'
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'pry-rails'
end

group :test, :development do
  gem 'spring'
  gem 'spring-commands-rspec'
  gem 'guard-rspec'
  gem 'jasmine-rails'
  gem 'guard-jasmine'
  gem 'factory_girl_rails'
  gem 'rspec-rails'
  gem 'terminal-notifier-guard', '~> 1.6.1'
end

group :production do
  gem 'rails_12factor'
end

group :test do
  gem 'shoulda-matchers', require: false
  gem 'jasmine-jquery-rails'
end
