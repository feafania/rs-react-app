import { Component } from 'react';
import { SearchSection } from './components/SearchSection';
import { ResultsSection } from './components/ResultsSection';
import type { Character } from './types/types.ts';

import './App.css';
import { TriggerErrorButton } from './components/TriggerErrorButton.tsx';

interface AppState {
  results: Character[];
  searchTerm: string;
  lastRequestedTerm: string;
  isLoading: boolean;
  error: string;
  shouldThrow: boolean;
}

class App extends Component<object, AppState> {
  state: AppState = {
    results: [],
    searchTerm: '',
    lastRequestedTerm: '',
    isLoading: false,
    error: '',
    shouldThrow: false,
  };

  componentDidMount(): void {
    const savedSearch = localStorage.getItem('searchTerm') || '';

    this.setState(
      {
        searchTerm: savedSearch,
        lastRequestedTerm: savedSearch,
      },
      () => {
        this.fetchData(savedSearch);
      }
    );
  }

  fetchData = async (searchTerm: string): Promise<void> => {
    this.setState({
      isLoading: true,
      error: '',
    });

    const url = searchTerm
      ? `https://swapi.py4e.com/api/people/?search=${searchTerm}&page=1`
      : `https://swapi.py4e.com/api/people/?page=1`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          response.status >= 500
            ? 'Server error. Please try again later.'
            : 'Unable to fetch data.'
        );
      }

      const data = await response.json();

      this.setState({
        results: data.results,
        isLoading: false,
        error: '',
      });
    } catch {
      this.setState({
        results: [],
        isLoading: false,
        error: 'Something went wrong. Please try again.',
      });
    }
  };

  handleSearch = (searchTerm: string): void => {
    const trimmed = searchTerm.trim();

    this.setState({
      searchTerm: trimmed,
      lastRequestedTerm: trimmed,
    });

    localStorage.setItem('searchTerm', trimmed);

    if (trimmed === this.state.lastRequestedTerm) {
      return;
    }

    this.fetchData(trimmed);
  };

  handleInputChange = (value: string): void => {
    this.setState({
      searchTerm: value,
    });
  };

  triggerError = (): void => {
    this.setState({ shouldThrow: true });
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error('Test error triggered!');
    }
    return (
      <main className="layout">
        <SearchSection
          onSearch={this.handleSearch}
          onSearchInputChange={this.handleInputChange}
          initialValue={this.state.searchTerm}
        />

        <ResultsSection
          results={this.state.results}
          isLoading={this.state.isLoading}
          error={this.state.error}
        />

        <TriggerErrorButton onClick={this.triggerError} />
      </main>
    );
  }
}

export default App;
