import React from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

export default function Modal({ children, open, onClose }) {
  if (!open) return null;

  return createPortal(
    <>
      <div className="overlay" />
      <article className="modal">
        <button type="button" onClick={onClose}>Close</button>
        <span>{children}</span>
      </article>
    </>,
    document.getElementById('portal'),
  );
}
