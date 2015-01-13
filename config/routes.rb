Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api do
    resources :blogs do
      resources :posts, only: [:index]
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
end
