import React from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

export default function Modal({ modalContent, modalOpen, onModalClose }) {
  if (!modalOpen) return null;

  return createPortal(
    <>
      <div className="overlay" />
      <article className="modal">
        <button type="button" onClick={onModalClose}>Close</button>
        <span>{modalContent}</span>
      </article>
    </>,
    document.getElementById('portal'),
  );
}
