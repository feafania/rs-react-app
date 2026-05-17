import type { ResultsDataProps } from '../types/types.ts';
import { ResultList } from './ResultList';

export function ResultsSection({
  results,
  isLoading,
  error,
  hasSearched,
}: ResultsDataProps) {
  return (
    <section className="results-section">
      <h2>Results</h2>

      <ResultList
        results={results}
        isLoading={isLoading}
        error={error}
        hasSearched={hasSearched}
      />
    </section>
  );
}
