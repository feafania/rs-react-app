export interface Character {
  name: string;
  gender: string;
  height: string;
  birth_year: string;
  url: string;
}

export interface CharacterDetailsData {
  name: string;
  gender: string;
  height: string;
  birth_year: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
}

export interface ResultsDataProps {
  results: Character[];
  isLoading: boolean;
  error: string;
  hasSearched: boolean;
}
