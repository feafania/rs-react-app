import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../../App.tsx';
import { createMockResponse, mockFetch } from '../../mocks/fetch.ts';
import { mockCharacters } from '../../mocks/characters.ts';

describe('App - search flow', () => {
  beforeEach(() => {
    mockFetch.mockResolvedValueOnce(createMockResponse(mockCharacters));
  });

  it('handles search input and submit correctly', async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, '  Leia  ');
    await user.click(button);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('search=Leia')
      );
    });
  });

  it('does not fetch again for same search term', async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'Luke');
    await user.click(button);
    const callsAfterFirstSearch = mockFetch.mock.calls.length;

    await user.click(button);

    expect(mockFetch).toHaveBeenCalledTimes(callsAfterFirstSearch);
  });
  it('shows empty state after searching with no results', async () => {
    const user = userEvent.setup();

    mockFetch.mockReset();

    mockFetch.mockResolvedValueOnce(createMockResponse(mockCharacters));

    mockFetch.mockResolvedValueOnce(createMockResponse([]));

    render(<App />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'unknown-character');
    await user.click(button);

    expect(await screen.findByText(/no results found/i)).toBeInTheDocument();
  });
});
