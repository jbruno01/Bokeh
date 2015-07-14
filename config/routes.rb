Rails.application.routes.draw do

  root to: 'sessions#new'

  resources :users, only: [:create, :new, :show]
  resource :session, only: [:create, :destroy, :new]

end
