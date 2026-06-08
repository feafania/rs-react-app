import { Outlet, NavLink, useLocation } from 'react-router';

import { ErrorBoundary } from '../../components/ErrorBoundary.tsx';

import './root-layout.css';
import { useTheme } from '../../hooks/useTheme.ts';
import { Modal } from '../../components/modal/Modal.tsx';
import { useEffect, useRef, useState } from 'react';
import { UncontrolledForm } from '../../components/forms/UncontrolledForm.tsx';
import { type FormType, FormTypes } from '../../types/types.ts';
import { RhfForm } from '../../components/forms/RhfForm.tsx';

export function RootLayout() {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formType, setFormType] = useState<FormType>(FormTypes.uncontrolled);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const isHomeActive = pathname === '/' || pathname.startsWith('/details/');
  const addProfileButtonRef = useRef<HTMLButtonElement>(null);

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
              <div className="profile-menu-wrapper" ref={menuRef}>
                <button
                  ref={addProfileButtonRef}
                  className="header-action"
                  onClick={() => setMenuOpen((prev) => !prev)}
                >
                  Add Profile ▾
                </button>

                {menuOpen && (
                  <div className="profile-menu">
                    <button
                      className="profile-menu-item"
                      onClick={() => {
                        setFormType(FormTypes.uncontrolled);
                        setIsModalOpen(true);
                        setMenuOpen(false);
                      }}
                    >
                      Uncontrolled Form
                    </button>

                    <button
                      className="profile-menu-item"
                      onClick={() => {
                        setFormType(FormTypes.rhf);
                        setIsModalOpen(true);
                        setMenuOpen(false);
                      }}
                    >
                      React Hook Form
                    </button>
                  </div>
                )}
              </div>
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
          triggerRef={addProfileButtonRef}
          title={
            formType === 'uncontrolled'
              ? 'Uncontrolled Form'
              : 'React Hook Form'
          }
        >
          {formType === FormTypes.uncontrolled ? (
            <UncontrolledForm onSuccess={() => setIsModalOpen(false)} />
          ) : (
            <RhfForm onSuccess={() => setIsModalOpen(false)} />
          )}
        </Modal>
      </div>
    </ErrorBoundary>
  );
}
