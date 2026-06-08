import { type Character } from '../../types/types.ts';
import { getCharacterDescription } from '../../utils/getCharacterDescription.ts';
import { Link, useSearchParams } from 'react-router';

import { useSelectedItemsStore } from '../../store';
import './result-row.css';

interface ResultRowProps {
  character: Character;
}

export function ResultRow({ character }: ResultRowProps) {
  const { name } = character;

  const description = getCharacterDescription(character);

  const [searchParams] = useSearchParams();

  const id = character.url.match(/people\/(\d+)\//)?.[1];

  const toggleItem = useSelectedItemsStore((state) => state.toggleItem);

  const isSelected = useSelectedItemsStore((state) =>
    id ? state.isSelected(id) : false
  );

  if (!id) return null;

  return (
    <Link
      to={`/details/${id}?${searchParams.toString()}`}
      className="result-row"
      onClick={(event) => event.stopPropagation()}
    >
      <label
        className="result-checkbox"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          toggleItem(id);
        }}
      >
        <input type="checkbox" checked={isSelected} readOnly />

        <span className="checkbox-custom" />
      </label>
      <span className="result-name">{name}</span>

      <span className="result-description">{description}</span>
    </Link>
  );
}
