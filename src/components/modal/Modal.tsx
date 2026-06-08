import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import './Modal.css';
import { useModalAccessibility } from './useModalAccessibility.ts';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  triggerRef,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isClickOutsideRef = useRef(false);

  const isFileDialogOpen = () => {
    const el = document.activeElement;
    return el instanceof HTMLInputElement && el.type === 'file';
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useModalAccessibility({ isOpen, dialogRef });

  const handleCloseActions = () => {
    onClose();
    setTimeout(() => {
      if (triggerRef && triggerRef.current) {
        triggerRef.current.focus();
      }
    }, 50);
  };

  if (!isOpen) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="modal-content"
      aria-labelledby="modal-title"
      onCancel={(event) => {
        if (isFileDialogOpen()) return;
        event.preventDefault();
        handleCloseActions();
      }}
      onClose={handleCloseActions}
      onMouseDown={(event) => {
        isClickOutsideRef.current = event.target === dialogRef.current;
      }}
      onMouseUp={(event) => {
        if (event.target === dialogRef.current && isClickOutsideRef.current) {
          handleCloseActions();
        }
        isClickOutsideRef.current = false;
      }}
    >
      <div className="modal-scroll">
        <button
          type="button"
          className="modal-close"
          aria-label="Close modal"
          onClick={handleCloseActions}
        >
          ✕
        </button>

        <h2 id="modal-title" className="modal-title">
          {title}
        </h2>

        {children}
      </div>
    </dialog>,
    document.body
  );
}
