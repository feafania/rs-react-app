import { useNavigate, useParams, useSearchParams } from 'react-router';

import './character-details.css';
import { useCharacterDetailsQuery } from '../../hooks/useCharacterDetailsQuery.ts';
import { CharacterDetailsSkeleton } from '../../components/skeletons/CharacterDetailsSkeleton.tsx';

export function CharacterDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { data: character, isLoading, error } = useCharacterDetailsQuery(id);

  const handleClose = () => {
    navigate(`/?${searchParams.toString()}`);
  };

  return (
    <aside
      className="details-panel"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="details-header">
        <div className="details-drag-indicator" />
        <button className="close-button" onClick={handleClose}>
          ×
        </button>
      </div>

      {isLoading && <CharacterDetailsSkeleton />}

      {error instanceof Error && (
        <div className="details-error">{error.message}</div>
      )}

      {!isLoading && character && (
        <div className="details-content">
          <h2>{character.name}</h2>

          <p>
            <strong>Birth year:</strong> {character.birth_year}
          </p>

          <p>
            <strong>Gender:</strong> {character.gender}
          </p>

          <p>
            <strong>Height:</strong> {character.height}
          </p>

          <p>
            <strong>Mass:</strong> {character.mass}
          </p>

          <p>
            <strong>Hair color:</strong> {character.hair_color}
          </p>

          <p>
            <strong>Eye color:</strong> {character.eye_color}
          </p>

          <p>
            <strong>Skin color:</strong> {character.skin_color}
          </p>
        </div>
      )}
    </aside>
  );
}
