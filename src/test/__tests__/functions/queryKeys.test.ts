import { queryKeys } from '../../../api/queryKeys.ts';

describe('queryKeys', () => {
  it('creates characters key', () => {
    expect(queryKeys.characters('Luke', 2)).toEqual(['characters', 'Luke', 2]);
  });

  it('creates character key', () => {
    expect(queryKeys.character('1')).toEqual(['character', '1']);
  });
});
