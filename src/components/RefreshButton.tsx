'use client';

import { useTranslations } from 'next-intl';

type RefreshButtonProps = {
  onRefresh: () => void;
  isFetching?: boolean;
};

export function RefreshButton({ onRefresh, isFetching }: RefreshButtonProps) {
  const t = useTranslations('Search');
  return (
    <button
      type="button"
      onClick={onRefresh}
      className="refresh-button"
      disabled={isFetching}
    >
      {isFetching ? <div className="refresh-spinner" /> : t('refresh')}
    </button>
  );
}
