guard :rspec, cmd: 'spring rspec' do
  watch(%r{^app/}) { "spec" }
  watch(%r{^spec/}) { "spec" }
end

guard :jasmine do
  watch(%r{spec/javascripts/}) { 'spec/javascripts' }
  watch(%r{spec/javascripts/fixtures/.+$})
  watch(%r{app/assets/javascripts/}) { |m| "spec/javascripts/#{ m[1] }_spec.#{ m[2] }" }
end
