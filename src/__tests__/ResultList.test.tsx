import { render, screen } from '@testing-library/react';

import { ResultList } from '../components/ResultList';
import { leiaCharacter, lukeCharacter } from '../test/mocks/characters.ts';

describe('ResultList', () => {
  it('renders loading state', () => {
    render(<ResultList results={[]} isLoading={true} error="" />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(
      <ResultList results={[]} isLoading={false} error="Something went wrong" />
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders empty state when no results found', () => {
    render(<ResultList results={[]} isLoading={false} error="" />);

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('renders results correctly', () => {
    render(
      <ResultList
        isLoading={false}
        error=""
        results={[lukeCharacter, leiaCharacter]}
      />
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();

    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
  });
});
