export interface Character {
  name: string;
  gender: string;
  height: string;
  birth_year: string;
  url: string;
}

export interface CharacterDetailsData extends Character {
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
}

export interface ResultsDataProps {
  results: Character[];
  isLoading: boolean;
  error: string;
}

export type ExportCharacter =
  | { status: 'fulfilled'; data: CharacterDetailsData }
  | { status: 'rejected'; id: string };
