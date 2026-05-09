import { Component } from 'react';
import { SearchSection } from './components/SearchSection';
import { ResultsSection } from './components/ResultsSection';
import type { Character } from './types/types.ts';

import './App.css';

interface AppState {
  results: Character[];
  searchTerm: string;
}

class App extends Component<object, AppState> {
  state: AppState = {
    results: [],
    searchTerm: '',
  };

  componentDidMount(): void {
    const savedSearch = localStorage.getItem('searchTerm') || '';

    this.setState(
      {
        searchTerm: savedSearch,
      },
      () => {
        this.fetchData(savedSearch);
      }
    );
  }

  fetchData = async (searchTerm: string): Promise<void> => {
    const url = searchTerm
      ? `https://swapi.py4e.com/api/people/?search=${searchTerm}`
      : `https://swapi.py4e.com/api/people/`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      this.setState({
        results: data.results,
      });
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  handleSearch = (searchTerm: string): void => {
    localStorage.setItem('searchTerm', searchTerm);

    this.setState({
      searchTerm,
    });

    this.fetchData(searchTerm);
  };

  render() {
    return (
      <main className="layout">
        <SearchSection
          onSearch={this.handleSearch}
          initialValue={this.state.searchTerm}
        />

        <ResultsSection results={this.state.results} />
      </main>
    );
  }
}

export default App;
