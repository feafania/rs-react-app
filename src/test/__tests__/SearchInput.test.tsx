import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { SearchInput } from '../../components/SearchInput.tsx';

describe('SearchInput', () => {
  it('renders input element', () => {
    render(<SearchInput value="" onChange={vi.fn()} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays passed value', () => {
    render(<SearchInput value="Luke" onChange={vi.fn()} />);

    expect(screen.getByDisplayValue('Luke')).toBeInTheDocument();
  });

  it('calls onChange when user types', () => {
    const handleChange = vi.fn();

    render(<SearchInput value="" onChange={handleChange} />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, {
      target: {
        value: 'Leia',
      },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders placeholder text', () => {
    render(<SearchInput value="" onChange={vi.fn()} />);

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('renders aria-label', () => {
    render(<SearchInput value="" onChange={vi.fn()} />);

    expect(screen.getByLabelText('Search characters')).toBeInTheDocument();
  });
  it('updates when value changes externally (rerender)', () => {
    const { rerender } = render(
      <SearchInput value="Luke" onChange={vi.fn()} />
    );

    expect(screen.getByDisplayValue('Luke')).toBeInTheDocument();

    rerender(<SearchInput value="" onChange={vi.fn()} />);

    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });

  it('handles empty value correctly (controlled reset)', () => {
    render(<SearchInput value="" onChange={vi.fn()} />);

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('updates input when value changes from empty to filled', () => {
    const { rerender } = render(<SearchInput value="" onChange={vi.fn()} />);

    expect(screen.getByRole('textbox')).toHaveValue('');

    rerender(<SearchInput value="Luke" onChange={vi.fn()} />);

    expect(screen.getByRole('textbox')).toHaveValue('Luke');
  });
});
