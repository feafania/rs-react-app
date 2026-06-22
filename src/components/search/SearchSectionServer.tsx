import { getTranslations } from 'next-intl/server';

type Props = {
  initialSearch: string;
};

export async function SearchSectionServer({ initialSearch }: Props) {
  const t = await getTranslations('Search');

  return (
    <form className="search-section">
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
