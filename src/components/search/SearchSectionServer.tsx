import { getTranslations } from 'next-intl/server';
import { handleSearchAction } from '../../features/main-page/actions';

type Props = {
  initialSearch: string;
  locale: string;
};

export async function SearchSectionServer({ initialSearch, locale }: Props) {
  const t = await getTranslations('Search');
  const searchActionWithLocale = handleSearchAction.bind(null, locale);

  return (
    <form className="search-section" action={searchActionWithLocale}>
      <div className="top-controls">
        <input
          className="search-input"
          type="text"
          name="search"
          placeholder={t('placeholder')}
          aria-label={t('ariaLabel')}
          defaultValue={initialSearch}
        />
        <button className="search-button" type="submit">
          {t('button')}
        </button>
      </div>
    </form>
  );
}
