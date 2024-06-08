import { useEffect, useState } from 'react';
import { camelCaseKeys } from '../utils/camelCaseKeys';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: string;
  skip?: boolean;
}

export function useFetch<T>(url: string, options?: FetchOptions): { data: T | null; loading: boolean; error: any } {
  const [state, setState] = useState<{
    data: T | null;
    loading: boolean;
    error: any;
  }>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    setState({ data: null, loading: true, error: null });

    if (options?.skip) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setState({ data, loading: false, error: null });
      })
      .catch((err) => {
        setState({ data: null, loading: false, error: err.message });
      });
  }, [url]);

  return state;
}
