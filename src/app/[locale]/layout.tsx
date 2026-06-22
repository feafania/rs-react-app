import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';
import { routing } from '../../i18n/routing';
import { Providers } from '../providers';
import { PageLayout } from '../../features/page-layout/PageLayout';
import { Locale } from '../../i18n/routing';

export default async function RootLayout({
  children,
  modal,
  params,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const validLocale = locale as Locale;
  if (!routing.locales.includes(validLocale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <PageLayout>
              {children}
              {modal}
            </PageLayout>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
