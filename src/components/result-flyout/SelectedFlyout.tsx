import { useSelectedItemsStore } from '../../store';
import type { Character } from '../../types/types.ts';

import './selected-flyout.css';
import { buildCSV } from '../../util/export/buildCsv.ts';
import { downloadFile } from '../../util/export/downloadFile.ts';
import { fetchCharactersByIds } from '../../util/fetchCharactersByIds.ts';

type SelectedFlyoutProps = {
  results: Character[];
};

export function SelectedFlyout({ results }: SelectedFlyoutProps) {
  const selectedItems = useSelectedItemsStore((state) => state.selectedItems);
  const clearItems = useSelectedItemsStore((state) => state.clearItems);
  const toggleItems = useSelectedItemsStore((state) => state.toggleItems);

  if (selectedItems.length === 0) return null;

  const handleDownload = async () => {
    const ids = selectedItems;

    const characters = await fetchCharactersByIds(ids);

    const csv = buildCSV(
      characters,

      ['Name', 'Gender', 'Birth year', 'URL'],

      (item) => {
        if (item.status === 'fulfilled') {
          const c = item.data;

          return [c.name, c.gender, c.birth_year, c.url];
        }

        return [`UNKNOWN (${item.id})`, 'N/A', 'N/A', `N/A`];
      }
    );

    downloadFile(csv, `${ids.length}_items.csv`);
  };

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
        <button className="download-button" onClick={handleDownload}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <path d="M7 10l5 5 5-5" />
            <path d="M12 15V3" />
          </svg>

          <span>Download</span>
        </button>
      </div>
    </div>
  );
}
