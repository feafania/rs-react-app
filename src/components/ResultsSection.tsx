import { Component } from 'react';
import type { Character } from '../types/types.ts';
import { ResultList } from './ResultList';

interface ResultsSectionProps {
  results: Character[];
  isLoading: boolean;
}

export class ResultsSection extends Component<ResultsSectionProps> {
  render() {
    return (
      <section className="results-section">
        <h2>Results</h2>

        <ResultList
          results={this.props.results}
          isLoading={this.props.isLoading}
        />
      </section>
    );
  }
}
