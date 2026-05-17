import { type ChangeEvent } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search..."
      aria-label="Search characters"
      value={value}
      onChange={onChange}
    />
  );
}
