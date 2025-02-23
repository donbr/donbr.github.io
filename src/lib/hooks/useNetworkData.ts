// src/lib/hooks/useNetworkData.ts
import { useState, useEffect } from 'react';
import { NetworkData } from '../types';

export const useNetworkData = (dataUrl: string) => {
  const [data, setData] = useState<NetworkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(dataUrl);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataUrl]);

  return { data, loading, error };
};