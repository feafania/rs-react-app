import type { Character, CharacterDetailsData } from '../types/types.ts';

import { API_URL } from '../constants';

interface CharacterResults {
  results: Character[];
}

interface SwapiResponse extends CharacterResults {
  count: number;
}

export interface FetchCharactersResponse extends CharacterResults {
  totalCount: number;
}

export async function fetchCharacters(
  search: string,
  page: number
): Promise<FetchCharactersResponse> {
  const params = new URLSearchParams();

  if (search.trim()) {
    params.set('search', search);
  }

  params.set('page', String(page));

  const response = await fetch(`${API_URL}/people/?${params.toString()}`, {
    next: {
      revalidate: 600,
    },
  });

  if (!response.ok) {
    throw new Error(String(response.status));
  }

  const data: SwapiResponse = await response.json();

  return {
    results: data.results,
    totalCount: data.count,
  };
}

export async function fetchCharacterDetails(
  id: string
): Promise<CharacterDetailsData> {
  const response = await fetch(`${API_URL}/people/${id}/`, {
    next: {
      revalidate: 600,
    },
  });

  if (!response.ok) {
    throw new Error(String(response.status));
  }

  return response.json();
}
