import type { Character } from '../../types/types.ts';

export const lukeCharacter: Character = {
  name: 'Luke Skywalker',
  gender: 'male',
  height: '172',
  birth_year: '19BBY',
  url: 'https://swapi.dev/api/people/1/',
};

export const leiaCharacter: Character = {
  name: 'Leia Organa',
  gender: 'female',
  height: '150',
  birth_year: '19BBY',
  url: 'https://swapi.dev/api/people/5/',
};

export const emptyCharacter: Character = {
  name: '',
  gender: '',
  height: '',
  birth_year: '',
  url: 'https://swapi.dev/api/people/999/',
};

export const mockCharacters = [lukeCharacter];
