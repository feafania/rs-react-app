import { useEffect, useRef, useState } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router';

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
  const location = useLocation();

  const isDetailsOpen = location.pathname.includes('/details/');

  const hasSearched = searchTerm.trim().length > 0;
  const rawPage = Number(searchParams.get('page'));
  const currentPage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const correctedPageRef = useRef<number | null>(null);

  const searchTermRef = useRef(searchTerm);

  useEffect(() => {
    searchTermRef.current = searchTerm;
  }, [searchTerm]);

  useEffect(() => {
    const pageParam = searchParams.get('page');
    const parsed = Number(pageParam);
    const isValidPage = Number.isFinite(parsed) && parsed > 0;

    if (!isValidPage) {
      setSearchParams({ page: '1' }, { replace: true });
      handleSearch(searchTermRef.current, 1);
      return;
    }

    if (correctedPageRef.current === parsed) {
      correctedPageRef.current = null;
      return;
    }

    handleSearch(searchTermRef.current, parsed);
  }, [searchParams, handleSearch, setSearchParams]);

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

    navigate('/?page=1', { replace: true });
  };

  return (
    <main
      className={`layout ${isDetailsOpen ? 'layout-split' : ''}`}
      onClick={() => {
        if (isDetailsOpen) {
          navigate(`/?${searchParams.toString()}`);
        }
      }}
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

      <Outlet />
    </main>
  );
}

export default MainPage;
