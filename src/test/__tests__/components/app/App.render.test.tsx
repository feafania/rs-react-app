import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import MainPage from '../../../../routes/main-page/MainPage.tsx';
import { useCharacterSearch } from '../../../../hooks/useCharacterSearch.ts';

vi.mock('../../../../hooks/useCharacterSearch.ts', () => ({
  useCharacterSearch: vi.fn(),
}));

const emptyState = {
  results: [],
  totalCount: 0,
  searchTerm: '',
  setSearchTerm: vi.fn(),
  isLoading: false,
  error: '',
  handleSearch: vi.fn(),
};

describe('App - render & initial load', () => {
  beforeEach(() => {
    vi.mocked(useCharacterSearch).mockReturnValue(emptyState);
  });

  it('shows initial empty state on mount (no auto-fetch)', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <MainPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  it('fetches all characters when user performs search', async () => {
    const handleSearch = vi.fn();

    vi.mocked(useCharacterSearch).mockReturnValue({
      ...emptyState,
      handleSearch,
    });

    render(
      <MemoryRouter initialEntries={['/?search=Luke&page=1']}>
        <MainPage />
      </MemoryRouter>
    );

    expect(handleSearch).toHaveBeenCalledWith('Luke', 1);
  });

  it('shows "No results found" when search returns empty array', () => {
    vi.mocked(useCharacterSearch).mockReturnValue({
      ...emptyState,
      results: [],
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={['/?search=abc&page=1']}>
        <MainPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });
});
