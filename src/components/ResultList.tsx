import { Component } from 'react';
import type { ResultsDataProps } from '../types/types.ts';
import { ResultRow } from './ResultRow';

export class ResultList extends Component<ResultsDataProps> {
  render() {
    const { results, isLoading, error } = this.props;

    if (isLoading) {
      return <div className="loading-state">Loading...</div>;
    }

    if (error) {
      return <div className="error-state">{error}</div>;
    }

    if (results.length === 0) {
      return <div className="empty-state">No results found</div>;
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
}
