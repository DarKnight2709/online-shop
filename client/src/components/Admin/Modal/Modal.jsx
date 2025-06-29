import React from "react";
import "./modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <button className="custom-modal__close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
