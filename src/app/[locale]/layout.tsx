import { NextIntlClientProvider } from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';
import { routing } from '../../i18n/routing';
import { Providers } from '../providers';
import { PageLayout } from '../../features/page-layout/PageLayout';
import { Locale } from '../../i18n/routing';

import '../../features/main-page/main-page.css';
import '../../features/main-page/pagination.css';
import '../../features/character-details/character-details.css';
import '../../components/result-section/result-section.css';
import '../../components/result-section/result-row.css';
import '../../components/selected-flyout/selected-flyout.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  modal,
  params,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  const validLocale = locale as Locale;
  if (!routing.locales.includes(validLocale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Providers>
        <PageLayout>
          {children}
          {modal}
        </PageLayout>
      </Providers>
    </NextIntlClientProvider>
  );
}
