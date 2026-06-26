'use client';

import { Link, usePathname } from '../../i18n/navigation';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import './page-layout.css';
import { useTheme } from '../../hooks/useTheme';
import { LanguageSwitcher } from '../../components/language-switcher/LanguageSwitcher';

export function PageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('Layout');

  const currentPath = pathname ?? '';
  const detailsId = searchParams?.get('detailsId');

  const isHomeActive =
    currentPath === '/' || /^\/[a-z]{2}$/.test(currentPath) || !!detailsId;

  const isAboutActive = currentPath.endsWith('/about');

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-content">
          <h1 className="logo">{t('title')}</h1>

          <nav className="main-nav">
            <Link
              href="/"
              className={isHomeActive ? 'nav-link active' : 'nav-link'}
            >
              {t('home')}
            </Link>

            <Link
              href="/about"
              className={isAboutActive ? 'nav-link active' : 'nav-link'}
            >
              {t('about')}
            </Link>
          </nav>

          <LanguageSwitcher />
          <button className="theme-button" onClick={toggleTheme}>
            {theme === 'light' ? t('dark') : t('light')}
          </button>
        </div>
      </header>

      <div className="page-content">{children}</div>
    </div>
  );
}
