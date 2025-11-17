import React from 'react';
import { createPortal } from 'react-dom';
import EditCategoryForm from '../forms/EditCategoryForm';
import './Modal.css';

const EditCategoryModal = ({ isOpen, onClose, category, onSubmit, loading }) => {
  if (!isOpen) return null;

  const handleSubmit = async (categoryData) => {
    try {
      await onSubmit(categoryData);
      onClose();
    } catch (error) {
      console.error('Error submitting category:', error);
    }
  };

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <EditCategoryForm
          category={category}
          onSubmit={handleSubmit}
          onCancel={onClose}
          loading={loading}
        />
      </div>
    </div>,
    document.body
  );
};

export default EditCategoryModal;