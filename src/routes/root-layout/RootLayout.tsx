import { Outlet, NavLink } from 'react-router';
import { ErrorBoundary } from '../../components/ErrorBoundary.tsx';
import './root-layout.css';

export function RootLayout() {
  return (
    <ErrorBoundary>
      <div className="app-shell">
        <header className="app-header">
          <div className="header-content">
            <h1 className="logo">Character Explorer</h1>

            <nav className="main-nav">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
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
            </nav>
          </div>
        </header>

        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </ErrorBoundary>
  );
}
