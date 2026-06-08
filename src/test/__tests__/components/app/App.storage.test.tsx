import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainPage from '../../../../routes/main-page/MainPage.tsx';
import { createMockResponse, mockFetch } from '../../../mocks/fetch.ts';
import { mockCharacters } from '../../../mocks/characters.ts';
import { renderWithProviders } from '../../test-utils/renderWithProviders.tsx';

describe('App - localStorage', () => {
  it('reads search term from localStorage on mount', async () => {
    localStorage.setItem('searchTerm', 'Luke');

    mockFetch.mockResolvedValueOnce(createMockResponse(mockCharacters));

    renderWithProviders(<MainPage />, {
      initialPath: '/?search=Luke&page=1',
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('search=Luke')
      );
    });
  });

  it('overwrites localStorage value after new search', async () => {
    const user = userEvent.setup();

    localStorage.setItem('searchTerm', 'OldValue');

    mockFetch.mockResolvedValueOnce(createMockResponse(mockCharacters));

    renderWithProviders(<MainPage />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.clear(input);
    await user.type(input, 'Luke');
    await user.click(button);

    await waitFor(() => {
      expect(localStorage.getItem('searchTerm')).toBe('Luke');
    });
  });

  it('handles empty localStorage on mount', async () => {
    localStorage.clear();

    mockFetch.mockResolvedValueOnce(createMockResponse([]));

    renderWithProviders(<MainPage />);

    expect(await screen.findByText(/no results found/i)).toBeInTheDocument();

    expect(localStorage.getItem('searchTerm')).toBeNull();
  });

  it('persists value across re-renders (simulated reload)', async () => {
    const user = userEvent.setup();

    mockFetch.mockResolvedValue(createMockResponse(mockCharacters));

    const { unmount } = renderWithProviders(<MainPage />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'Luke');
    await user.click(button);

    await waitFor(() => {
      expect(localStorage.getItem('searchTerm')).toBe('Luke');
    });

    unmount();

    renderWithProviders(<MainPage />, {
      initialPath: '/?search=Luke&page=1',
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('search=Luke')
      );
    });
  });
});
