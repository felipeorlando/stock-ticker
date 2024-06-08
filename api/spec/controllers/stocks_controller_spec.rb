require "rails_helper"

RSpec.describe StocksController, type: :controller do
  describe "GET #show" do
    let(:valid_ticker) { "AAPL" }
    let(:invalid_ticker) { "INVALID" }
    let(:stock_data_service) { instance_double(StockDataService) }

    context "when the request is successful" do
      let(:stock_data) do
        {
          max_price: 155.0,
          min_price: 150.0,
          max_volume: 1500,
          min_volume: 1000,
          average_price: 152.5,
          average_volume: 1250.0
        }
      end

      before do
        allow(StockDataService).to receive(:new).with(valid_ticker).and_return(stock_data_service)
        allow(stock_data_service).to receive(:fetch_stock_data).and_return(stock_data)
      end

      it "returns the correct stock data" do
        get :show, params: { ticker: valid_ticker }
        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)
        expect(json["max_price"]).to eq(155.0)
        expect(json["min_price"]).to eq(150.0)
        expect(json["max_volume"]).to eq(1500)
        expect(json["min_volume"]).to eq(1000)
        expect(json["average_price"]).to eq(152.5)
        expect(json["average_volume"]).to eq(1250.0)
      end
    end

    context "when the request returns no results" do
      before do
        allow(StockDataService).to receive(:new).with(invalid_ticker).and_return(stock_data_service)
        allow(stock_data_service).to receive(:fetch_stock_data).and_raise(StockDataService::StockDataError)
      end

      it "returns a not found status with an error message" do
        get :show, params: { ticker: invalid_ticker }
        expect(response).to have_http_status(:not_found)
        json = JSON.parse(response.body)
        expect(json["error"]).to eq("Stock data not found")
      end
    end
  end
end
