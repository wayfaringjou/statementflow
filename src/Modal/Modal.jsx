import React from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

export default function Modal({ children, modalOpen, onModalClose }) {
  if (!modalOpen) return null;

  return createPortal(
    <>
      <div className="overlay" />
      <article className="modal">
        <button type="button" onClick={onModalClose}>Close</button>
        <span>{children}</span>
      </article>
    </>,
    document.getElementById('portal'),
  );
}