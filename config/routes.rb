Rails.application.routes.draw do
  devise_for :users
  root to: 'static_pages#root'

  namespace :api do
    resources :blogs do
      resources :posts, only: [:index]
      resource :follow, only: [:create, :destroy]
    end
    resources :users, only: [:show]
    resources :follows, only: [:index, :create, :destroy]
    resources :posts, except: [:index]
    resources :comments
  end

  resources :users
  resources :blogs do
    resources :posts do
      resources :comments
    end
  end
  resource :session

  # to create a new guest account
  post '/guest', to: 'users#new_guest', as: :new_guest 
end
