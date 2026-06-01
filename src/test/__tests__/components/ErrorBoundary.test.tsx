import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ErrorBoundary } from '../../../components/ErrorBoundary.tsx';
import MainPage from '../../../routes/main-page/MainPage.tsx';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../test-utils/renderWithProviders.tsx';

const ProblemChild = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Safe content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Safe content')).toBeInTheDocument();
  });

  it('shows fallback UI when error occurs', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();

    spy.mockRestore();
  });

  it('logs error to console', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });

  it('resets error state when clicking Try again', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { rerender } = render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /try again/i });
    button.click();

    rerender(
      <ErrorBoundary>
        <div>Recovered</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Recovered')).toBeInTheDocument();

    spy.mockRestore();
  });

  it('handles triggerError and shows ErrorBoundary fallback', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const user = userEvent.setup();

    renderWithProviders(
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    );

    const triggerButton = screen.getByRole('button', {
      name: /trigger error/i,
    });

    await user.click(triggerButton);

    await screen.findByText(/something went wrong/i);

    spy.mockRestore();
  });
});
