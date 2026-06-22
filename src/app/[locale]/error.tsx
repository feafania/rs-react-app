'use client';

import { useTranslations } from 'next-intl';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations('Error');

  return (
    <div className="error-boundary">
      <h2>{t('somethingWrong')}</h2>

      <button onClick={reset}>{t('tryAgain')}</button>
    </div>
  );
}
