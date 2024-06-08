import React from 'react';
import { useFetch } from '../../hooks/useFetch';

interface StockDataDisplayProps {
  ticker: string;
}

interface StockData {
  maxPrice: number;
  minPrice: number;
  maxVolume: number;
  minVolume: number;
  averagePrice: number;
  averageVolume: number;
}

const StockDataDisplay: React.FC<StockDataDisplayProps> = ({ ticker }) => {
  const { data, loading, error } = useFetch<StockData>(`http://localhost:3003/api/stocks/${ticker}`, {
    skip: !ticker,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <p>Average Stock Price: {data.averagePrice}</p>
      <p>Maximum Volume: {data.maxVolume}</p>
      <p>Minimum Volume: {data.minVolume}</p>
      <p>Maximum Stock Price: {data.maxPrice}</p>
      <p>Minimum Stock Price: {data.minPrice}</p>
    </div>
  );
};

export default StockDataDisplay;