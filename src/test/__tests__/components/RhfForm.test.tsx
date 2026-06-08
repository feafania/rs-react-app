import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RhfForm } from '../../../components/forms/RhfForm';
import { useFormsStore } from '../../../store/useFormsStore';

const mockCreateSubmission = vi.fn((source: string, data: object) => ({
  id: 'mock-id',
  source,
  ...data,
  createdAt: 123,
}));

vi.mock('../../../utils/fileToBase64', () => ({
  fileToBase64: vi.fn(() => Promise.resolve('data:image/png;base64,mock')),
}));

vi.mock('../../../utils/createSubmission', () => ({
  createSubmission: (source: string, data: object) =>
    mockCreateSubmission(source, data),
}));

vi.mock('../../../components/image-upload/ImageUpload', () => ({
  ImageUpload: ({
    onChange,
    error,
  }: {
    onChange: (v: string) => void;
    onBlur?: () => void;
    error?: string;
  }) => (
    <input
      id="image"
      type="file"
      aria-label="Profile image"
      className={error ? 'form-input-error' : ''}
      onChange={() => onChange('data:image/png;base64,mock')}
    />
  ),
}));

describe('RhfForm', () => {
  const mockOnSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockCreateSubmission.mockClear();
    useFormsStore.setState({
      countries: ['Belarus', 'Poland'],
      submissions: [],
    });
  });

  it('should render all form fields and labels', () => {
    render(<RhfForm onSuccess={mockOnSuccess} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    expect(screen.getByLabelText('Profile image')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should show validation errors on submit when fields are empty', async () => {
    const user = userEvent.setup();
    render(<RhfForm onSuccess={mockOnSuccess} />);

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(
        screen.getByText(/Please complete all required fields/i)
      ).toBeInTheDocument();
    });

    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('should toggle password visibility', async () => {
    const user = userEvent.setup();
    render(<RhfForm onSuccess={mockOnSuccess} />);

    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const toggleButtons = screen.getAllByRole('button', {
      name: /Show password/i,
    });

    expect(passwordInput.type).toBe('password');
    await user.click(toggleButtons[0]);
    expect(passwordInput.type).toBe('text');
  });

  it('should toggle confirm password visibility', async () => {
    const user = userEvent.setup();
    render(<RhfForm onSuccess={mockOnSuccess} />);

    const confirmPasswordInput = screen.getByLabelText(
      'Confirm password'
    ) as HTMLInputElement;
    const toggleButtons = screen.getAllByRole('button', {
      name: /Show password/i,
    });

    expect(confirmPasswordInput.type).toBe('password');
    await user.click(toggleButtons[1]);
    expect(confirmPasswordInput.type).toBe('text');
  });

  it('should update password strength indicator on typing', async () => {
    const user = userEvent.setup();
    render(<RhfForm onSuccess={mockOnSuccess} />);

    const passwordInput = screen.getByLabelText('Password');
    await user.type(passwordInput, 'a');

    expect(screen.getAllByText('✗').length).toBeGreaterThan(0);
  });

  it('should submit form successfully with valid data', async () => {
    const user = userEvent.setup();
    render(<RhfForm onSuccess={mockOnSuccess} />);

    await user.type(screen.getByLabelText('Name'), 'John');
    await user.type(screen.getByLabelText('Age'), '25');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getByLabelText('Password'), 'Password1!');
    await user.type(screen.getByLabelText('Confirm password'), 'Password1!');

    fireEvent.change(screen.getByLabelText('Country'), {
      target: { value: 'Belarus' },
    });
    fireEvent.blur(screen.getByLabelText('Country'));

    fireEvent.change(screen.getByLabelText('Profile image'), {});

    await user.click(screen.getByRole('checkbox'));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Submit' })).not.toBeDisabled();
    });

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });
});
