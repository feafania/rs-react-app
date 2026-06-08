import type { Character } from '../types/types.ts';

export function getCharacterDescription(character: Character): string {
  const { gender, height, birth_year } = character;
  return `Gender: ${gender} | Height: ${height} | Birth year: ${birth_year}`;
}
