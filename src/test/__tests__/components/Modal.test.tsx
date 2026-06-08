import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Modal } from '../../../components/modal/Modal';

describe('Modal and useModalAccessibility', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    HTMLDialogElement.prototype.showModal = vi.fn(function (
      this: HTMLDialogElement
    ) {
      this.open = true;
    });
    HTMLDialogElement.prototype.close = vi.fn(function (
      this: HTMLDialogElement
    ) {
      this.open = false;
    });
  });

  it('should render into document.body when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Content</div>
      </Modal>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should return null and not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
        <div>Content</div>
      </Modal>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Content</div>
      </Modal>
    );

    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when native cancel event triggers and file input is not active', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Content</div>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    fireEvent(dialog, new Event('cancel'));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should not close on cancel event if file input is currently active', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <input type="file" data-testid="file-input" />
      </Modal>
    );

    const fileInput = screen.getByTestId('file-input');
    fileInput.focus();

    const dialog = screen.getByRole('dialog');
    fireEvent(dialog, new Event('cancel'));

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should close when clicking outside the modal content on the backdrop', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Content</div>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');

    fireEvent.mouseDown(dialog, { target: dialog });
    fireEvent.mouseUp(dialog, { target: dialog });

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should not close when text selection starts inside and ends outside the modal', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div data-testid="inside">Content</div>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    const inside = screen.getByTestId('inside');

    fireEvent.mouseDown(inside, { target: inside });
    fireEvent.mouseUp(dialog, { target: dialog });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should focus the trigger element after modal close actions', () => {
    vi.useFakeTimers();
    const buttonRef = React.createRef<HTMLButtonElement>();
    const button = document.createElement('button');

    Object.defineProperty(buttonRef, 'current', {
      value: button,
      writable: true,
    });

    vi.spyOn(button, 'focus');

    render(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        title="Test Modal"
        triggerRef={buttonRef as unknown as React.RefObject<HTMLButtonElement>}
      >
        <div>Content</div>
      </Modal>
    );

    fireEvent.click(screen.getByLabelText('Close modal'));
    vi.advanceTimersByTime(50);

    expect(button.focus).toHaveBeenCalled();
    vi.useRealTimers();
  });

  describe('Focus Trap Accessibility', () => {
    it('should cycle focus to the first element when Tab is pressed on the last element', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <input data-testid="first" type="text" />
          <button data-testid="last" type="button">
            Last
          </button>
        </Modal>
      );

      const closeBtn = screen.getByLabelText('Close modal');
      const lastInput = screen.getByTestId('last');

      lastInput.focus();
      fireEvent.keyDown(window, { key: 'Tab', shiftKey: false });

      expect(document.activeElement).toBe(closeBtn);
    });

    it('should cycle focus to the last element when Shift+Tab is pressed on the first element', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <input data-testid="middle" type="text" />
        </Modal>
      );

      const closeBtn = screen.getByLabelText('Close modal');
      const middleInput = screen.getByTestId('middle');

      closeBtn.focus();
      fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });

      expect(document.activeElement).toBe(middleInput);
    });

    it('should do nothing on keydown if key is not Tab', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <input data-testid="middle" type="text" />
        </Modal>
      );

      const closeBtn = screen.getByLabelText('Close modal');
      closeBtn.focus();
      fireEvent.keyDown(window, { key: 'Enter' });

      expect(document.activeElement).toBe(closeBtn);
    });

    it('should do nothing when there are no focusable elements', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <div>No focusable content</div>
        </Modal>
      );

      fireEvent.keyDown(window, { key: 'Tab', shiftKey: false });

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('should not move focus when Shift+Tab is pressed on non-first element', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <input data-testid="middle" type="text" />
        </Modal>
      );

      const middleInput = screen.getByTestId('middle');
      middleInput.focus();

      fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });

      expect(document.activeElement).toBe(middleInput);
    });

    it('should not move focus when Tab is pressed on non-last element', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <input data-testid="middle" type="text" />
        </Modal>
      );

      const closeBtn = screen.getByLabelText('Close modal');
      closeBtn.focus();

      fireEvent.keyDown(window, { key: 'Tab', shiftKey: false });

      expect(document.activeElement).toBe(closeBtn);
    });
  });
});
