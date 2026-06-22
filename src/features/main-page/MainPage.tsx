'use client';

import './main-page.css';
import './pagination.css';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { ITEMS_PER_PAGE } from '../../constants';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useCharactersQuery } from '../../hooks/useCharactersQuery';
import { useRefreshData } from '../../hooks/useRefreshData';

import { SearchSection } from '../../components/SearchSection';
import { ResultsSection } from '../../components/result-section/ResultsSection';
import { Pagination } from '../../components/Pagination';
import { TriggerErrorButton } from '../../components/TriggerErrorButton';
import { SelectedFlyout } from '../../components/selected-flyout/SelectedFlyout';

import { updateSearchParams } from '../../util/updateSearchParams';
import { CharacterDetails } from '../character-details/CharacterDetails';
import { useRouter } from '../../i18n/navigation';

export default function MainPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const params = useMemo(
    () => searchParams ?? new URLSearchParams(),
    [searchParams]
  );

  const rawPage = Number(params.get('page'));
  const rawSearch = params.get('search')?.trim() || '';
  const currentPage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  const urlSearch = params.get('search')?.trim() || '';
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

  const hasBootstrapped = useRef(false);

  if (shouldThrow) {
    throw new Error('trigger');
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
      const newParams = updateSearchParams(params, updates);
      router.replace(`/?${newParams.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      const newParams = updateSearchParams(params, {
        page: String(totalPages),
      });
      router.replace(`/?${newParams.toString()}`);
    }
  }, [currentPage, totalPages, params, router]);

  const handlePageChange = (page: number): void => {
    const newParams = updateSearchParams(params, {
      page: String(page),
    });
    router.replace({
      pathname: '/',
      query: Object.fromEntries(newParams),
    });
  };

  const handleSearchSubmit = (term: string) => {
    const trimmed = term.trim();

    setInputValue(trimmed);
    setStoredSearch(trimmed);

    const newParams = updateSearchParams(params, {
      search: trimmed,
      page: '1',
    });

    router.push(`/?${newParams.toString()}`);
  };

  const queryError = error instanceof Error ? error : null;
  const { refreshAll } = useRefreshData();

  const detailsId = searchParams?.get('detailsId') ?? null;
  const isDetailsOpen = !!detailsId;

  const handleCloseDetails = () => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.delete('detailsId');
    router.push(`/?${params.toString()}`);
  };

  return (
    <main className={`layout ${isDetailsOpen ? 'layout-split' : ''}`}>
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
          error={queryError}
          onRefresh={refreshAll}
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

      {detailsId && (
        <>
          <div className="details-overlay" onClick={handleCloseDetails} />
          <CharacterDetails id={detailsId} onCloseAction={handleCloseDetails} />
        </>
      )}

      <SelectedFlyout results={results} />
    </main>
  );
}
