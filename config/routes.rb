Rails.application.routes.draw do

  root to: 'sessions#new'

  resources :users, only: [:create, :new, :show] do
    resources :albums, only: [:create, :new, :delete, :index]
  end

  resources :albums, except: [:create, :new, :delete]
  resource :session, only: [:create, :destroy, :new]

end
