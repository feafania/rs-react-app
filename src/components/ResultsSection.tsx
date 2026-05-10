import { Component } from 'react';
import type { ResultsDataProps } from '../types/types.ts';
import { ResultList } from './ResultList';

export class ResultsSection extends Component<ResultsDataProps> {
  render() {
    return (
      <section className="results-section">
        <h2>Results</h2>

        <ResultList
          results={this.props.results}
          isLoading={this.props.isLoading}
          error={this.props.error}
        />
      </section>
    );
  }
}
