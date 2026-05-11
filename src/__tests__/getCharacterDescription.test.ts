import { getCharacterDescription } from '../util/getCharacterDescription';
import { lukeCharacter } from '../test/mocks/characters.ts';

describe('getCharacterDescription', () => {
  it('returns formatted character description', () => {
    expect(getCharacterDescription(lukeCharacter)).toBe(
      'Gender: male | Height: 172 | Birth year: 19BBY'
    );
  });
});
