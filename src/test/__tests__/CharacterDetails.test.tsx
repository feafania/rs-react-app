import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import { vi } from 'vitest';
import { CharacterDetails } from '../../routes/character-details/CharacterDetails.tsx';

const mockUseCharacterDetails = vi.hoisted(() =>
  vi.fn().mockReturnValue({
    character: null,
    isLoading: false,
    error: '',
  })
);

vi.mock('../../hooks/useCharacterDetails.ts', () => ({
  useCharacterDetails: mockUseCharacterDetails,
}));

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

function renderWithRouter(path = '/details/1') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/details/:id" element={<CharacterDetails />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('CharacterDetails', () => {
  beforeEach(() => {
    mockUseCharacterDetails.mockReturnValue({
      character: null,
      isLoading: false,
      error: '',
    });
  });

  it('shows loading state', () => {
    mockUseCharacterDetails.mockReturnValue({
      character: null,
      isLoading: true,
      error: '',
    });
    renderWithRouter();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows error state', () => {
    mockUseCharacterDetails.mockReturnValue({
      character: null,
      isLoading: false,
      error: 'Failed to load character details.',
    });
    renderWithRouter();
    expect(
      screen.getByText(/failed to load character details/i)
    ).toBeInTheDocument();
  });

  it('renders character details', () => {
    mockUseCharacterDetails.mockReturnValue({
      character: mockCharacter,
      isLoading: false,
      error: '',
    });
    renderWithRouter();
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
    mockUseCharacterDetails.mockReturnValue({
      character: mockCharacter,
      isLoading: false,
      error: '',
    });
    renderWithRouter('/details/1?page=2');
    await userEvent.click(screen.getByText('×'));
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
