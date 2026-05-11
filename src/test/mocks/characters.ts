import type { Character } from '../../types/types.ts';

export const lukeCharacter: Character = {
  name: 'Luke Skywalker',
  gender: 'male',
  height: '172',
  birth_year: '19BBY',
};

export const leiaCharacter: Character = {
  name: 'Leia Organa',
  gender: 'female',
  height: '150',
  birth_year: '19BBY',
};

export const emptyCharacter: Character = {
  name: '',
  gender: '',
  height: '',
  birth_year: '',
};

export const mockCharacters = [lukeCharacter];
