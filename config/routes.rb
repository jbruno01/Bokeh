Rails.application.routes.draw do

  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :update]
    resource :session, only: [:create, :destroy, :show]
    resources :albums
    resources :photos
    resources :comments
  end

  get "/auth/:provider/callback", to: "api/sessions#omniauth"




end
