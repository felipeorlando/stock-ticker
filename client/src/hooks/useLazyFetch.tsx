import { useEffect, useState } from 'react';
import { camelCaseKeys } from '../utils/camelCaseKeys';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: string;
  skip?: boolean;
}

export function useLazyFetch<T>(url: string, options?: FetchOptions) {
  const [state, setState] = useState<{
    data: T | null;
    loading: boolean;
    error: any;
  }>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchUrl = () => {
    setState({ data: null, loading: true, error: null });

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);

        const formattedData = camelCaseKeys(data);
        setState({ data: formattedData, loading: false, error: null });
      })
      .catch((err) => {
        setState({ data: null, loading: false, error: err.message });
      });
  };

  return { ...state, fetchUrl };
}
