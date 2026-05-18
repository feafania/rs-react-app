import { useState, useCallback } from 'react';

import { useLocalStorage } from './useLocalStorage.ts';
import { fetchCharacters } from '../api/swapiService.ts';
import type { Character } from '../types/types.ts';

interface UseCharacterSearchReturn {
  results: Character[];
  totalCount: number;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  isLoading: boolean;
  error: string;
  handleSearch: (term: string, page: number) => void;
}

export function useCharacterSearch(): UseCharacterSearchReturn {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');

  const [results, setResults] = useState<Character[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = useCallback(
    async (term: string, page: number): Promise<void> => {
      setIsLoading(true);
      setError('');
      try {
        const data = await fetchCharacters(term, page);
        setResults(data.results);
        setTotalCount(data.totalCount);
      } catch {
        setResults([]);
        setTotalCount(0);
        setError('Something went wrong. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleSearch = useCallback(
    (term: string, page: number) => {
      fetchData(term.trim(), page);
    },
    [fetchData]
  );

  return {
    results,
    totalCount,
    searchTerm,
    setSearchTerm,
    isLoading,
    error,
    handleSearch,
  };
}
