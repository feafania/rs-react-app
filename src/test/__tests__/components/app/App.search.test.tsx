import { Routes, Route } from 'react-router';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainPage from '../../../../routes/main-page/MainPage.tsx';
import { createMockResponse, mockFetch } from '../../../mocks/fetch.ts';
import { mockCharacters } from '../../../mocks/characters.ts';
import { renderWithProviders } from '../../test-utils/renderWithProviders.tsx';

describe('App - search flow', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    mockFetch.mockResolvedValue(createMockResponse(mockCharacters));
  });

  it('handles search input and submit correctly', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="details/:id" element={<div>details</div>} />
        </Route>
      </Routes>,
      { initialPath: '/' }
    );

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

    renderWithProviders(
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="details/:id" element={<div>details</div>} />
        </Route>
      </Routes>,
      { initialPath: '/' }
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'Luke');
    await user.click(button);

    const callsAfterFirst = mockFetch.mock.calls.length;

    await user.click(button);

    expect(mockFetch).toHaveBeenCalledTimes(callsAfterFirst);
  });

  it('shows empty state after searching with no results', async () => {
    const user = userEvent.setup();

    mockFetch.mockReset();
    mockFetch
      .mockResolvedValueOnce(createMockResponse(mockCharacters)) // initial
      .mockResolvedValueOnce(createMockResponse([])); // search result

    renderWithProviders(
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="details/:id" element={<div>details</div>} />
        </Route>
      </Routes>,
      { initialPath: '/' }
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'unknown-character');
    await user.click(button);

    expect(await screen.findByText(/no results found/i)).toBeInTheDocument();
  });
});
