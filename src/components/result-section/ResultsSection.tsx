import type { ResultsDataProps } from '../../types/types.ts';
import { ResultList } from './ResultList.tsx';
import './result-section.css';
import { ResultsListSkeleton } from '../skeletons/ResultsListSkeleton.tsx';

export function ResultsSection({
  results,
  isLoading,
  isFetching,
  error,
}: ResultsDataProps) {
  return (
    <section className="results-section">
      <div className="results-header-bar">
        <h2>Results</h2>

        {isFetching && !isLoading && (
          <div className="small-loading-indicator">
            <div className="small-spinner" />
            <span>Updating…</span>
          </div>
        )}
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
