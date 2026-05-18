import { MemoryRouter } from 'react-router';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import MainPage from '../../../routes/main-page/MainPage.tsx';
import { mockCharacters } from '../../mocks/characters.ts';
import { createMockResponse, mockFetch } from '../../mocks/fetch.ts';
import { useCharacterSearch } from '../../../hooks/useCharacterSearch.ts';

vi.mock('../../../hooks/useCharacterSearch.ts', () => ({
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

    expect(
      screen.getByText(/start typing and press search/i)
    ).toBeInTheDocument();

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('fetches all characters when user performs search', async () => {
    mockFetch.mockResolvedValueOnce(createMockResponse(mockCharacters));

    vi.mocked(useCharacterSearch).mockImplementation(() => {
      const handleSearch = (term: string, page: number) => {
        fetch(`https://swapi.py4e.com/api/people/?search=${term}&page=${page}`);
      };
      return { ...emptyState, handleSearch };
    });

    render(
      <MemoryRouter initialEntries={['/?search=Luke&page=1']}>
        <MainPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/people/?search=Luke&page=1')
      );
    });
  });

  it('shows "No results found" when search returns empty array', () => {
    vi.mocked(useCharacterSearch).mockReturnValue({
      ...emptyState,
      searchTerm: 'abc',
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
