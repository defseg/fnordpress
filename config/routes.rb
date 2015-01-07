Rails.application.routes.draw do
  resources :users
  resources :blogs
  resource :session
end
