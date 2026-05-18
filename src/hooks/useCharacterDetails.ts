import { useEffect, useState } from 'react';

import { fetchCharacterDetails } from '../api/swapiService.ts';

import type { CharacterDetailsData } from '../types/types.ts';

interface UseCharacterDetailsReturn {
  character: CharacterDetailsData | null;
  isLoading: boolean;
  error: string;
}

export function useCharacterDetails(
  id: string | undefined
): UseCharacterDetailsReturn {
  const [character, setCharacter] = useState<CharacterDetailsData | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');

  useEffect(() => {
    async function loadCharacter() {
      if (!id) return;

      try {
        setIsLoading(true);

        setError('');

        const data = await fetchCharacterDetails(id);

        setCharacter(data);
      } catch {
        setError('Failed to load character details.');
      } finally {
        setIsLoading(false);
      }
    }

    loadCharacter();
  }, [id]);

  return {
    character,
    isLoading,
    error,
  };
}
