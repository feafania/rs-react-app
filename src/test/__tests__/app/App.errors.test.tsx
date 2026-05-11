import { render, screen } from '@testing-library/react';
import App from '../../../App.tsx';
import { mockFetch } from '../../mocks/fetch.ts';

describe('App - error handling', () => {
  it('network error triggers catch branch', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<App />);

    expect(
      await screen.findByText(/something went wrong/i)
    ).toBeInTheDocument();
  });

  it('server error (500+) branch', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    render(<App />);

    expect(
      await screen.findByText(/something went wrong/i)
    ).toBeInTheDocument();
  });

  it('client error (<500) branch', async () => {
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
