import { getTranslations } from 'next-intl/server';
import { Character } from '../../types/types';
import { ResultRow } from './ResultRow';
import { getApiErrorKey } from '../../util/getApiErrorKey';

type Props = {
  results: Character[];
  error: Error | null;
  search: string;
  page: number;
};

export async function ResultsListServer({ results, error }: Props) {
  const t = await getTranslations('Search');
  const apiT = await getTranslations('ApiErrors');

  if (error) {
    return (
      <div className="error-state" role="alert">
        {apiT(getApiErrorKey(error))}
      </div>
    );
  }

  if (results.length === 0) {
    return <div className="empty-state">{t('noResults')}</div>;
  }

  return (
    <div className="results-wrapper">
      <div className="results-table">
        <div className="results-header">
          <span />
          <span>{t('itemName')}</span>
          <span>{t('itemDescription')}</span>
        </div>

        <div className="results-body">
          {results.map((character) => (
            <ResultRow key={character.name} character={character} />
          ))}
        </div>
      </div>
    </div>
  );
}
