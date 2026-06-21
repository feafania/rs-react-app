import { screen, waitFor } from '@testing-library/react';
import Page from '../../../../pages/main-page/MainPage.tsx';
import { createMockResponse, mockFetch } from '../../../mocks/fetch.ts';
import userEvent from '@testing-library/user-event';
import { mockCharacters } from '../../../mocks/characters.ts';
import { renderWithProviders } from '../../test-utils/renderWithProviders.tsx';

describe('App - edge cases', () => {
  it('trims whitespace-only search and does not send search= param', async () => {
    const user = userEvent.setup();

    mockFetch.mockResolvedValueOnce(createMockResponse([]));

    renderWithProviders(<Page />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, '   ');
    await user.click(button);

    await waitFor(() => {
      expect(mockFetch).not.toHaveBeenCalledWith(
        expect.stringContaining('search=')
      );
    });
  });

  it('does not send search param when input is cleared', async () => {
    const user = userEvent.setup();

    mockFetch.mockResolvedValueOnce(createMockResponse(mockCharacters));
    mockFetch.mockResolvedValueOnce(createMockResponse([]));

    renderWithProviders(<Page />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'Luke');
    await user.click(button);

    await user.clear(input);
    await user.click(button);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenLastCalledWith(
        expect.stringContaining('/people/?page=1')
      );
    });
  });
});
