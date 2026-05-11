import { render, screen, waitFor } from '@testing-library/react';
import App from '../../../App.tsx';
import { mockCharacters } from '../../mocks/characters.ts';
import { createMockResponse, mockFetch } from '../../mocks/fetch.ts';
import { userEvent } from '@testing-library/user-event/dist/cjs/setup/index.js';

describe('App - localStorage', () => {
  it('reads search term from localStorage on mount', async () => {
    localStorage.setItem('searchTerm', 'Luke');

    mockFetch.mockResolvedValueOnce(createMockResponse(mockCharacters));

    render(<App />);

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

    render(<App />);

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

    mockFetch.mockResolvedValueOnce(createMockResponse(mockCharacters));

    render(<App />);

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();

    expect(localStorage.getItem('searchTerm')).toBeNull();
  });

  it('persists value across re-renders (simulated reload)', async () => {
    const user = userEvent.setup();

    mockFetch.mockResolvedValue(createMockResponse(mockCharacters));

    const { unmount } = render(<App />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'Luke');
    await user.click(button);

    await waitFor(() => {
      expect(localStorage.getItem('searchTerm')).toBe('Luke');
    });

    unmount();

    render(<App />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('search=Luke')
      );
    });
  });
});
