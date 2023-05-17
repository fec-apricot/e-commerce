import React from 'react';
import './Related.css';

export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <>
      <div className="overlay" />
      <div className="modal">
        <div className="modal-title">
          <button onClick={onClose} type="button">X</button>
          Comparison
        </div>
        <div className="modal-content">
          {children}

        </div>
      </div>
    </>
  );
}
