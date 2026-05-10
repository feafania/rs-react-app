import { Component } from 'react';
import { SearchSection } from './components/SearchSection';
import { ResultsSection } from './components/ResultsSection';
import type { Character } from './types/types.ts';

import './App.css';
import { normalizeSearchTerm } from './utils/normalizeSearchTerm.ts';

interface AppState {
  results: Character[];
  searchTerm: string;
  lastRequestedTerm: string;
  isLoading: boolean;
}

class App extends Component<object, AppState> {
  state: AppState = {
    results: [],
    searchTerm: '',
    lastRequestedTerm: '',
    isLoading: false,
  };

  componentDidMount(): void {
    const savedSearch = localStorage.getItem('searchTerm') || '';

    const trimmed = normalizeSearchTerm(savedSearch);

    this.setState(
      {
        searchTerm: trimmed,
        lastRequestedTerm: trimmed,
      },
      () => {
        this.fetchData(trimmed);
      }
    );
  }

  fetchData = async (searchTerm: string): Promise<void> => {
    const trimmed = normalizeSearchTerm(searchTerm);

    this.setState({ isLoading: true });
    const url = trimmed
      ? `https://swapi.py4e.com/api/people/?search=${trimmed}&page=1`
      : `https://swapi.py4e.com/api/people/?page=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // await new Promise((r) => setTimeout(r, 300));

      this.setState({
        results: data.results,
        isLoading: false,
      });
    } catch (error) {
      console.error('Fetch error:', error);
      this.setState({
        isLoading: false,
      });
    }
  };

  handleSearch = (searchTerm: string): void => {
    const trimmed = normalizeSearchTerm(searchTerm);

    if (trimmed === this.state.lastRequestedTerm) {
      return;
    }

    localStorage.setItem('searchTerm', trimmed);

    this.setState({
      searchTerm: trimmed,
      lastRequestedTerm: trimmed,
    });

    this.fetchData(trimmed);
  };

  render() {
    return (
      <main className="layout">
        <SearchSection
          onSearch={this.handleSearch}
          initialValue={this.state.searchTerm}
        />

        <ResultsSection
          results={this.state.results}
          isLoading={this.state.isLoading}
        />
      </main>
    );
  }
}

export default App;
