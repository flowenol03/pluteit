import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import Button from '../../components/common/Button';
import './Category.css';

const CategoryHeader = ({ category, onAddItem }) => {
  const navigate = useNavigate();

  return (
    <header className="category-header">
      <div className="category-header-content">
        <button 
          className="back-button"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={20} />
        </button>
        
        <div className="category-info">
          <div className="category-image">
            {category.imageUrl ? (
              <img src={category.imageUrl} alt={category.title} />
            ) : (
              <div className="category-image-placeholder">
                {category.title.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="category-details">
            <h1>{category.title}</h1>
            <p>{category.subtitle}</p>
          </div>
        </div>
        
        <Button onClick={onAddItem}>
          <Plus size={16} />
          Add New Item
        </Button>
      </div>
    </header>
  );
};

export default CategoryHeader;