import { render, screen, waitFor } from '@testing-library/react';
import App from '../../../App.tsx';
import { createMockResponse, mockFetch } from '../../mocks/fetch.ts';
import { mockCharacters } from '../../mocks/characters.ts';

describe('App - loading behavior', () => {
  it('transitions from loading state to rendered results', async () => {
    mockFetch.mockResolvedValueOnce(createMockResponse(mockCharacters));

    render(<App />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it('switches from loading to error state on failed request', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<App />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
});
