'use client';

import { useTranslations } from 'next-intl';
import type { ResultsDataProps } from '../../types/types.ts';
import { ResultRow } from './ResultRow';
import { getApiErrorKey } from '../../util/getApiErrorKey';

export function ResultListClient({ results, error }: ResultsDataProps) {
  const t = useTranslations('Search');
  const apiT = useTranslations('ApiErrors');

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
