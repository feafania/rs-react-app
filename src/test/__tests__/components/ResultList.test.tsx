import { render, screen } from '@testing-library/react';
import { leiaCharacter, lukeCharacter } from '../../mocks/characters.ts';
import { ResultList } from '../../../components/result-section/ResultList.tsx';
import { MemoryRouter } from 'react-router';

describe('ResultList', () => {
  it('renders loading state', () => {
    render(<ResultList results={[]} isLoading={true} error="" />);

    expect(document.querySelector('.loader')).toBeInTheDocument();
  });

  it('renders error message with alert role', () => {
    render(
      <ResultList results={[]} isLoading={false} error="Something went wrong" />
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders empty state when no results found', () => {
    render(<ResultList results={[]} isLoading={false} error="" />);

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('renders results correctly', () => {
    render(
      <MemoryRouter>
        <ResultList
          isLoading={false}
          error=""
          results={[lukeCharacter, leiaCharacter]}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
  });
});
