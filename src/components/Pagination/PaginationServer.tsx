import { getTranslations } from 'next-intl/server';
import { Link } from '../../i18n/navigation';

type Props = {
  currentPage: number;
  totalPages: number;
  search: string;
};

export async function PaginationServer({
  currentPage,
  totalPages,
  search,
}: Props) {
  const t = await getTranslations('Search');

  if (totalPages <= 1) return null;

  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    params.set('page', String(page));
    return `/?${params.toString()}`;
  };

  return (
    <div className="pagination">
      {currentPage > 1 ? (
        <Link href={buildUrl(currentPage - 1)} className="pagination-link">
          {t('prev')}
        </Link>
      ) : (
        <button className="pagination-link" disabled>
          {t('prev')}
        </button>
      )}

      <span className="pagination-info">
        {t('page')} {currentPage} {t('of')} {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link href={buildUrl(currentPage + 1)} className="pagination-link">
          {t('next')}
        </Link>
      ) : (
        <button className="pagination-link" disabled>
          {t('next')}
        </button>
      )}
    </div>
  );
}
