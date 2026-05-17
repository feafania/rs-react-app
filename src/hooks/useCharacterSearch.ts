import { useState, useCallback } from 'react';

import { useLocalStorage } from './useLocalStorage.ts';

import { fetchCharacters } from '../api/swapiService.ts';

import type { Character } from '../types/types.ts';

interface UseCharacterSearchReturn {
  results: Character[];
  totalCount: number;
  searchTerm: string;
  isLoading: boolean;
  error: string;
  handleSearch: (term: string, page: number) => void;
  handleInputChange: (value: string) => void;
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

        setIsLoading(false);
      } catch {
        setResults([]);

        setTotalCount(0);

        setIsLoading(false);

        setError('Something went wrong. Please try again.');
      }
    },
    []
  );

  const handleSearch = (term: string, page: number): void => {
    const trimmed = term.trim();

    setSearchTerm(trimmed);

    fetchData(trimmed, page);
  };

  const handleInputChange = (value: string): void => {
    setSearchTerm(value);
  };

  return {
    results,
    totalCount,
    searchTerm,
    isLoading,
    error,
    handleSearch,
    handleInputChange,
  };
}
