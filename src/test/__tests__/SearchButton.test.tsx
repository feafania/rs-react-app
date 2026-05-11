import { render, screen } from '@testing-library/react';
import { SearchButton } from '../../components/SearchButton.tsx';

describe('SearchButton', () => {
  it('renders without crashing', () => {
    render(<SearchButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('displays correct text content', () => {
    render(<SearchButton />);
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('has type submit', () => {
    render(<SearchButton />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('has correct CSS class', () => {
    render(<SearchButton />);

    expect(screen.getByRole('button')).toHaveClass('search-button');
  });
});
