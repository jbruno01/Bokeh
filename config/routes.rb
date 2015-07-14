Rails.application.routes.draw do

  root to: 'sessions#new'

  resources :users, only: [:create, :new, :show] do
    resources :albums
  end

  resource :session, only: [:create, :destroy, :new]

end
