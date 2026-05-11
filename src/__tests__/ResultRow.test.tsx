import { render, screen } from '@testing-library/react';

import { ResultRow } from '../components/ResultRow';
import { emptyCharacter, lukeCharacter } from '../test/mocks/characters.ts';

describe('ResultRow', () => {
  it('renders Сharacter data correctly', () => {
    render(<ResultRow character={lukeCharacter} />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();

    expect(
      screen.getByText('Gender: male | Height: 172 | Birth year: 19BBY')
    ).toBeInTheDocument();
  });

  it('renders correctly with empty values', () => {
    render(<ResultRow character={emptyCharacter} />);

    expect(
      screen.getByText('Gender: | Height: | Birth year:')
    ).toBeInTheDocument();
  });
});
