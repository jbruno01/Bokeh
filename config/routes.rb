Rails.application.routes.draw do

  root to: 'static_pages#root'

  resources :users, only: [:create, :new, :show]
  resource :session, only: [:create, :destroy, :new]

  namespace :api, defaults: { format: :json } do
    resources :albums, except: [:create, :new, :delete]
    resources :photos, except: [:create, :new, :delete]
  end




end
