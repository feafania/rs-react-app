'use client';

import { useSelectedItemsStore } from '../../store';
import type { Character } from '../../types/types.ts';

import './selected-flyout.css';
import { DownloadButton } from '../DownloadButton';

type SelectedFlyoutProps = {
  results: Character[];
};

export function SelectedFlyout({ results }: SelectedFlyoutProps) {
  const selectedItems = useSelectedItemsStore((state) => state.selectedItems);
  const clearItems = useSelectedItemsStore((state) => state.clearItems);
  const toggleItems = useSelectedItemsStore((state) => state.toggleItems);

  if (selectedItems.length === 0) return null;

  const ids = results
    .map((character) => character.url.match(/people\/(\d+)\//)?.[1])
    .filter(Boolean) as string[];

  return (
    <div className="selected-flyout">
      <div className="selected-flyout__info">
        Selected: <b>{selectedItems.length}</b>
      </div>

      <div className="selection-actions">
        <button className="clear-button" onClick={clearItems}>
          Unselect all
        </button>

        <button className="toggle-button" onClick={() => toggleItems(ids)}>
          Toggle page
        </button>

        <DownloadButton selectedItems={selectedItems} />
      </div>
    </div>
  );
}
