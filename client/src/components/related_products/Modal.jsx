import React from 'react';
import './Related.css';

export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <>
      <div className="overlay" role="presentation" onClick={onClose} />
      <div className="modal1">
        <div className="modal-title">
          Comparison
        </div>
        <div className="modal-content">
          {children}
          <button className="closeModalBtn" onClick={onClose} type="button">Close</button>

        </div>
      </div>
    </>
  );
}
