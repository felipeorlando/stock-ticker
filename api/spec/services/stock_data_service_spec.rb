require "rails_helper"
require "webmock/rspec"

RSpec.describe StockDataService do
  let(:ticker) { "AAPL" }
  let(:service) { StockDataService.new(ticker) }
  let(:api_key) { "test_api_key" }

  before do
    stub_const("ENV", ENV.to_hash.merge("POLYGON_API_KEY" => api_key))
  end

  describe "#fetch_stock_data" do
    context "when the API request is successful" do
      before do
        stub_request(:get, "https://api.polygon.io/v2/aggs/ticker/#{ticker}/range/1/day/2023-01-01/2023-12-31?apiKey=#{api_key}")
          .to_return(status: 200, body: {
            resultsCount: 2,
            results: [
              { "c" => 150.0, "v" => 1000 },
              { "c" => 155.0, "v" => 1500 }
            ]
          }.to_json)
      end

      it "returns the correct stock data" do
        result = service.fetch_stock_data

        expect(result).to eq({
          max_price: 155.0,
          min_price: 150.0,
          max_volume: 1500,
          min_volume: 1000,
          average_price: 152.5,
          average_volume: 1250.0
        })
      end
    end

    context "when the API request returns no results" do
      before do
        stub_request(:get, "https://api.polygon.io/v2/aggs/ticker/#{ticker}/range/1/day/2023-01-01/2023-12-31?apiKey=#{api_key}")
          .to_return(status: 200, body: { resultsCount: 0, results: [] }.to_json)
      end

      it "raises a StockDataError" do
        expect { service.fetch_stock_data }.to raise_error(StockDataService::StockDataError)
      end
    end
  end
end
