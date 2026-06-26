import { fetchCharacterDetails } from '../../api/swapiService';
import { getTranslations } from 'next-intl/server';
import { Link } from '../../i18n/navigation';
import { getApiErrorKey } from '../../util/getApiErrorKey';

type Props = {
  id: string;
};

export async function CharacterDetailsServer({ id }: Props) {
  const t = await getTranslations('Details');
  const apiT = await getTranslations('ApiErrors');

  let character = null;
  let error = null;

  try {
    character = await fetchCharacterDetails(id);
  } catch (err) {
    error =
      err instanceof Error
        ? err
        : new Error('Failed to load character details');
  }

  if (error) {
    return (
      <aside className="details-panel">
        <div className="details-header">
          <div className="details-drag-indicator" />
          <Link href="/" className="close-button">
            ×
          </Link>
        </div>
        <div className="details-error">{apiT(getApiErrorKey(error))}</div>
      </aside>
    );
  }

  if (!character) {
    return (
      <aside className="details-panel">
        <div className="details-header">
          <div className="details-drag-indicator" />
          <Link href="/" className="close-button">
            ×
          </Link>
        </div>
        <div className="details-error">
          {apiT(getApiErrorKey(new Error('Character not found')))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="details-panel">
      <div className="details-header">
        <div className="details-drag-indicator" />
        <Link href="/" className="close-button">
          ×
        </Link>
      </div>

      <div className="details-content">
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
    </aside>
  );
}
