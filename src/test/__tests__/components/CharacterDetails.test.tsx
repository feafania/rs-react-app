import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Routes, Route } from 'react-router';
import { vi } from 'vitest';

import { CharacterDetails } from '../../../routes/character-details/CharacterDetails.tsx';
import { renderWithProviders } from '../test-utils/renderWithProviders.tsx';
import { useCharacterDetailsQuery } from '../../../hooks/useCharacterDetailsQuery.ts';

vi.mock('../../../hooks/useCharacterDetailsQuery.ts', () => ({
  useCharacterDetailsQuery: vi.fn(),
}));

vi.mock('../../../hooks/useRefreshCharacterDetails.ts', () => ({
  useRefreshCharacterDetails: () => vi.fn(),
}));

const mockedUseCharacterDetailsQuery = vi.mocked(useCharacterDetailsQuery);

const mockCharacter = {
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  gender: 'male',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  eye_color: 'blue',
  skin_color: 'fair',
};

function renderDetails(path = '/details/1') {
  return renderWithProviders(
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/details/:id" element={<CharacterDetails />} />
    </Routes>,
    {
      initialPath: path,
    }
  );
}

describe('CharacterDetails', () => {
  beforeEach(() => {
    mockedUseCharacterDetailsQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      error: null,
    } as ReturnType<typeof useCharacterDetailsQuery>);
  });

  it('shows loading state', () => {
    mockedUseCharacterDetailsQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetching: false,
      error: null,
    } as ReturnType<typeof useCharacterDetailsQuery>);

    renderDetails();

    expect(
      screen.getByTestId('character-details-skeleton')
    ).toBeInTheDocument();
  });

  it('shows error state', () => {
    mockedUseCharacterDetailsQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      error: new Error('Failed to load character details.'),
    } as ReturnType<typeof useCharacterDetailsQuery>);

    renderDetails();

    expect(
      screen.getByText(/failed to load character details/i)
    ).toBeInTheDocument();
  });

  it('renders character details', () => {
    mockedUseCharacterDetailsQuery.mockReturnValue({
      data: mockCharacter,
      isLoading: false,
      isFetching: false,
      error: null,
    } as ReturnType<typeof useCharacterDetailsQuery>);

    renderDetails();

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('19BBY')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('172')).toBeInTheDocument();
    expect(screen.getByText('77')).toBeInTheDocument();
    expect(screen.getByText('blond')).toBeInTheDocument();
    expect(screen.getByText('blue')).toBeInTheDocument();
    expect(screen.getByText('fair')).toBeInTheDocument();
  });

  it('navigates back on close button click', async () => {
    mockedUseCharacterDetailsQuery.mockReturnValue({
      data: mockCharacter,
      isLoading: false,
      isFetching: false,
      error: null,
    } as ReturnType<typeof useCharacterDetailsQuery>);

    renderDetails('/details/1?page=2');

    await userEvent.click(screen.getByRole('button', { name: '×' }));

    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
