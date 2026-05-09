import { Component } from 'react';
import { SearchSection } from './components/SearchSection';
import { ResultsSection } from './components/ResultsSection';
import type { Character } from './types/types.ts';

import './App.css';

interface AppState {
  results: Character[];
}

class App extends Component<object, AppState> {
  state: AppState = {
    results: [],
  };

  handleSearch = async (searchTerm: string): Promise<void> => {
    try {
      const response = await fetch(
        `https://swapi.py4e.com/api/people/?search=${searchTerm}`
      );

      const data = await response.json();

      this.setState({
        results: data.results,
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <main className="layout">
        <SearchSection onSearch={this.handleSearch} />

        <ResultsSection results={this.state.results} />
      </main>
    );
  }
}

export default App;
