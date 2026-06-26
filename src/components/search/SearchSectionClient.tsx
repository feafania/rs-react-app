'use client';

import { type ChangeEvent, type SyntheticEvent } from 'react';
import { SearchInput } from './SearchInput';
import { SearchButton } from './SearchButton';
import { handleSearchAction } from '../../features/main-page/actions';

interface SearchSectionProps {
  onSearch: (searchTerm: string) => void;
  onSearchInputChange: (value: string) => void;
  initialValue: string;
  locale: string;
  currentSearch: string;
}

export function SearchSectionClient({
  onSearch,
  onSearchInputChange,
  initialValue,
  locale,
  currentSearch,
}: SearchSectionProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onSearchInputChange(event.target.value);
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = initialValue.trim();

    onSearchInputChange(trimmed);
    onSearch(trimmed);

    if (trimmed === currentSearch) return;

    const formData = new FormData();
    formData.append('search', trimmed);
    await handleSearchAction(locale, formData);
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
