import { render, screen, waitFor } from '@testing-library/react';
import MainPage from '../../../routes/main-page/MainPage.tsx';
import { mockCharacters } from '../../mocks/characters.ts';
import { createMockResponse, mockFetch } from '../../mocks/fetch.ts';

describe('App - render & initial load', () => {
  it('fetches data on mount and renders results', async () => {
    mockFetch.mockResolvedValueOnce(createMockResponse(mockCharacters));

    render(<MainPage />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('fetches all characters when no search term exists', async () => {
    mockFetch.mockResolvedValueOnce(createMockResponse(mockCharacters));

    render(<MainPage />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/people/?page=1')
      );
    });
  });

  it('shows empty state when no data exists on initial load', async () => {
    mockFetch.mockResolvedValueOnce(createMockResponse([]));

    render(<MainPage />);

    await waitFor(() => {
      expect(screen.getByText(/no results found/i)).toBeInTheDocument();
    });
  });
});
