import type { Character } from '../types/types';

type Translate = (key: string) => string;

export function getCharacterDescription(
  character: Character,
  t: Translate
): string {
  const { gender, height, birth_year } = character;

  return `${t('gender')}: ${gender} | ${t('height')}: ${height} | ${t('birthYear')}: ${birth_year}`;
}
