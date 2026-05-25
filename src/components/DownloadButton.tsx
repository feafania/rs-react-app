import { fetchCharactersByIds } from '../util/fetchCharactersByIds.ts';
import { buildCSV } from '../util/export/buildCsv.ts';
import { downloadFile } from '../util/export/downloadFile.ts';

type DownloadButtonProps = {
  selectedItems: string[];
};

export function DownloadButton({ selectedItems }: DownloadButtonProps) {
  const handleDownload = async () => {
    const ids = selectedItems;

    const characters = await fetchCharactersByIds(ids);

    const csv = buildCSV(
      characters,

      [
        'Name',
        'Gender',
        'Height',
        'Birth year',
        'Mass',
        'Hair color',
        'Skin color',
        'Eye color',
        'URL',
      ],

      (item) => {
        if (item.status === 'fulfilled') {
          const c = item.data;

          return [
            c.name,
            c.gender,
            c.height,
            c.birth_year,
            c.mass,
            c.hair_color,
            c.skin_color,
            c.eye_color,
            c.url,
          ];
        }

        return [
          `UNKNOWN (${item.id})`,
          'N/A',
          'N/A',
          'N/A',
          `N/A`,
          `N/A`,
          `N/A`,
          `N/A`,
          `N/A`,
        ];
      }
    );

    downloadFile(csv, `${ids.length}_items.csv`);
  };

  return (
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
  );
}
