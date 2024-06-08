class StocksController < ApplicationController
  def show
    ticker = params[:ticker]
    stock_data_service = StockDataService.new(ticker)
    stock_data = stock_data_service.fetch_stock_data

    render json: stock_data
  rescue StockDataService::StockDataError
    render json: { error: "Stock data not found" }, status: :not_found
  end
end