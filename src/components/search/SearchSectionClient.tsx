'use client';

import { type ChangeEvent, type SyntheticEvent } from 'react';
import { SearchInput } from './SearchInput';
import { SearchButton } from './SearchButton';

interface SearchSectionProps {
  onSearch: (searchTerm: string) => void;
  onSearchInputChange: (value: string) => void;
  initialValue: string;
}

export function SearchSectionClient({
  onSearch,
  onSearchInputChange,
  initialValue,
}: SearchSectionProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onSearchInputChange(event.target.value);
  };

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSearch(initialValue.trim());
  };

  return (
    <form
      className="search-section"
      onSubmit={handleSubmit}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="top-controls">
        <SearchInput value={initialValue} onChange={handleChange} />
        <SearchButton />
      </div>
    </form>
  );
}
