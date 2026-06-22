'use client';
import './result-section.css';
import { ResultsDataProps } from '../../types/types';
import { RefreshButton } from '../RefreshButton';
import { ResultsListSkeleton } from '../skeletons/ResultsListSkeleton';
import { ResultList } from './ResultList';
import { useTranslations } from 'next-intl';
import './result-section.css';

type ResultsSectionProps = ResultsDataProps & {
  onRefresh: () => void;
};

export function ResultsSection({
  results,
  isLoading,
  isFetching,
  error,
  onRefresh,
}: ResultsSectionProps) {
  const t = useTranslations('Search');
  return (
    <section className="results-section">
      <div className="results-header-bar">
        <h2>{t('results')}</h2>

        <div className="results-actions">
          <RefreshButton onRefresh={onRefresh} isFetching={isFetching} />

          {isFetching && !isLoading && (
            <div className="small-loading-indicator">
              <span>{t('updating')}</span>
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <ResultsListSkeleton />
      ) : (
        <ResultList
          results={results}
          isLoading={isLoading}
          isFetching={isFetching}
          error={error}
        />
      )}
    </section>
  );
}
