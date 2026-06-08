import { screen } from '@testing-library/react';

import MainPage from '../../../../routes/main-page/MainPage.tsx';
import { renderWithProviders } from '../../test-utils/renderWithProviders.tsx';
import { mockQueryEmpty } from '../../../mocks/mockQuery.ts';

import { vi } from 'vitest';
import { useCharactersQuery } from '../../../../hooks/useCharactersQuery.ts';
import { lukeCharacter } from '../../../mocks/characters.ts';

vi.mock('../../../../hooks/useCharactersQuery.ts');

const mockedUseCharactersQuery = vi.mocked(useCharactersQuery);

describe('App - render & initial load', () => {
  it('renders results when query returns data', () => {
    mockedUseCharactersQuery.mockReturnValue({
      data: {
        results: [lukeCharacter],
        totalCount: 1,
      },
      isLoading: false,
      isFetching: false,
      error: null,
    } as ReturnType<typeof useCharactersQuery>);

    renderWithProviders(<MainPage />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('shows "No results found" when search returns empty array', () => {
    mockedUseCharactersQuery.mockReturnValue(
      mockQueryEmpty() as ReturnType<typeof useCharactersQuery>
    );

    renderWithProviders(<MainPage />);

    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });
});
