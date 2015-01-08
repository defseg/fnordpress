Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api do
    resources :blogs
    resources :posts
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
