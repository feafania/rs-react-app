import type { ResultsDataProps } from '../types/types.ts';
import { ResultRow } from './ResultRow';

export function ResultList({ results, isLoading, error }: ResultsDataProps) {
  if (isLoading) {
    return (
      <div className="loading-state" role="status">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state" role="alert">
        {error}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="empty-state" role="status">
        No results found
      </div>
    );
  }

  return (
    <div className="results-table">
      <div className="results-header">
        <span>Item Name</span>
        <span>Item Description</span>
      </div>

      <div className="results-body">
        {results.map((character) => (
          <ResultRow key={character.name} character={character} />
        ))}
      </div>
    </div>
  );
}
