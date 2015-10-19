Rails.application.routes.draw do

  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    get "/search", to: "static_pages#search"
    resources :users, only: [:create, :show, :update]
    resource :session, only: [:create, :destroy, :show]
    resources :photos
    resources :comments
  end

  get "/auth/:provider/callback", to: "api/sessions#omniauth"




end
