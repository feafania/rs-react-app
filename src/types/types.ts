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
  isFetching: boolean;
  error: string;
}

export type ExportCharacter =
  | { status: 'fulfilled'; data: CharacterDetailsData }
  | { status: 'rejected'; id: string };

export type Theme = 'light' | 'dark';

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export type BaseFormFields = {
  name: string;
  age: number | undefined;
  gender: 'female' | 'male' | 'other';
  email: string;
  termsAccepted: boolean;
};

export const FormTypes = {
  uncontrolled: 'uncontrolled',
  rhf: 'rhf',
} as const;

export type FormType = (typeof FormTypes)[keyof typeof FormTypes];
