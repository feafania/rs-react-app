import { useState, useCallback, useRef, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage.ts';
import { fetchCharacters } from '../api/swapiService.ts';
import type { Character } from '../types/types.ts';

interface UseCharacterSearchReturn {
  results: Character[];
  searchTerm: string;
  isLoading: boolean;
  error: string;
  handleSearch: (term: string) => void;
  handleInputChange: (value: string) => void;
}

export function useCharacterSearch(): UseCharacterSearchReturn {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [lastRequestedTerm, setLastRequestedTerm] = useState(searchTerm);
  const [results, setResults] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = useCallback(async (term: string): Promise<void> => {
    setIsLoading(true);
    setError('');
    try {
      const data = await fetchCharacters(term);
      setResults(data);
      setIsLoading(false);
    } catch {
      setResults([]);
      setIsLoading(false);
      setError('Something went wrong. Please try again.');
    }
  }, []);

  const hasFetched = useRef(false);
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchData(searchTerm);
  });

  const handleSearch = (term: string): void => {
    const trimmed = term.trim();
    const shouldFetch = trimmed !== lastRequestedTerm;
    setSearchTerm(trimmed);
    setLastRequestedTerm(trimmed);
    if (!shouldFetch) return;
    fetchData(trimmed);
  };

  const handleInputChange = (value: string): void => {
    setSearchTerm(value);
  };

  return {
    results,
    searchTerm,
    isLoading,
    error,
    handleSearch,
    handleInputChange,
  };
}
