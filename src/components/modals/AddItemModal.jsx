import React from 'react';
import { createPortal } from 'react-dom';
import AddItemForm from '../forms/AddItemForm';
import './Modal.css';

const AddItemModal = ({ isOpen, onClose, onSubmit, loading }) => {
  if (!isOpen) return null;

  const handleSubmit = async (itemData) => {
    await onSubmit(itemData);
    onClose();
  };

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content large">
        <AddItemForm
          onSubmit={handleSubmit}
          onCancel={onClose}
          loading={loading}
        />
      </div>
    </div>,
    document.body
  );
};

export default AddItemModal;