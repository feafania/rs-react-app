import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router';
import { useLocation } from 'react-router';

import { SearchSection } from '../../components/SearchSection.tsx';
import { ResultsSection } from '../../components/result-section/ResultsSection.tsx';
import { Pagination } from '../../components/Pagination.tsx';
import { TriggerErrorButton } from '../../components/TriggerErrorButton.tsx';
import { ITEMS_PER_PAGE } from '../../constants';

import './main-page.css';
import './pagination.css';
import { updateSearchParams } from '../../util/updateSearchParams.ts';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';
import { SelectedFlyout } from '../../components/selected-flyout/SelectedFlyout.tsx';
import { useCharactersQuery } from '../../hooks/useCharactersQuery.ts';
import { useRefreshData } from '../../hooks/useRefreshData.ts';
import { SubmissionsList } from '../../components/forms/SubmissionsList.tsx';

function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawPage = Number(searchParams.get('page'));
  const rawSearch = searchParams.get('search')?.trim() || '';
  const currentPage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  const urlSearch = searchParams.get('search')?.trim() || '';
  const [storedSearch, setStoredSearch] = useLocalStorage('searchTerm');

  const { data, isLoading, isFetching, error } = useCharactersQuery(
    rawSearch,
    currentPage
  );
  const results = data?.results ?? [];

  const totalCount = data?.totalCount ?? 0;

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const [shouldThrow, setShouldThrow] = useState(false);
  const [inputValue, setInputValue] = useState(() => urlSearch || storedSearch);

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

    const updates: Record<string, string> = {};

    if (!rawSearch && storedSearch) {
      updates.search = storedSearch;
      updates.page = '1';
    }

    if (!rawPage) {
      updates.page = '1';
    }

    if (Object.keys(updates).length > 0) {
      setSearchParams(updateSearchParams(searchParams, updates), {
        replace: true,
      });
    }
  }, []);

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

  const errorMessage = error instanceof Error ? error.message : '';
  const { refreshAll } = useRefreshData();

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
          isFetching={isFetching}
          error={errorMessage}
          onRefresh={refreshAll}
        />

        {!isLoading && results.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
        <SubmissionsList />
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
