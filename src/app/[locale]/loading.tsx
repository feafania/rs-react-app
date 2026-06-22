import { getTranslations } from 'next-intl/server';

export default async function Loading() {
  const t = await getTranslations('Loading');

  return <div>{t('text')}</div>;
}
