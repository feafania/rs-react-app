import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UncontrolledImageUpload } from '../../../components/image-upload/UncontrolledImageUpload';

vi.mock('../../../utils/fileToBase64', () => ({
  fileToBase64: vi.fn(() => Promise.resolve('data:image/png;base64,mock')),
}));

describe('UncontrolledImageUpload', () => {
  it('should render hint text', () => {
    const { container } = render(<UncontrolledImageUpload />);
    expect(screen.getByText('PNG or JPEG, max 2MB')).toBeInTheDocument();
    expect(container.querySelector('input[type="file"]')).toBeInTheDocument();
  });

  it('should show preview when valid image is uploaded', async () => {
    const user = userEvent.setup();
    const { container } = render(<UncontrolledImageUpload />);

    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File(['content'], 'test.png', { type: 'image/png' });
    await user.upload(input, file);

    const preview = await screen.findByAltText('Preview');
    expect(preview).toBeInTheDocument();
    expect(preview).toHaveAttribute('src', 'data:image/png;base64,mock');
  });

  it('should clear image when clear button is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<UncontrolledImageUpload />);

    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File(['content'], 'test.png', { type: 'image/png' });
    await user.upload(input, file);

    const clearButton = await screen.findByRole('button', {
      name: 'Remove image',
    });
    await user.click(clearButton);

    expect(screen.queryByAltText('Preview')).not.toBeInTheDocument();
  });

  it('should show error when external error prop is provided', () => {
    render(<UncontrolledImageUpload error="Invalid image format" />);
    expect(screen.getByText('Invalid image format')).toBeInTheDocument();
  });

  it('should show error for invalid file type', async () => {
    const { container } = render(<UncontrolledImageUpload />);

    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File(['content'], 'test.gif', { type: 'image/gif' });

    Object.defineProperty(input, 'files', {
      value: [file],
      configurable: true,
    });
    fireEvent.change(input);

    expect(
      await screen.findByText('Only PNG and JPEG files are allowed')
    ).toBeInTheDocument();
    expect(screen.queryByAltText('Preview')).not.toBeInTheDocument();
  });

  it('should show error for oversized file', async () => {
    const { container } = render(<UncontrolledImageUpload />);

    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const largeContent = new Uint8Array(3 * 1024 * 1024);
    const file = new File([largeContent], 'large.png', { type: 'image/png' });

    Object.defineProperty(input, 'files', {
      value: [file],
      configurable: true,
    });
    fireEvent.change(input);

    expect(await screen.findByText(/File too large/)).toBeInTheDocument();
    expect(screen.queryByAltText('Preview')).not.toBeInTheDocument();
  });
});
