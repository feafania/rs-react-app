import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { SearchSection } from '../../components/SearchSection.tsx';
import { userEvent } from '@testing-library/user-event/dist/cjs/setup/index.js';

describe('SearchSection', () => {
  it('renders input and search button', () => {
    render(
      <SearchSection
        onSearch={vi.fn()}
        onSearchInputChange={vi.fn()}
        initialValue=""
      />
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('calls onSearchInputChange when user types', async () => {
    const user = userEvent.setup();

    const handleInputChange = vi.fn();

    render(
      <SearchSection
        onSearch={vi.fn()}
        onSearchInputChange={handleInputChange}
        initialValue=""
      />
    );

    const input = screen.getByRole('textbox');

    await user.type(input, 'Luke');

    expect(handleInputChange).toHaveBeenCalled();
  });

  it('calls onSearch on submit', async () => {
    const user = userEvent.setup();

    const handleSearch = vi.fn();

    render(
      <SearchSection
        onSearch={handleSearch}
        onSearchInputChange={vi.fn()}
        initialValue="Luke"
      />
    );

    const button = screen.getByRole('button', { name: 'Search' });

    await user.click(button);

    expect(handleSearch).toHaveBeenCalledWith('Luke');
  });

  it('prevents default form submission behavior', () => {
    render(
      <SearchSection
        onSearch={vi.fn()}
        onSearchInputChange={vi.fn()}
        initialValue=""
      />
    );

    const form = screen.getByRole('button', { name: 'Search' }).closest('form');

    const submitEvent = new Event('submit', {
      bubbles: true,
      cancelable: true,
    });

    const preventDefaultSpy = vi.spyOn(submitEvent, 'preventDefault');

    form?.dispatchEvent(submitEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
