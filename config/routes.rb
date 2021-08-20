Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post "/register", to: "users#create"
  get "/me", to: "users#show"

  get "/levels/all", to: "levels#indexAll"

  resources :levels do
    resources :scores
  end

  resources :users do
    resources :scores
  end

  resources :scores
end
