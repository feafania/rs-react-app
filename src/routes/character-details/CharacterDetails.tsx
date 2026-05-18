import { useNavigate, useParams, useSearchParams } from 'react-router';

import { useCharacterDetails } from '../../hooks/useCharacterDetails.ts';

import './character-details.css';

export function CharacterDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { character, isLoading, error } = useCharacterDetails(id);

  const handleClose = () => {
    navigate(`/?${searchParams.toString()}`);
  };

  return (
    <aside className="details-panel">
      <button className="close-button" onClick={handleClose}>
        ×
      </button>

      {isLoading && <div className="details-loading">Loading...</div>}

      {error && <div className="details-error">{error}</div>}

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
