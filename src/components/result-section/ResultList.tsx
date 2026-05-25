import type { ResultsDataProps } from '../../types/types.ts';
import { ResultRow } from './ResultRow.tsx';

export function ResultList({ results, isLoading, error }: ResultsDataProps) {
  if (error) {
    return (
      <div className="error-state" role="alert">
        {error}
      </div>
    );
  }

  if (!isLoading && results.length === 0) {
    return <div className="empty-state">No results found</div>;
  }
  return (
    <div className="results-wrapper">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loader" aria-label="loading" />
        </div>
      )}

      <div className="results-table">
        <div className="results-header">
          <span />

          <span>Item Name</span>

          <span>Item Description</span>
        </div>

        <div className="results-body">
          {results.map((character) => (
            <ResultRow key={character.name} character={character} />
          ))}
        </div>
      </div>
    </div>
  );
}
