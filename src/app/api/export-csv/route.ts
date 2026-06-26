import { NextResponse } from 'next/server';
import { buildCSV } from '../../../util/export/buildCsv';
import { fetchCharactersByIds } from '../../../util/fetchCharactersByIds';

export async function POST(req: Request) {
  const { ids, t } = await req.json();

  const characters = await fetchCharactersByIds(ids);

  const csv = buildCSV(
    characters,
    [
      t.name,
      t.gender,
      t.height,
      t.birthYear,
      t.mass,
      t.hair,
      t.skin,
      t.eyes,
      t.url,
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
        `${t.unknown} (${item.id})`,
        t.na,
        t.na,
        t.na,
        t.na,
        t.na,
        t.na,
        t.na,
        t.na,
      ];
    }
  );

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="characters.csv"',
    },
  });
}
