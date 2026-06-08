import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UncontrolledForm } from '../../../components/forms/UncontrolledForm';
import { useFormsStore } from '../../../store/useFormsStore';

const mockFileToBase64 = vi.fn(() =>
  Promise.resolve('data:image/png;base64,mock')
);
const mockCreateSubmission = vi.fn((source: string, data: object) => ({
  id: 'mock-id',
  source,
  ...data,
  createdAt: 123,
}));

vi.mock('../../../utils/fileToBase64', () => ({
  fileToBase64: () => mockFileToBase64(),
}));

vi.mock('../../../utils/createSubmission', () => ({
  createSubmission: (source: string, data: object) =>
    mockCreateSubmission(source, data),
}));

const mockSafeParse = vi.fn();

vi.mock('../../../utils/formSchema', () => ({
  createFormSchema: () => ({
    safeParse: (data: unknown) => mockSafeParse(data),
  }),
}));

vi.mock('../../../components/image-upload/UncontrolledImageUpload', () => ({
  UncontrolledImageUpload: ({ error }: { error?: string }) => (
    <input
      id="image"
      name="image"
      type="file"
      aria-label="Profile image"
      data-testid="image-input"
      className={error ? 'form-input-error' : ''}
    />
  ),
}));

describe('UncontrolledForm', () => {
  const mockOnSuccess = vi.fn();

  beforeEach(() => {
    mockOnSuccess.mockClear();
    mockFileToBase64.mockClear();
    mockCreateSubmission.mockClear();
    mockSafeParse.mockReturnValue({
      success: false,
      error: {
        issues: [{ path: ['name'], message: 'First letter must be uppercase' }],
      },
    });
    useFormsStore.setState({
      countries: ['Belarus', 'Poland'],
      submissions: [],
    });
  });

  it('should render all form fields and labels properly', () => {
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);

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
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(
        screen.getByText('First letter must be uppercase')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Please complete all required fields correctly.')
      ).toBeInTheDocument();
    });

    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('should toggle password visibility when toggle button is clicked', () => {
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);

    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const toggleButtons = screen.getAllByRole('button', {
      name: /Show password/i,
    });
    const passwordToggle = toggleButtons[0];

    expect(passwordInput.type).toBe('password');
    fireEvent.click(passwordToggle);
    expect(passwordInput.type).toBe('text');
    fireEvent.click(passwordToggle);
    expect(passwordInput.type).toBe('password');
  });

  it('should toggle confirm password visibility when toggle button is clicked', () => {
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);

    const confirmPasswordInput = screen.getByLabelText(
      'Confirm password'
    ) as HTMLInputElement;
    const toggleButtons = screen.getAllByRole('button', {
      name: /Show password/i,
    });
    const confirmToggle = toggleButtons[1];

    expect(confirmPasswordInput.type).toBe('password');
    fireEvent.click(confirmToggle);
    expect(confirmPasswordInput.type).toBe('text');
  });

  it('should update password strength indicator on typing', () => {
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);

    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'a' } });

    expect(screen.getAllByText('✗').length).toBeGreaterThan(0);
  });

  it('should submit form successfully with valid data', async () => {
    mockSafeParse.mockReturnValue({
      success: true,
      data: {
        name: 'John',
        age: 25,
        gender: 'female',
        image: 'data:image/png;base64,mock',
        email: 'john@example.com',
        password: 'Password1!',
        confirmPassword: 'Password1!',
        country: 'Belarus',
        termsAccepted: true,
      },
    });

    render(<UncontrolledForm onSuccess={mockOnSuccess} />);
    fireEvent.submit(
      screen.getByRole('button', { name: 'Submit' }).closest('form')!
    );

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });
});
