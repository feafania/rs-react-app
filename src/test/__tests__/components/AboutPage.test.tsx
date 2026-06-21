import { render, screen } from '@testing-library/react';
import { AboutPage } from '../../../pages/about/AboutPage.tsx';

vi.mock('../../assets/svg/rs-school-logo.inline.svg', () => ({
  default: 'rs-logo.svg',
}));

describe('AboutPage', () => {
  it('renders heading', () => {
    render(<AboutPage />);
    expect(screen.getByText(/about this app/i)).toBeInTheDocument();
  });

  it('renders author name', () => {
    render(<AboutPage />);
    expect(screen.getByText(/tatsiana kashko/i)).toBeInTheDocument();
  });

  it('renders RS School link with correct href', () => {
    render(<AboutPage />);
    const link = screen.getByRole('link', { name: /rs school react course/i });
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders RS School logo image', () => {
    render(<AboutPage />);
    const img = screen.getByAltText(/rs school/i);
    expect(img).toBeInTheDocument();
  });
});
