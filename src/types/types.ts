export interface Character {
  name: string;
  gender: string;
  height: string;
  birth_year: string;
}

export interface ResultsDataProps {
  results: Character[];
  isLoading: boolean;
  error: string;
  hasSearched: boolean;
}
