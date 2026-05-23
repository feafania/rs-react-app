import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import { ResultRow } from '../../components/ResultRow.tsx';
import { emptyCharacter, lukeCharacter } from '../mocks/characters.ts';

describe('ResultRow', () => {
  it('renders Character data correctly', () => {
    render(
      <MemoryRouter>
        <ResultRow character={lukeCharacter} />
      </MemoryRouter>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(
      screen.getByText('Gender: male | Height: 172 | Birth year: 19BBY')
    ).toBeInTheDocument();
  });

  it('renders correctly with empty values', () => {
    render(
      <MemoryRouter>
        <ResultRow character={emptyCharacter} />
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        (content) =>
          content.includes('Gender:') &&
          content.includes('Height:') &&
          content.includes('Birth year:')
      )
    ).toBeInTheDocument();
  });
});
