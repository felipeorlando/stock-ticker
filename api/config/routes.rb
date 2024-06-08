Rails.application.routes.draw do
  get 'api/stocks/:ticker', to: 'stocks#show'
end
