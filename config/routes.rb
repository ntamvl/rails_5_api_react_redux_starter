Rails.application.routes.draw do
  resources :users
  post '/api/login' => 'users#login'
  post '/api/logout' => 'users#logout'
end
