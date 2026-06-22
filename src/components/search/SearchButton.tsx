'use client';

import { useTranslations } from 'next-intl';

export function SearchButton() {
  const t = useTranslations('Search');
  return (
    <button className="search-button" type="submit">
      {t('button')}
    </button>
  );
}
