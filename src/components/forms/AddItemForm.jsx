import React, { useState } from 'react';
import { useUpload } from '../../hooks/useUpload';
import { useCategories } from '../../hooks/useCategories';
import { validateItem } from '../../services/validations/itemValidation';
import Input from '../common/Input';
import Button from '../common/Button';
import './Form.css';

const AddItemForm = ({ onSubmit, onCancel, loading = false }) => {
  const { categories } = useCategories();
  const [formData, setFormData] = useState({
    title: '',
    descriptionHtml: '',
    shortDescription: '',
    uses: [''],
    logoUrl: '',
    basicRoadmapUrl: '',
    allAboutImageUrl: '',
    advancedRoadmaps: [],
    tags: [],
    priority: 1,
    isActive: true,
    categoryId: ''
  });
  
  const [errors, setErrors] = useState({});
  const [newTag, setNewTag] = useState('');
  const { uploadFile, uploading } = useUpload();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleUseChange = (index, value) => {
    const newUses = [...formData.uses];
    newUses[index] = value;
    setFormData(prev => ({
      ...prev,
      uses: newUses
    }));
  };

  const addUse = () => {
    setFormData(prev => ({
      ...prev,
      uses: [...prev.uses, '']
    }));
  };

  const removeUse = (index) => {
    const newUses = formData.uses.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      uses: newUses
    }));
  };

  const handleTagAdd = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const url = await uploadFile(file, 'items');
        setFormData(prev => ({
          ...prev,
          [fieldName]: url
        }));
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateItem(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Filter out empty uses
    const finalData = {
      ...formData,
      uses: formData.uses.filter(use => use.trim() !== '')
    };

    await onSubmit(finalData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-header">
        <h2>Add New Item</h2>
      </div>

      <div className="form-body">
        <div className="form-row">
          <Input
            label="Item Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter item title"
            error={errors.title}
            required
          />

          <div className="form-group">
            <label className="form-label">
              Category
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <span className="error-message">{errors.categoryId}</span>
            )}
          </div>
        </div>

        <Input
          label="Short Description"
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          placeholder="Enter short description"
          error={errors.shortDescription}
          required
        />

        <div className="form-group">
          <label className="form-label">
            Description (HTML supported)
          </label>
          <textarea
            name="descriptionHtml"
            value={formData.descriptionHtml}
            onChange={handleChange}
            placeholder="Enter detailed description"
            rows="6"
            className="form-input"
          />
          {errors.descriptionHtml && (
            <span className="error-message">{errors.descriptionHtml}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Uses</label>
          {formData.uses.map((use, index) => (
            <div key={index} className="dynamic-field-row">
              <input
                type="text"
                value={use}
                onChange={(e) => handleUseChange(index, e.target.value)}
                placeholder="Enter a use case"
                className="form-input"
              />
              {formData.uses.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeUse(index)}
                  className="btn-remove"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={addUse}
            size="small"
          >
            + Add Use
          </Button>
        </div>

        <div className="form-group">
          <label className="form-label">Tags</label>
          <div className="tags-input">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
              placeholder="Enter tag and press Enter"
              className="form-input"
            />
            <Button
              type="button"
              onClick={handleTagAdd}
              size="small"
            >
              Add
            </Button>
          </div>
          <div className="tags-list">
            {formData.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="tag-remove"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Upload Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'logoUrl')}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Upload Basic Roadmap</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'basicRoadmapUrl')}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Upload All-about Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'allAboutImageUrl')}
            className="form-input"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Priority</label>
            <input
              type="number"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              min="1"
              max="10"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="toggle-label">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="toggle-input"
              />
              <span className="toggle-slider"></span>
              Is Active
            </label>
          </div>
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
          Add Item
        </Button>
      </div>
    </form>
  );
};

export default AddItemForm;