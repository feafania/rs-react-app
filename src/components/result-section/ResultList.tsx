import { ResultRow } from './ResultRow.tsx';
import type { ResultsDataProps } from '../../types/types.ts';

export function ResultList({ results, error }: ResultsDataProps) {
  if (error) {
    return (
      <div className="error-state" role="alert">
        {error}
      </div>
    );
  }

  if (results.length === 0) {
    return <div className="empty-state">No results found</div>;
  }

  return (
    <div className="results-wrapper">
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
