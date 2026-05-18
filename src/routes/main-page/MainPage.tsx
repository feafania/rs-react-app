import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router';
import { useLocation } from 'react-router';

import { SearchSection } from '../../components/SearchSection.tsx';
import { ResultsSection } from '../../components/ResultsSection.tsx';
import { Pagination } from '../../components/Pagination.tsx';
import { TriggerErrorButton } from '../../components/TriggerErrorButton.tsx';
import { useCharacterSearch } from '../../hooks/useCharacterSearch.ts';
import { ITEMS_PER_PAGE } from '../../constants';

import './main-page.css';
import './pagination.css';

function MainPage() {
  const {
    results,
    totalCount,
    searchTerm,
    setSearchTerm,
    isLoading,
    error,
    handleSearch,
  } = useCharacterSearch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [shouldThrow, setShouldThrow] = useState(false);
  const [inputValue, setInputValue] = useState(searchTerm);

  const hasSearched = searchTerm.trim().length > 0;
  const rawPage = Number(searchParams.get('page'));
  const currentPage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const correctedPageRef = useRef<number | null>(null);

  const searchTermRef = useRef(searchTerm);
  const { pathname } = useLocation();
  const isDetailsOpen = pathname.includes('/details/');

  useEffect(() => {
    searchTermRef.current = searchTerm;
  }, [searchTerm]);

  useEffect(() => {
    const page = currentPage;
    const term = searchParams.get('search')?.trim() || searchTerm.trim();

    handleSearch(term, page);
  }, [searchParams, currentPage, handleSearch]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      correctedPageRef.current = totalPages;
      setSearchParams({ page: String(totalPages) }, { replace: true });
    }
  }, [currentPage, totalPages, setSearchParams]);

  if (shouldThrow) {
    throw new Error('Test error triggered!');
  }

  const navigate = useNavigate();

  const handlePageChange = (page: number): void => {
    navigate(`/?page=${page}`);
  };

  const handleSearchSubmit = (term: string): void => {
    const trimmed = term.trim();

    setInputValue(trimmed);

    if (trimmed === searchTerm.trim()) return;

    setSearchTerm(trimmed);

    navigate(`/?search=${trimmed}&page=1`);
  };

  return (
    <main
      className={`layout ${pathname.includes('/details/') ? 'layout-split' : ''}`}
    >
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
      {isDetailsOpen && (
        <div className="details-overlay" onClick={() => navigate(-1)} />
      )}

      <Outlet />
    </main>
  );
}

export default MainPage;
