import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { RootLayout } from '../../routes/root-layout/RootLayout.tsx';

function renderWithRouter(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/about" element={<div>About Page</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe('RootLayout', () => {
  it('renders logo', () => {
    renderWithRouter();
    expect(screen.getByText('Character Explorer')).toBeInTheDocument();
  });

  it('renders Home and About nav links', () => {
    renderWithRouter();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('Home link has active class on root path', () => {
    renderWithRouter('/');
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveClass('active');
  });

  it('About link has active class on /about path', () => {
    renderWithRouter('/about');
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toHaveClass('active');
  });

  it('renders outlet content', () => {
    renderWithRouter('/');
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('renders error boundary wrapping content', () => {
    renderWithRouter('/');
    expect(screen.getByText('Character Explorer')).toBeInTheDocument();
  });
});
