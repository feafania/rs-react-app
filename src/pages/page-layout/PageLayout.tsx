'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import './page-layout.css';
import { useTheme } from '../../hooks/useTheme';
import { ErrorBoundary } from '../../components/ErrorBoundary';

export function PageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const currentPath = pathname ?? '';

  const isHomeActive =
    currentPath === '/' ||
    /^\/[a-z]{2}$/.test(currentPath) ||
    currentPath.includes('/details/');

  const isAboutActive = currentPath.endsWith('/about');

  return (
    <ErrorBoundary>
      <div className="app-shell">
        <header className="app-header">
          <div className="header-content">
            <h1 className="logo">Star Wars Character Explorer</h1>

            <nav className="main-nav">
              <Link
                href="/"
                className={isHomeActive ? 'nav-link active' : 'nav-link'}
              >
                Home
              </Link>

              <Link
                href="/about"
                className={isAboutActive ? 'nav-link active' : 'nav-link'} // 👈
              >
                About
              </Link>
            </nav>

            <button className="theme-button" onClick={toggleTheme}>
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </header>

        <div className="page-content">{children}</div>
      </div>
    </ErrorBoundary>
  );
}
