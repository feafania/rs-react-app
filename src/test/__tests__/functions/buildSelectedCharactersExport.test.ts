import { describe, expect, it } from 'vitest';
import {
  invalidCharacter,
  leiaCharacter,
  lukeCharacter,
} from '../../mocks/characters.ts';
import { buildSelectedCharactersExport } from '../../../util/export/buildSelectedCharactersExport.ts';

describe('buildSelectedCharactersExport', () => {
  const characters = [lukeCharacter, leiaCharacter, invalidCharacter];

  it('returns only selected characters', () => {
    const result = buildSelectedCharactersExport(characters, ['1']);

    expect(result).toEqual([lukeCharacter]);
  });

  it('returns empty array if nothing selected', () => {
    const result = buildSelectedCharactersExport(characters, ['999']);

    expect(result).toEqual([]);
  });

  it('ignores invalid urls', () => {
    const result = buildSelectedCharactersExport(characters, ['1', '5', '999']);

    expect(result).toHaveLength(2);

    expect(result).toEqual([lukeCharacter, leiaCharacter]);
  });
});
