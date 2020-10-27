Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'gaze#menu'
  get "/gaze/yes_no", to: "gaze#yes_no"
end
