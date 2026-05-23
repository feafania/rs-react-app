import { useState, useCallback, useRef } from 'react';

import { fetchCharacters } from '../api/swapiService.ts';
import type { Character } from '../types/types.ts';

interface UseCharacterSearchReturn {
  results: Character[];
  totalCount: number;
  isLoading: boolean;
  error: string;
  handleSearch: (term: string, page: number) => void;
}

export function useCharacterSearch(): UseCharacterSearchReturn {
  const [results, setResults] = useState<Character[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const requestIdRef = useRef(0);

  const fetchData = useCallback(async (term: string, page: number) => {
    const requestId = ++requestIdRef.current;

    setIsLoading(true);
    setError('');
    setResults([]);
    setTotalCount(0);

    try {
      const data = await fetchCharacters(term, page);

      if (requestId !== requestIdRef.current) return;

      setResults(data.results);
      setTotalCount(data.totalCount);
    } catch {
      if (requestId !== requestIdRef.current) return;

      setResults([]);
      setTotalCount(0);
      setError('Something went wrong. Please try again.');
    } finally {
      if (requestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  const handleSearch = useCallback(
    (term: string, page: number) => {
      fetchData(term, page);
    },
    [fetchData]
  );

  return {
    results,
    totalCount,
    isLoading,
    error,
    handleSearch,
  };
}
