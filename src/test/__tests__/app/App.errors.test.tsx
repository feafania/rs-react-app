import { render, screen } from '@testing-library/react';
import App from '../../../App.tsx';
import { mockFetch } from '../../mocks/fetch.ts';

describe('App - error handling', () => {
  it('shows fallback UI on network failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<App />);

    expect(
      await screen.findByText(/something went wrong/i)
    ).toBeInTheDocument();
  });

  it('handles 500+ server response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    render(<App />);

    expect(
      await screen.findByText(/something went wrong/i)
    ).toBeInTheDocument();
  });

  it('handles 404 client response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    render(<App />);

    expect(
      await screen.findByText(/something went wrong/i)
    ).toBeInTheDocument();
  });
});
