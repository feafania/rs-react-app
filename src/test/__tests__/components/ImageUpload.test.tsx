import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageUpload } from '../../../components/image-upload/ImageUpload';

vi.mock('../../../utils/fileToBase64', () => ({
  fileToBase64: vi.fn(() => Promise.resolve('data:image/png;base64,mock')),
}));

describe('ImageUpload', () => {
  beforeEach(() => {
    mockOnChange.mockClear();
    mockOnBlur.mockClear();
  });

  const mockOnChange = vi.fn();
  const mockOnBlur = vi.fn();

  it('should render hint text', () => {
    const { container } = render(<ImageUpload onChange={mockOnChange} />);
    expect(screen.getByText('PNG or JPEG, max 2MB')).toBeInTheDocument();
    expect(container.querySelector('input[type="file"]')).toBeInTheDocument();
  });

  it('should call onChange and show preview when valid image is uploaded', async () => {
    const user = userEvent.setup();
    const { container } = render(<ImageUpload onChange={mockOnChange} />);

    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File(['content'], 'test.png', { type: 'image/png' });
    await user.upload(input, file);

    expect(mockOnChange).toHaveBeenCalledWith('data:image/png;base64,mock');
    const preview = await screen.findByAltText('Preview');
    expect(preview).toBeInTheDocument();
  });

  it('should call onChange with empty string when clear button is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<ImageUpload onChange={mockOnChange} />);

    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File(['content'], 'test.png', { type: 'image/png' });
    await user.upload(input, file);

    const clearButton = await screen.findByRole('button', {
      name: 'Remove image',
    });
    await user.click(clearButton);

    expect(mockOnChange).toHaveBeenLastCalledWith('');
    expect(screen.queryByAltText('Preview')).not.toBeInTheDocument();
  });

  it('should trigger onBlur when input loses focus', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ImageUpload onChange={mockOnChange} onBlur={mockOnBlur} />
    );

    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    await user.click(input);
    await user.tab();

    expect(mockOnBlur).toHaveBeenCalled();
  });

  it('should show error when external error prop is provided', () => {
    render(
      <ImageUpload onChange={mockOnChange} error="Invalid image format" />
    );
    expect(screen.getByText('Invalid image format')).toBeInTheDocument();
  });

  it('should show error for invalid file type', async () => {
    mockOnChange.mockClear();
    const { container } = render(<ImageUpload onChange={mockOnChange} />);

    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File(['content'], 'test.gif', { type: 'image/gif' });

    Object.defineProperty(input, 'files', {
      value: [file],
      configurable: true,
    });
    fireEvent.change(input);

    expect(mockOnChange).toHaveBeenCalledWith('');
    expect(
      await screen.findByText('Only PNG and JPEG files are allowed')
    ).toBeInTheDocument();
  });

  it('should show error and call onChange with empty string for oversized file', async () => {
    const user = userEvent.setup();
    const { container } = render(<ImageUpload onChange={mockOnChange} />);

    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const largeContent = new Uint8Array(3 * 1024 * 1024);
    const file = new File([largeContent], 'large.png', { type: 'image/png' });
    await user.upload(input, file);

    expect(mockOnChange).toHaveBeenCalledWith('');
    expect(screen.getByText(/File too large/)).toBeInTheDocument();
    expect(screen.queryByAltText('Preview')).not.toBeInTheDocument();
  });
});
