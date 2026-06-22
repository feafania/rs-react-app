'use client';

import './main-page.css';
import './pagination.css';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useCharactersQuery } from '../../hooks/useCharactersQuery';
import { useRefreshData } from '../../hooks/useRefreshData';

import { SearchSectionClient } from '../../components/search/SearchSectionClient';
import { ResultsSection } from '../../components/result-section/ResultsSection';
import { PaginationClient } from '../../components/Pagination/PaginationClient';
import { TriggerErrorButton } from '../../components/TriggerErrorButton';
import { SelectedFlyout } from '../../components/selected-flyout/SelectedFlyout';

import { updateSearchParams } from '../../util/updateSearchParams';
import { CharacterDetailsClient } from '../character-details/CharacterDetailsClient';
import { useRouter } from '../../i18n/navigation';
import { Character } from '../../types/types';

interface SwapiResponse {
  results: Character[];
  totalCount: number;
}

type ClientProps = {
  initialData: SwapiResponse | null;
  initialSearch: string;
  initialPage: number;
  initialTotalPages: number;
  detailsId?: string;
  children: React.ReactNode;
};

export default function MainPageClient({
  initialData,
  initialSearch,
  initialPage,
  initialTotalPages,
  detailsId,
  children,
}: ClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();

  const rawPage = Number(searchParams.get('page'));
  const rawSearch = (searchParams.get('search') ?? '').trim();
  const currentPage =
    Number.isFinite(rawPage) && rawPage > 0 ? rawPage : initialPage;

  const [storedSearch, setStoredSearch] = useLocalStorage('searchTerm');
  const [isHydrated, setIsHydrated] = useState(false);

  const isInitialValid =
    rawSearch === initialSearch && currentPage === initialPage;

  const { data, isLoading, isFetching, error } = useCharactersQuery(
    rawSearch,
    currentPage,
    isInitialValid && initialData ? { initialData } : undefined
  );

  const results = data?.results ?? initialData?.results ?? [];
  const totalPages = data
    ? Math.ceil((data.totalCount ?? 0) / 10)
    : initialTotalPages;

  const [shouldThrow, setShouldThrow] = useState(false);
  const [inputValue, setInputValue] = useState(
    () => rawSearch || storedSearch || initialSearch
  );

  const lastPageFixRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isHydrated && !rawSearch && storedSearch.trim()) {
      const current = new URLSearchParams(window.location.search);
      current.set('search', storedSearch.trim());
      current.set('page', '1');
      router.replace(`/?${current.toString()}`);
    }
  }, [isHydrated, rawSearch, storedSearch, router]);

  useEffect(() => {
    if (!totalPages || currentPage <= totalPages) return;
    if (lastPageFixRef.current === totalPages) return;

    lastPageFixRef.current = totalPages;
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(totalPages));
    router.replace(`/?${params.toString()}`);
  }, [currentPage, totalPages, searchParams, router]);

  if (shouldThrow) throw new Error('trigger');

  const handlePageChange = (page: number) => {
    const current = new URLSearchParams(window.location.search);
    const newParams = updateSearchParams(current, { page: String(page) });
    router.replace(`/?${newParams.toString()}`);
  };

  const handleSearchSubmit = (term: string) => {
    const trimmed = term.trim();

    setInputValue(trimmed);
    setStoredSearch(trimmed);

    if (trimmed === rawSearch) return;

    const current = new URLSearchParams(window.location.search);
    const newParams = updateSearchParams(current, {
      search: trimmed,
      page: '1',
    });

    router.push(`/?${newParams.toString()}`);
  };

  const handleCloseDetails = () => {
    const current = new URLSearchParams(window.location.search);
    current.delete('detailsId');
    router.push(`/?${current.toString()}`);
  };

  const queryError = error instanceof Error ? error : null;
  const { refreshAll } = useRefreshData();
  const isDetailsOpen = !!detailsId;

  if (!isHydrated) {
    return (
      <main className={`layout ${isDetailsOpen ? 'layout-split' : ''}`}>
        {children}
      </main>
    );
  }

  return (
    <main className={`layout ${isDetailsOpen ? 'layout-split' : ''}`}>
      <div className="main-panel">
        <SearchSectionClient
          onSearch={handleSearchSubmit}
          onSearchInputChange={setInputValue}
          initialValue={inputValue}
          locale={locale}
          currentSearch={rawSearch}
        />

        <ResultsSection
          results={results}
          isLoading={isInitialValid && initialData ? false : isLoading}
          isFetching={isFetching}
          error={queryError}
          onRefresh={refreshAll}
        />

        {results.length > 0 && (
          <PaginationClient
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
          <CharacterDetailsClient
            id={detailsId}
            onCloseAction={handleCloseDetails}
          />
        </>
      )}

      <SelectedFlyout results={results} />
    </main>
  );
}
