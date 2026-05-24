import type { ResultsDataProps } from '../../types/types.ts';
import { ResultList } from './ResultList.tsx';
import './result-section.css';

export function ResultsSection({
  results,
  isLoading,
  error,
}: ResultsDataProps) {
  return (
    <section className="results-section">
      <h2>Results</h2>

      <ResultList results={results} isLoading={isLoading} error={error} />
    </section>
  );
}
