import { screen, waitFor } from '@testing-library/react';
import MainPage from '../../../../routes/main-page/MainPage.tsx';
import { createMockResponse, mockFetch } from '../../../mocks/fetch.ts';
import { mockCharacters } from '../../../mocks/characters.ts';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderWithProviders.tsx';

describe('App - loading behavior', () => {
  it('renders results after successful request', async () => {
    const user = userEvent.setup();

    mockFetch
      .mockResolvedValueOnce(createMockResponse(mockCharacters)) // fetch after navigate
      .mockResolvedValueOnce(createMockResponse(mockCharacters)) // fetch triggered by useEffect
      .mockResolvedValueOnce(createMockResponse(mockCharacters)); // invalidateQueries

    renderWithProviders(<MainPage />);

    await user.type(screen.getByRole('textbox'), 'Luke');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('shows error message on failed request', async () => {
    const user = userEvent.setup();

    mockFetch.mockRejectedValue(new Error('Network error'));

    renderWithProviders(<MainPage />);

    await user.type(screen.getByRole('textbox'), 'Luke');
    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });
  });
});
