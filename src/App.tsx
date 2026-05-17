import { useState } from 'react';
import { useCharacterSearch } from './hooks/useCharacterSearch.ts';
import { SearchSection } from './components/SearchSection';
import { ResultsSection } from './components/ResultsSection';
import { TriggerErrorButton } from './components/TriggerErrorButton.tsx';
import './App.css';

function App() {
  const {
    results,
    searchTerm,
    isLoading,
    error,
    handleSearch,
    handleInputChange,
  } = useCharacterSearch();
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('Test error triggered!');
  }

  return (
    <main className="layout">
      <SearchSection
        onSearch={handleSearch}
        onSearchInputChange={handleInputChange}
        initialValue={searchTerm}
      />
      <ResultsSection results={results} isLoading={isLoading} error={error} />
      <TriggerErrorButton onClick={() => setShouldThrow(true)} />
    </main>
  );
}

export default App;
