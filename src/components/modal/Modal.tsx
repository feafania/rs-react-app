import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { useFocusTrap } from './useFocusTrap';

import './Modal.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useFocusTrap(modalRef, isOpen);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return;
    }

    triggerRef.current = document.activeElement as HTMLElement;

    document.body.style.overflow = 'hidden';

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = '';
      triggerRef.current?.focus();
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    return null;
  }
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={modalRef}
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          aria-label="Close modal"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 id="modal-title" className="modal-title">
          {title}
        </h2>

        {children}
      </div>
    </div>,
    modalRoot
  );
}
