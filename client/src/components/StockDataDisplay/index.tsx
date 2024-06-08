import React from 'react';
import { dollarize } from '../../utils/dollarize';
import './StockDataDisplay.css';

export interface StockData {
  maxPrice: number;
  minPrice: number;
  maxVolume: number;
  minVolume: number;
  averagePrice: number;
  averageVolume: number;
}

interface StockDataDisplayProps {
  data: StockData | null;
  loading: boolean;
  error: string | null;
}

const StockDataDisplay: React.FC<StockDataDisplayProps> = ({ data, loading, error }) => {
  if (loading || error || !data) {
    return (
      <div className="placeholder">
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {!data && !loading && !error && <div>No data available</div>}
      </div>
    );
  }

  const { maxPrice, minPrice, maxVolume, minVolume, averagePrice, averageVolume } = data;

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Maximum</th>
            <th>Minimum</th>
            <th>Average</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Price</td>
            <td>{dollarize(maxPrice)}</td>
            <td>{dollarize(minPrice)}</td>
            <td>{dollarize(averagePrice)}</td>
          </tr>

          <tr>
            <td>Volume</td>
            <td>{dollarize(maxVolume)}</td>
            <td>{dollarize(minVolume)}</td>
            <td>{dollarize(averageVolume)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StockDataDisplay;