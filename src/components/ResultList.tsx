import { Component } from 'react';
import type { Character } from '../types/types.ts';
import { ResultRow } from './ResultRow';

interface ResultListProps {
  results: Character[];
  isLoading: boolean;
}

export class ResultList extends Component<ResultListProps> {
  render() {
    const { results, isLoading } = this.props;

    if (isLoading) {
      return <div className="loading-state">Loading...</div>;
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
