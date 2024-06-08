import React, { useState } from 'react';
import StockDataDisplay, { StockData } from '../StockDataDisplay';
import { useLazyFetch } from '../../hooks/useLazyFetch';
import './TickerInput.css';

const TickerInput: React.FC = () => {
  const [ticker, setTicker] = useState<string>('');
  const { data, loading, error, fetchUrl } = useLazyFetch<StockData>(`http://localhost:3003/api/stocks/${ticker}`);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    fetchUrl();
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicker(e.target.value);
  }

  return (
    <>
      <h1 className="title">
        Enter a stock ticker:
      </h1>

      <form onSubmit={onFormSubmit} className="form">
        <input
          type="text"
          value={ticker}
          placeholder="Enter stock ticker"
          onChange={onInputChange}
          name="ticker"
          disabled={loading}
          className="input"
        />

        <button
          type="submit"
          disabled={loading}
          className="button"
        >
          Submit
        </button>
      </form>

      <StockDataDisplay
        data={data}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default TickerInput;