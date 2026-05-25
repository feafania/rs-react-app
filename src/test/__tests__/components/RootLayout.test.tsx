import { screen } from '@testing-library/react';
import { Routes, Route } from 'react-router';
import { RootLayout } from '../../../routes/root-layout/RootLayout.tsx';
import { renderWithProviders } from '../test-utils/renderWithProviders.tsx';

describe('RootLayout', () => {
  function setup(path = '/') {
    return renderWithProviders(
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/about" element={<div>About Page</div>} />
        </Route>
      </Routes>,
      path
    );
  }

  it('renders logo', () => {
    setup();
    expect(
      screen.getByText('Star Wars Character Explorer')
    ).toBeInTheDocument();
  });

  it('renders Home and About nav links', () => {
    setup();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('Home link has active class on root path', () => {
    setup('/');
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveClass('active');
  });

  it('About link has active class on /about path', () => {
    setup('/about');
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toHaveClass('active');
  });

  it('renders outlet content', () => {
    setup('/');
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('renders error boundary wrapping content', () => {
    setup('/');
    expect(
      screen.getByText('Star Wars Character Explorer')
    ).toBeInTheDocument();
  });
});
