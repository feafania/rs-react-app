import type { ResultsDataProps } from '../../types/types.ts';
import { ResultList } from './ResultList.tsx';
import './result-section.css';
import { ResultsListSkeleton } from '../skeletons/ResultsListSkeleton.tsx';
import { RefreshButton } from '../RefreshButton.tsx';

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
  return (
    <section className="results-section">
      <div className="results-header-bar">
        <h2>Results</h2>

        <div className="results-actions">
          <RefreshButton onRefresh={onRefresh} isFetching={isFetching} />

          {isFetching && !isLoading && (
            <div className="small-loading-indicator">
              <span>Updating…</span>
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
