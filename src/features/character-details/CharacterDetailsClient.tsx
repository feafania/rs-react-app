'use client';

import './character-details.css';
import { useTranslations } from 'next-intl';
import { useCharacterDetailsQuery } from '../../hooks/useCharacterDetailsQuery';
import { useRefreshCharacterDetails } from '../../hooks/useRefreshCharacterDetails';
import { CharacterDetailsSkeleton } from '../../components/skeletons/CharacterDetailsSkeleton';
import { RefreshButton } from '../../components/RefreshButton';
import { getApiErrorKey } from '../../util/getApiErrorKey';

export function CharacterDetailsClient({
  id,
  onCloseAction,
}: {
  id: string;
  onCloseAction: () => void;
}) {
  const {
    data: character,
    isLoading,
    isFetching,
    error,
  } = useCharacterDetailsQuery(id);

  const refresh = useRefreshCharacterDetails(id);

  const t = useTranslations('Details');
  const apiT = useTranslations('ApiErrors');

  return (
    <aside
      className="details-panel"
      onClick={(event) => event.stopPropagation()}
    >
      {isLoading && <CharacterDetailsSkeleton />}

      <div className="details-header">
        <div className="details-drag-indicator" />
        <button className="close-button" onClick={onCloseAction}>
          ×
        </button>
      </div>

      {error instanceof Error && (
        <div className="details-error">{apiT(getApiErrorKey(error))}</div>
      )}

      {!isLoading && character && (
        <div className="details-content">
          <div className="details-actions">
            <RefreshButton onRefreshAction={refresh} isFetching={isFetching} />
          </div>

          <h2>{character.name}</h2>

          <p>
            <strong>{t('birthYear')}:</strong> {character.birth_year}
          </p>
          <p>
            <strong>{t('gender')}:</strong> {character.gender}
          </p>
          <p>
            <strong>{t('height')}:</strong> {character.height}
          </p>
          <p>
            <strong>{t('mass')}:</strong> {character.mass}
          </p>
          <p>
            <strong>{t('hair')}:</strong> {character.hair_color}
          </p>
          <p>
            <strong>{t('eyes')}:</strong> {character.eye_color}
          </p>
          <p>
            <strong>{t('skin')}:</strong> {character.skin_color}
          </p>
        </div>
      )}
    </aside>
  );
}
