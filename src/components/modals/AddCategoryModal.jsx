import React from 'react';
import { createPortal } from 'react-dom';
import AddCategoryForm from '../forms/AddCategoryForm';
import './Modal.css';

const AddCategoryModal = ({ isOpen, onClose, onSubmit, loading }) => {
  if (!isOpen) return null;

  const handleSubmit = async (categoryData) => {
    try {
      await onSubmit(categoryData);
      onClose();
    } catch (error) {
      // Error is handled by the form
      console.error('Error submitting category:', error);
    }
  };

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <AddCategoryForm
          onSubmit={handleSubmit}
          onCancel={onClose}
          loading={loading}
        />
      </div>
    </div>,
    document.body
  );
};

export default AddCategoryModal;