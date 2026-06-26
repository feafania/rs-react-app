'use client';

import { useTranslations } from 'next-intl';

type RefreshButtonProps = {
  onRefreshAction: () => void;
  isFetching?: boolean;
};

export function RefreshButton({
  onRefreshAction,
  isFetching,
}: RefreshButtonProps) {
  const t = useTranslations('Search');
  return (
    <button
      type="button"
      onClick={onRefreshAction}
      className="refresh-button"
      disabled={isFetching}
    >
      {isFetching ? <div className="refresh-spinner" /> : t('refresh')}
    </button>
  );
}
