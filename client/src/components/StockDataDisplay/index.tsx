import React from 'react';
import { dollarize } from '../../utils/dollarize';

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
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const { maxPrice, minPrice, maxVolume, minVolume, averagePrice, averageVolume } = data;

  return (
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
  );
};

export default StockDataDisplay;