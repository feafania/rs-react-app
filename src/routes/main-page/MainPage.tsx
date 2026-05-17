import { useEffect, useState } from 'react';

import { Outlet, useSearchParams } from 'react-router';

import { SearchSection } from '../../components/SearchSection.tsx';
import { ResultsSection } from '../../components/ResultsSection.tsx';
import { TriggerErrorButton } from '../../components/TriggerErrorButton.tsx';
import { Pagination } from '../../components/Pagination.tsx';

import { useCharacterSearch } from '../../hooks/useCharacterSearch.ts';

import './main-page.css';
import './pagination.css';
import { ITEMS_PER_PAGE } from '../../constants';

function MainPage() {
  const { results, totalCount, searchTerm, isLoading, error, handleSearch } =
    useCharacterSearch();

  const [searchParams, setSearchParams] = useSearchParams();

  const [shouldThrow, setShouldThrow] = useState(false);
  const [inputValue, setInputValue] = useState(searchTerm);
  const [hasSearched, setHasSearched] = useState(false);

  const currentPage = Number(searchParams.get('page') || '1');

  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: '1' }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  if (shouldThrow) {
    throw new Error('Test error triggered!');
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setSearchParams({ page: String(totalPages) });
    }
  }, [currentPage, totalPages, setSearchParams]);

  const handlePageChange = (page: number): void => {
    setSearchParams({ page: String(page) });

    handleSearch(searchTerm, page);
  };

  const handleSearchSubmit = (term: string): void => {
    setSearchParams({ page: '1' });

    handleSearch(term, 1);

    setInputValue(term);

    setHasSearched(true);
  };

  return (
    <main className="layout">
      <div className="main-panel">
        <SearchSection
          onSearch={handleSearchSubmit}
          onSearchInputChange={setInputValue}
          initialValue={inputValue}
        />

        <ResultsSection
          results={results}
          isLoading={isLoading}
          error={error}
          hasSearched={hasSearched}
        />
        {!isLoading && results.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        <TriggerErrorButton onClick={() => setShouldThrow(true)} />
      </div>

      <Outlet />
    </main>
  );
}

export default MainPage;
