import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';
import { routing } from '../../i18n/routing';
import { Providers } from '../providers'; // 👈 Імпарт
import { PageLayout } from '../../features/page-layout/PageLayout';

type Locale = (typeof routing.locales)[number];

export default async function RootLayout({
  children,
  modal,
  params,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
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
