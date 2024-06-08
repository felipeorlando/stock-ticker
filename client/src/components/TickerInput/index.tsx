import React, { useState, useEffect } from 'react';
import { useThrottle } from '@uidotdev/usehooks';
import StockDataDisplay from '../StockDataDisplay';

const TickerInput: React.FC = () => {
  const [ticker, setTicker] = useState<string>('');

  const throttledValue = useThrottle(ticker, 1000);

  return (
    <div>
      <input
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        placeholder="Enter stock ticker"
      />

      <StockDataDisplay ticker={throttledValue} />
    </div>
  );
};

export default TickerInput;