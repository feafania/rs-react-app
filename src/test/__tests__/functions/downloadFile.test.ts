import { describe, expect, it, vi, beforeEach } from 'vitest';
import { downloadFile } from '../../../utils/export/downloadFile.ts';

describe('downloadFile', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('creates and downloads file', () => {
    const click = vi.fn();

    const anchor: Partial<HTMLAnchorElement> = {
      href: '',
      download: '',
      click,
    };

    vi.spyOn(document, 'createElement').mockReturnValue(
      anchor as HTMLAnchorElement
    );

    const createObjectURL = vi
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue('blob:url');

    const revokeObjectURL = vi
      .spyOn(URL, 'revokeObjectURL')
      .mockImplementation(() => {});

    downloadFile('csv-content', 'test.csv');

    expect(createObjectURL).toHaveBeenCalled();
    expect(anchor.download).toBe('test.csv');
    expect(click).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:url');
  });

  it('uses custom mime type', () => {
    const createObjectURL = vi
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue('blob:url');

    const anchor: Partial<HTMLAnchorElement> = {
      click: vi.fn(),
    };

    vi.spyOn(document, 'createElement').mockReturnValue(
      anchor as HTMLAnchorElement
    );

    downloadFile('content', 'file.txt', 'text/plain');

    expect(createObjectURL).toHaveBeenCalled();
  });
});
