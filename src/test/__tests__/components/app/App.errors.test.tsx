import { screen } from '@testing-library/react';
import Page from '../../../../pages/main-page/MainPage.tsx';
import { mockFetch } from '../../../mocks/fetch.ts';
import { renderWithProviders } from '../../test-utils/renderWithProviders.tsx';

describe('App - error handling', () => {
  it('shows network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    renderWithProviders(<Page />);

    expect(await screen.findByRole('alert')).toHaveTextContent('Network error');
  });

  it('shows 500 error message', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    renderWithProviders(<Page />);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /please try again later/i
    );
  });

  it('shows 404 error message', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    renderWithProviders(<Page />);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /requested data was not found/i
    );
  });
});
