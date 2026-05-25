import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import MainPage from '../../../../routes/main-page/MainPage.tsx';
import { createMockResponse, mockFetch } from '../../../mocks/fetch.ts';
import { mockCharacters } from '../../../mocks/characters.ts';

function renderWithRouter(initial = '/') {
  return render(
    <MemoryRouter initialEntries={[initial]}>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="details/:id" element={<div>details</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe('App - localStorage', () => {
  it('reads search term from localStorage on mount', async () => {
    localStorage.setItem('searchTerm', 'Luke');

    mockFetch.mockResolvedValueOnce(createMockResponse(mockCharacters));

    renderWithRouter('/?search=Luke&page=1');

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

    renderWithRouter('/');

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

    renderWithRouter('/');

    expect(await screen.findByText(/no results found/i)).toBeInTheDocument();

    expect(localStorage.getItem('searchTerm')).toBeNull();
  });

  it('persists value across re-renders (simulated reload)', async () => {
    const user = userEvent.setup();

    mockFetch.mockResolvedValue(createMockResponse(mockCharacters));

    const { unmount } = renderWithRouter('/');

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'Luke');
    await user.click(button);

    await waitFor(() => {
      expect(localStorage.getItem('searchTerm')).toBe('Luke');
    });

    unmount();

    renderWithRouter('/?search=Luke&page=1');

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('search=Luke')
      );
    });
  });
});
