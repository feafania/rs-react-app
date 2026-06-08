import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { TriggerErrorButton } from '../../../components/TriggerErrorButton.tsx';

describe('TriggerErrorButton', () => {
  it('renders button', () => {
    render(<TriggerErrorButton onClick={vi.fn()} />);

    expect(
      screen.getByRole('button', { name: /trigger error/i })
    ).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<TriggerErrorButton onClick={handleClick} />);

    const button = screen.getByRole('button', { name: /trigger error/i });

    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
