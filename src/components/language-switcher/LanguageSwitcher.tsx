'use client';

import { useLocale } from 'next-intl';
import './language-switcher.css';
import { Locale, routing } from '../../i18n/routing';
import { usePathname, useRouter } from '../../i18n/navigation';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  function changeLocale(nextLocale: Locale) {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    const queryString = params.toString();
    const fullPath = queryString ? `${pathname}?${queryString}` : pathname;

    router.push(fullPath, { locale: nextLocale });
    setOpen(false);
  }

  const localeNames = {
    en: 'English',
    be: 'Беларуская',
  } satisfies Record<Locale, string>;

  return (
    <div className="lang-dropdown">
      <button className="lang-trigger" onClick={() => setOpen(!open)}>
        {localeNames[locale]}
      </button>

      {open && (
        <div className="lang-menu">
          {routing.locales.map((loc) => (
            <div
              key={loc}
              className={`lang-item ${locale === loc ? 'active' : ''}`}
              onClick={() => changeLocale(loc)}
            >
              {localeNames[loc]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
