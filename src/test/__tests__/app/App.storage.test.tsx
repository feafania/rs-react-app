import { render, screen, waitFor } from '@testing-library/react';
import MainPage from '../../../routes/main-page/MainPage.tsx';
import { mockCharacters } from '../../mocks/characters.ts';
import { createMockResponse, mockFetch } from '../../mocks/fetch.ts';
import userEvent from '@testing-library/user-event';

describe('App - localStorage', () => {
  it('reads search term from localStorage on mount', async () => {
    localStorage.setItem('searchTerm', 'Luke');

    mockFetch.mockResolvedValueOnce(createMockResponse(mockCharacters));

    render(<MainPage />);

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

    render(<MainPage />);

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

    render(<MainPage />);

    await screen.findByText(/no results found/i);

    expect(localStorage.getItem('searchTerm')).toBeNull();
  });

  it('persists value across re-renders (simulated reload)', async () => {
    const user = userEvent.setup();

    mockFetch.mockResolvedValue(createMockResponse(mockCharacters));

    const { unmount } = render(<MainPage />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'Luke');
    await user.click(button);

    await waitFor(() => {
      expect(localStorage.getItem('searchTerm')).toBe('Luke');
    });

    unmount();

    render(<MainPage />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('search=Luke')
      );
    });
  });
});
