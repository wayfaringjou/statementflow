import React from 'react';
import { createPortal } from 'react-dom';
import './Dialog.css';

export default function Dialog({ dialogContent, dialogOpen, dialogOriginPosition }) {
  if (!dialogOpen) return null;

  return createPortal(
    <aside
      className="dialog"
      style={{
        top: dialogOriginPosition.top + dialogOriginPosition.height,
        right: dialogOriginPosition.right - document.body.clientWidth,
      }}
    >
      {dialogContent}
    </aside>,
    document.getElementById('portal'),
  );
}
