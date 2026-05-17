import type { Character } from '../types/types.ts';

interface SwapiResponse {
  results: Character[];
}

export async function fetchCharacters(term: string): Promise<Character[]> {
  const url = term
    ? `https://swapi.py4e.com/api/people/?search=${term}&page=1`
    : `https://swapi.py4e.com/api/people/?page=1`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      response.status >= 500
        ? 'Server error. Please try again later.'
        : 'Unable to fetch data.'
    );
  }

  const data: SwapiResponse = await response.json();
  return data.results;
}
