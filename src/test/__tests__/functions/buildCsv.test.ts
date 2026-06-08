import { describe, expect, it } from 'vitest';
import { buildCSV } from '../../../utils/export/buildCsv.ts';

describe('buildCSV', () => {
  it('builds csv with headers and rows', () => {
    const result = buildCSV(
      [{ name: 'Luke', age: 20 }],
      ['Name', 'Age'],
      (row) => [row.name, row.age]
    );

    expect(result).toBe('Name,Age\n"Luke","20"');
  });

  it('escapes quotes', () => {
    const result = buildCSV([{ text: 'hello "there"' }], ['Text'], (row) => [
      row.text,
    ]);

    expect(result).toContain('"hello ""there"""');
  });

  it('handles null and undefined', () => {
    const result = buildCSV([{ a: null, b: undefined }], ['A', 'B'], (row) => [
      row.a,
      row.b,
    ]);

    expect(result).toBe('A,B\n"",""');
  });
});
