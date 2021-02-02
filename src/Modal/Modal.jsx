import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

export default function Modal({ modalContent, modalOpen, onModalClose }) {
  if (!modalOpen) return null;

  return createPortal(
    <>
      <div className="overlay" />
      <aside className="modal">
        <section className="dialog-action flow">
          <button
            className="toggle"
            type="button"
            onClick={onModalClose}
          >
            <Icon
              path={mdiClose}
              title="Close dialog"
              color="currentColor"
            />
          </button>
        </section>
        <section
          className="dialog-content"
        >
          {modalContent}
        </section>
      </aside>
    </>,
    document.getElementById('portal'),
  );
}
