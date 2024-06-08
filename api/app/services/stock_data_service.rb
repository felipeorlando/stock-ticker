require "faraday"
require "json"

class StockDataService
  CLOSE_PRICE_KEY = "c"
  TRADING_VOLUME_KEY = "v"

  class StockDataError < StandardError; end

  def initialize(ticker)
    @ticker = ticker
    @api_key = ENV["POLYGON_API_KEY"]
    @base_url = "https://api.polygon.io/v2/aggs/ticker/#{@ticker}/range/1/day/2023-01-01/2023-12-31"
  end

  def fetch_stock_data
    response = Faraday.get("#{@base_url}?apiKey=#{@api_key}")
    data = JSON.parse(response.body)

    raise StockDataError if data["resultsCount"].zero?

    process_data(data["results"])
  end

  private

  def process_data(results)
    prices = results.map { |day| day[CLOSE_PRICE_KEY] }
    volumes = results.map { |day| day[TRADING_VOLUME_KEY] }

    average_price = average(prices)
    average_volume = average(volumes)

    {
      max_price: prices.max,
      min_price: prices.min,
      max_volume: volumes.max,
      min_volume: volumes.min,
      average_price:,
      average_volume:,
    }
  end

  def average(array)
    array.sum / array.size.to_f
  end
end