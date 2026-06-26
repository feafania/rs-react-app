'use client';

import { useTranslations } from 'next-intl';

interface TriggerErrorButtonProps {
  onClick: () => void;
}

export function TriggerErrorButton({ onClick }: TriggerErrorButtonProps) {
  const t = useTranslations('Error');
  return (
    <button className="error-button" type="button" onClick={onClick}>
      {t('trigger')}
    </button>
  );
}
