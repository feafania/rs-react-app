import type { Character } from '../../types/types';

export function buildSelectedCharactersExport(
  results: Character[],
  selectedIds: string[]
) {
  return results.filter((character) => {
    const id = character.url.match(/people\/(\d+)\//)?.[1];
    return id && selectedIds.includes(id);
  });
}
