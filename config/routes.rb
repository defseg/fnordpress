Rails.application.routes.draw do
  resources :users
  resources :blogs do
    resources :posts
  end
  resource :session
end
