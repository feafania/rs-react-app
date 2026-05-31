import type { Character, CharacterDetailsData } from '../types/types';

import { API_URL } from '../constants';
import { getErrorMessage } from './errors.ts';

interface CharacterResults {
  results: Character[];
}

interface SwapiResponse extends CharacterResults {
  count: number;
}

interface FetchCharactersResponse extends CharacterResults {
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
    throw new Error(
      'Unable to load characters. ' + getErrorMessage(response.status)
    );
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
  const response = await fetch(`${API_URL}/people/${id}/`);

  if (!response.ok) {
    throw new Error(
      'Unable to load character details. ' + getErrorMessage(response.status)
    );
  }

  return response.json();
}
