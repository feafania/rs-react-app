import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it } from 'vitest';
import { ResultRow } from '../../../components/result-section/ResultRow.tsx';
import { useSelectedItemsStore } from '../../../store';
import { invalidCharacter, lukeCharacter } from '../../mocks/characters.ts';

describe('ResultRow', () => {
  beforeEach(() => {
    useSelectedItemsStore.setState({
      selectedItems: [],
    });
  });

  it('renders character info', () => {
    render(
      <MemoryRouter>
        <ResultRow character={lukeCharacter} />
      </MemoryRouter>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();

    expect(screen.getByText(/male/i)).toBeInTheDocument();
  });

  it('renders link with character id', () => {
    render(
      <MemoryRouter initialEntries={['/?page=2']}>
        <ResultRow character={lukeCharacter} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', '/details/1?page=2');
  });

  it('returns null for invalid character url', () => {
    const { container } = render(
      <MemoryRouter>
        <ResultRow character={invalidCharacter} />
      </MemoryRouter>
    );

    expect(container.firstChild).toBeNull();
  });

  it('toggles checkbox selection', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ResultRow character={lukeCharacter} />
      </MemoryRouter>
    );

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(useSelectedItemsStore.getState().selectedItems).toEqual(['1']);
  });

  it('renders checked checkbox for selected item', () => {
    useSelectedItemsStore.setState({
      selectedItems: ['1'],
    });

    render(
      <MemoryRouter>
        <ResultRow character={lukeCharacter} />
      </MemoryRouter>
    );

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('unselects checkbox if already selected', async () => {
    const user = userEvent.setup();

    useSelectedItemsStore.setState({
      selectedItems: ['1'],
    });

    render(
      <MemoryRouter>
        <ResultRow character={lukeCharacter} />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('checkbox'));

    expect(useSelectedItemsStore.getState().selectedItems).toEqual([]);
  });
});
