import { render, screen } from '@testing-library/react';
import { ResultsSection } from '../../../components/result-section/ResultsSection.tsx';
import type { Character } from '../../../types/types.ts';

describe('ResultsSection', () => {
  const props = {
    results: [] as Character[],
    isLoading: false,
    error: '',
    hasSearched: true,
  };

  it('renders section title', () => {
    render(<ResultsSection {...props} />);

    expect(
      screen.getByRole('heading', { name: /results/i })
    ).toBeInTheDocument();
  });

  it('renders ResultList component', () => {
    render(<ResultsSection {...props} />);

    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });
});
