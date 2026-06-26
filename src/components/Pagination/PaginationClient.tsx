'use client';

import { useTranslations } from 'next-intl';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationClient({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const t = useTranslations('Search');

  if (totalPages <= 1) return null;

  return (
    <div className="pagination" onClick={(event) => event.stopPropagation()}>
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {t('prev')}
      </button>

      <span className="pagination-info">
        {t('page')} {currentPage} {t('of')} {totalPages}
      </span>

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {t('next')}
      </button>
    </div>
  );
}
