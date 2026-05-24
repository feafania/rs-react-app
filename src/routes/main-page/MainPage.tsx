import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router';
import { useLocation } from 'react-router';

import { SearchSection } from '../../components/SearchSection.tsx';
import { ResultsSection } from '../../components/result-section/ResultsSection.tsx';
import { Pagination } from '../../components/Pagination.tsx';
import { TriggerErrorButton } from '../../components/TriggerErrorButton.tsx';
import { useCharacterSearch } from '../../hooks/useCharacterSearch.ts';
import { ITEMS_PER_PAGE } from '../../constants';

import './main-page.css';
import './pagination.css';
import { updateSearchParams } from '../../util/updateSearchParams.ts';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';
import { SelectedFlyout } from '../../components/result-flyout/SelectedFlyout.tsx';

function MainPage() {
  const { results, totalCount, isLoading, error, handleSearch } =
    useCharacterSearch();

  const [searchParams, setSearchParams] = useSearchParams();

  const urlSearch = searchParams.get('search')?.trim() || '';
  const [storedSearch] = useLocalStorage('searchTerm');

  const [shouldThrow, setShouldThrow] = useState(false);

  const [inputValue, setInputValue] = useState(() => urlSearch || storedSearch);

  const rawPage = Number(searchParams.get('page'));
  const currentPage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const { pathname } = useLocation();
  const isDetailsOpen = pathname.includes('/details/');

  const hasBootstrapped = useRef(false);
  const navigate = useNavigate();

  if (shouldThrow) {
    throw new Error('Test error triggered!');
  }

  useEffect(() => {
    if (hasBootstrapped.current) return;
    hasBootstrapped.current = true;

    const urlHasSearch = searchParams.get('search');
    const stored = storedSearch;

    if (!urlHasSearch && stored) {
      setSearchParams(
        updateSearchParams(searchParams, {
          search: stored,
          page: '1',
        }),
        { replace: true }
      );
    }
  }, []);

  useEffect(() => {
    const search = searchParams.get('search')?.trim() || '';
    handleSearch(search, currentPage);
  }, [searchParams.get('search'), currentPage, handleSearch]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setSearchParams(
        updateSearchParams(searchParams, {
          page: String(totalPages),
        }),
        { replace: true }
      );
    }
  }, [currentPage, totalPages, searchParams, setSearchParams]);

  const handlePageChange = (page: number): void => {
    setSearchParams(
      updateSearchParams(searchParams, {
        page: String(page),
      })
    );
  };

  const [, setStoredSearch] = useLocalStorage('searchTerm');

  const handleSearchSubmit = (term: string) => {
    const trimmed = term.trim();

    setInputValue(trimmed);
    setStoredSearch(trimmed);

    setSearchParams(
      updateSearchParams(searchParams, {
        search: trimmed,
        page: '1',
      })
    );
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

        <ResultsSection results={results} isLoading={isLoading} error={error} />

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
      <SelectedFlyout results={results} />
    </main>
  );
}

export default MainPage;
