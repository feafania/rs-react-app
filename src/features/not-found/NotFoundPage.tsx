import { getTranslations, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '../../i18n/routing';
import { Link } from '../../i18n/navigation';
import './not-found-page.css';

export default async function NotFound() {
  const locale = routing.defaultLocale;

  const t = await getTranslations('NotFound');
  const quotes = t.raw('quotes') as string[];
  // eslint-disable-next-line react-hooks/purity
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <main className="not-found-page">
            <div className="not-found-card">
              <h1>404</h1>
              <p>{t('title')}</p>
              <p>{quote}</p>

              <Link className="home-link" href="/">
                {t('back')}
              </Link>
            </div>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
