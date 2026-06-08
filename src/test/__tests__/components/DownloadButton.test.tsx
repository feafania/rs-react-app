import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { DownloadButton } from '../../../components/DownloadButton.tsx';
import { fetchCharactersByIds } from '../../../utils/fetchCharactersByIds.ts';
import { buildCSV } from '../../../utils/export/buildCsv.ts';
import { downloadFile } from '../../../utils/export/downloadFile.ts';

vi.mock('../../../utils/fetchCharactersByIds.ts');
vi.mock('../../../utils/export/buildCsv.ts');
vi.mock('../../../utils/export/downloadFile.ts');

describe('DownloadButton', () => {
  it('renders button', () => {
    render(<DownloadButton selectedItems={['1']} />);

    expect(
      screen.getByRole('button', { name: /download/i })
    ).toBeInTheDocument();
  });

  it('downloads fulfilled characters csv', async () => {
    const user = userEvent.setup();

    vi.mocked(fetchCharactersByIds).mockResolvedValue([
      {
        status: 'fulfilled',
        data: {
          name: 'Luke',
          gender: 'male',
          height: '172',
          birth_year: '19BBY',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          url: 'test-url',
        },
      },
    ]);

    vi.mocked(buildCSV).mockReturnValue('csv-content');

    render(<DownloadButton selectedItems={['1']} />);

    await user.click(screen.getByRole('button', { name: /download/i }));

    expect(fetchCharactersByIds).toHaveBeenCalledWith(['1']);
    expect(buildCSV).toHaveBeenCalled();
    expect(downloadFile).toHaveBeenCalledWith('csv-content', '1_items.csv');
  });

  it('handles rejected characters', async () => {
    const user = userEvent.setup();

    vi.mocked(fetchCharactersByIds).mockResolvedValue([
      {
        status: 'rejected',
        id: '999',
      },
    ]);

    vi.mocked(buildCSV).mockReturnValue('csv');

    render(<DownloadButton selectedItems={['999']} />);

    await user.click(screen.getByRole('button', { name: /download/i }));

    const mapper = vi.mocked(buildCSV).mock.calls[0][2];

    const result = mapper({
      status: 'rejected',
      id: '999',
    });

    expect(result[0]).toBe('UNKNOWN (999)');
  });
});
