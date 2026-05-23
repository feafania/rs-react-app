import { type Character } from '../types/types.ts';
import { getCharacterDescription } from '../util/getCharacterDescription.ts';
import { Link, useSearchParams } from 'react-router';

interface ResultRowProps {
  character: Character;
}

export function ResultRow({ character }: ResultRowProps) {
  const { name } = character;
  const description = getCharacterDescription(character);
  const [searchParams] = useSearchParams();

  const id = character.url.match(/people\/(\d+)\//)?.[1];
  if (!id) return null;

  return (
    <Link
      to={`/details/${id}?${searchParams.toString()}`}
      className="result-row"
      onClick={(event) => event.stopPropagation()}
    >
      <span className="result-name">{name}</span>
      <span className="result-description">{description}</span>
    </Link>
  );
}
