Rails.application.routes.draw do
  root to: 'static_pages#root'

  # TODO: will we need to be able to get all blogs on the site? probably.
  get 'api/users/:user_id/blogs' => 'api/blogs#index_by_user', as: 'blogs_by_user'

  namespace :api do
    resources :blogs do
      resources :posts, only: [:index]
    end
    resources :users, only: [:show]
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
