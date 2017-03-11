Rails.application.routes.draw do
  resources :users
  post '/api/login' => 'users#login'
  post '/api/logout' => 'users#logout'
  get 'search/users' => 'users#search'
  post '/api/signup' => 'users#signup'
end
