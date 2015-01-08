Rails.application.routes.draw do
  resources :users
  resources :blogs do
    resources :posts do
      resources :comments
    end
  end
  resource :session

  root to: redirect("/session/new")
end
