'use client';

import './character-details.css';
import { useTranslations } from 'next-intl';
import { useCharacterDetailsQuery } from '../../hooks/useCharacterDetailsQuery';
import { useRefreshCharacterDetails } from '../../hooks/useRefreshCharacterDetails';
import { CharacterDetailsSkeleton } from '../../components/skeletons/CharacterDetailsSkeleton';
import { RefreshButton } from '../../components/RefreshButton';
import { getApiErrorKey } from '../../util/getApiErrorKey';
import { CharacterDetailsData } from '../../types/types';

export function CharacterDetailsClient({
  id,
  onCloseAction,
  initialData,
}: {
  id: string;
  onCloseAction: () => void;
  initialData?: CharacterDetailsData | null;
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

  const currentCharacter = character ?? initialData;

  return (
    <aside
      className="details-panel"
      onClick={(event) => event.stopPropagation()}
    >
      {isLoading && !initialData && <CharacterDetailsSkeleton />}

      <div className="details-header">
        <div className="details-drag-indicator" />
        <button className="close-button" onClick={onCloseAction}>
          ×
        </button>
      </div>

      {error instanceof Error && (
        <div className="details-error">{apiT(getApiErrorKey(error))}</div>
      )}

      {currentCharacter && (
        <div className="details-content">
          <div className="details-actions">
            <RefreshButton onRefreshAction={refresh} isFetching={isFetching} />
          </div>

          <h2>{currentCharacter.name}</h2>

          <p>
            <strong>{t('birthYear')}:</strong> {currentCharacter.birth_year}
          </p>
          <p>
            <strong>{t('gender')}:</strong> {currentCharacter.gender}
          </p>
          <p>
            <strong>{t('height')}:</strong> {currentCharacter.height}
          </p>
          <p>
            <strong>{t('mass')}:</strong> {currentCharacter.mass}
          </p>
          <p>
            <strong>{t('hair')}:</strong> {currentCharacter.hair_color}
          </p>
          <p>
            <strong>{t('eyes')}:</strong> {currentCharacter.eye_color}
          </p>
          <p>
            <strong>{t('skin')}:</strong> {currentCharacter.skin_color}
          </p>
        </div>
      )}
    </aside>
  );
}
