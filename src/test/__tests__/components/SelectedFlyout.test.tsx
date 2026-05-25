import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Character } from '../../../types/types.ts';
import { useSelectedItemsStore } from '../../../store';
import { SelectedFlyout } from '../../../components/selected-flyout/SelectedFlyout.tsx';

vi.mock('../../../components/DownloadButton.tsx', () => ({
  DownloadButton: () => <div>DownloadButton</div>,
}));

describe('SelectedFlyout', () => {
  const results: Character[] = [
    {
      name: 'Luke Skywalker',
      gender: 'male',
      height: '172',
      birth_year: '19BBY',
      url: 'https://swapi.dev/api/people/1/',
    },
    {
      name: 'Leia Organa',
      gender: 'female',
      height: '150',
      birth_year: '19BBY',
      url: 'https://swapi.dev/api/people/2/',
    },
  ];

  beforeEach(() => {
    useSelectedItemsStore.setState({
      selectedItems: [],
    });
  });

  it('renders null when no selected items', () => {
    const { container } = render(<SelectedFlyout results={results} />);

    expect(container.firstChild).toBeNull();
  });

  it('renders selected items count', () => {
    useSelectedItemsStore.setState({
      selectedItems: ['1', '2'],
    });

    render(<SelectedFlyout results={results} />);

    expect(screen.getByText(/selected:/i)).toBeInTheDocument();

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('clears selected items', async () => {
    const user = userEvent.setup();

    useSelectedItemsStore.setState({
      selectedItems: ['1', '2'],
    });

    render(<SelectedFlyout results={results} />);

    await user.click(
      screen.getByRole('button', {
        name: /unselect all/i,
      })
    );

    expect(useSelectedItemsStore.getState().selectedItems).toEqual([]);
  });

  it('toggles current page items', async () => {
    const user = userEvent.setup();

    useSelectedItemsStore.setState({
      selectedItems: ['1'],
    });

    render(<SelectedFlyout results={results} />);

    await user.click(
      screen.getByRole('button', {
        name: /toggle page/i,
      })
    );

    expect(useSelectedItemsStore.getState().selectedItems).toEqual(['2']);
  });

  it('renders download button', () => {
    useSelectedItemsStore.setState({
      selectedItems: ['1'],
    });

    render(<SelectedFlyout results={results} />);

    expect(screen.getByText('DownloadButton')).toBeInTheDocument();
  });
});
