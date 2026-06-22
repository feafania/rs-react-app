import { fetchCharacters } from '../../api/swapiService';
import { ITEMS_PER_PAGE } from '../../constants';

import { SearchSectionServer } from '../../components/search/SearchSectionServer';
import { ResultsListServer } from '../../components/result-section/ResultsListServer';
import { PaginationServer } from '../../components/Pagination/PaginationServer';
import { CharacterDetailsServer } from '../character-details/CharacterDetailsServer';
import { SelectedFlyout } from '../../components/selected-flyout/SelectedFlyout';
import { DetailsOverlay } from '../../components/DetailsOverlay';
import MainPageClient from './MainPageClient';

type Props = {
  search: string;
  currentPage: number;
  detailsId?: string;
};

export async function MainPageServer({
  search,
  currentPage,
  detailsId,
}: Props) {
  const normalizedSearch = search.trim();

  const initialData = await fetchCharacters(
    normalizedSearch,
    currentPage
  ).catch(() => null);

  const totalCount = initialData?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <MainPageClient
      initialData={initialData}
      initialSearch={normalizedSearch}
      initialPage={currentPage}
      initialTotalPages={totalPages}
      detailsId={detailsId}
    >
      <main className={`layout ${detailsId ? 'layout-split' : ''}`}>
        <div className="main-panel">
          <SearchSectionServer initialSearch={normalizedSearch} />

          {initialData ? (
            <>
              <ResultsListServer
                results={initialData.results}
                error={null}
                search={search}
                page={currentPage}
              />

              {initialData.results.length > 0 && (
                <PaginationServer
                  currentPage={currentPage}
                  totalPages={totalPages}
                  search={search}
                />
              )}
            </>
          ) : (
            <div>Error loading data</div>
          )}
        </div>

        {detailsId && (
          <DetailsOverlay>
            <CharacterDetailsServer id={detailsId} />
          </DetailsOverlay>
        )}

        <SelectedFlyout results={initialData?.results ?? []} />
      </main>
    </MainPageClient>
  );
}
