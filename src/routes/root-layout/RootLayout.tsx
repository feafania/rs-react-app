import { Outlet, NavLink, useLocation } from 'react-router';

import { ErrorBoundary } from '../../components/ErrorBoundary.tsx';

import './root-layout.css';
import { useTheme } from '../../hooks/useTheme.ts';
import { Modal } from '../../components/modal/Modal.tsx';
import { useState } from 'react';
import { UncontrolledForm } from '../../components/forms/UncontrolledForm.tsx';

export function RootLayout() {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isHomeActive = pathname === '/' || pathname.startsWith('/details/');
  return (
    <ErrorBoundary>
      <div className="app-shell">
        <header className="app-header">
          <div className="header-content">
            <h1 className="logo">Star Wars Character Explorer</h1>
            <nav className="main-nav">
              <NavLink
                to="/"
                className={isHomeActive ? 'nav-link active' : 'nav-link'}
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                About
              </NavLink>
              <button
                className="header-action"
                onClick={() => setIsModalOpen(true)}
              >
                Add Profile
              </button>
            </nav>
            <button className="theme-button" onClick={toggleTheme}>
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </header>

        <div className="page-content">
          <Outlet />
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Uncontrolled Form"
        >
          <UncontrolledForm />
        </Modal>
      </div>
    </ErrorBoundary>
  );
}
