import { type Character } from '../types/types.ts';
import { getCharacterDescription } from '../util/getCharacterDescription.ts';

interface ResultRowProps {
  character: Character;
}

export function ResultRow({ character }: ResultRowProps) {
  const { name } = character;
  const description = getCharacterDescription(character);

  return (
    <div className="result-row">
      <span className="result-name">{name}</span>
      <span className="result-description">{description}</span>
    </div>
  );
}
