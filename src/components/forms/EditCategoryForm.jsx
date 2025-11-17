import React, { useState, useEffect } from 'react';
import { useUpload } from '../../hooks/useUpload';
import { validateCategory } from '../../services/validations/categoryValidation';
import Input from '../common/Input';
import Button from '../common/Button';
import './Form.css';

const EditCategoryForm = ({ category, onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    imageUrl: '',
    uiType: 'LIST'
  });
  
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const { uploadFile, uploading } = useUpload();

  // Initialize form with category data
  useEffect(() => {
    if (category) {
      setFormData({
        title: category.title || '',
        subtitle: category.subtitle || '',
        imageUrl: category.imageUrl || '',
        uiType: category.uiType || 'LIST'
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        imageUrl: previewUrl
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateCategory(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      let finalImageUrl = formData.imageUrl;
      
      // Upload image if a new file was selected
      if (imageFile) {
        finalImageUrl = await uploadFile(imageFile, 'categories');
      }

      const categoryData = {
        ...formData,
        imageUrl: finalImageUrl
      };

      await onSubmit(categoryData);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  if (!category) return null;

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-header">
        <h2>Edit Category</h2>
      </div>

      <div className="form-body">
        <Input
          label="Category Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter category title"
          error={errors.title}
          required
        />

        <Input
          label="Subtitle"
          name="subtitle"
          value={formData.subtitle}
          onChange={handleChange}
          placeholder="Enter category subtitle"
          error={errors.subtitle}
          required
        />

        <div className="form-group">
          <label className="form-label">
            Category Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="form-input"
          />
          {formData.imageUrl && (
            <div className="image-preview">
              <img src={formData.imageUrl} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">
            UI Type
          </label>
          <select
            name="uiType"
            value={formData.uiType}
            onChange={handleChange}
            className="form-input"
          >
            <option value="LIST">List</option>
            <option value="GRID">Grid</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading || uploading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={loading || uploading}
          disabled={loading || uploading}
        >
          Update Category
        </Button>
      </div>
    </form>
  );
};

export default EditCategoryForm;