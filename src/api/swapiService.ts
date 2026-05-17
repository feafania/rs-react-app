import type { Character } from '../types/types.ts';
import { API_URL } from '../constants';

interface SwapiResponse {
  count: number;
  results: Character[];
}

interface FetchCharactersResponse {
  results: Character[];
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

  const response = await fetch(`${API_URL}/people/?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }

  const data: SwapiResponse = await response.json();

  return {
    results: data.results,
    totalCount: data.count,
  };
}
