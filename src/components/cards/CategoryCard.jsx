import React from 'react';
import { Link } from 'react-router-dom';
import { Edit3, Trash2 } from 'lucide-react';
import './Card.css';

const CategoryCard = ({ 
  category, 
  onEdit, 
  onDelete,
  showActions = true 
}) => {
  return (
    <div className="category-card">
      <div className="category-card-image">
        {category.imageUrl ? (
          <img src={category.imageUrl} alt={category.title} />
        ) : (
          <div className="category-card-placeholder">
            {category.title.charAt(0)}
          </div>
        )}
      </div>
      
      <div className="category-card-content">
        <h3 className="category-card-title">{category.title}</h3>
        <p className="category-card-subtitle">{category.subtitle}</p>
        
        {showActions && (
          <div className="category-card-actions">
            <Link 
              to={`/category/${category.id}`}
              className="btn btn-secondary btn-small"
            >
              View Items
            </Link>
            
            <div className="action-buttons">
              <button 
                className="btn-icon btn-edit"
                onClick={() => onEdit(category)}
                title="Edit Category"
              >
                <Edit3 size={16} />
              </button>
              
              <button 
                className="btn-icon btn-delete"
                onClick={() => onDelete(category.id)}
                title="Delete Category"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;