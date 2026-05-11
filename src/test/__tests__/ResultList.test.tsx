import { render, screen } from '@testing-library/react';

import { ResultList } from '../../components/ResultList.tsx';
import { leiaCharacter, lukeCharacter } from '../mocks/characters.ts';

describe('ResultList', () => {
  it('renders loading state with accessibility role', () => {
    render(<ResultList results={[]} isLoading={true} error="" />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders error message with alert role', () => {
    render(
      <ResultList results={[]} isLoading={false} error="Something went wrong" />
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders empty state when no results found', () => {
    render(<ResultList results={[]} isLoading={false} error="" />);

    expect(screen.getByRole('status')).toHaveTextContent('No results found');
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
