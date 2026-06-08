type CsvPrimitive = string | number | null | undefined;

export function buildCSV<T>(
  rows: T[],
  headers: string[],
  selector: (row: T) => CsvPrimitive[]
) {
  const escapedRows = rows.map((row) =>
    selector(row)
      .map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`)
      .join(',')
  );

  return [headers.join(','), ...escapedRows].join('\n');
}
