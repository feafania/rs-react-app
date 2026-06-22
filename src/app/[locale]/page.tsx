import { redirect } from 'next/navigation';
import { MainPageServer } from '../../features/main-page/MainPageServer';

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    search?: string;
    page?: string;
    detailsId?: string;
  }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const { search = '', page, detailsId } = await searchParams;

  const normalizedSearch = search.trim();
  const paramsUrl = new URLSearchParams();

  if (normalizedSearch) paramsUrl.set('search', normalizedSearch);
  if (detailsId) paramsUrl.set('detailsId', detailsId);

  const finalPage = page ?? '1';
  paramsUrl.set('page', finalPage);

  if (!page) {
    redirect(`/${locale}?${paramsUrl.toString()}`);
  }

  return (
    <MainPageServer
      search={normalizedSearch}
      currentPage={Number(finalPage) || 1}
      detailsId={detailsId}
    />
  );
}
