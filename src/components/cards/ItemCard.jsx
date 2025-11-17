import React from 'react';
import { Trash2 } from 'lucide-react';
import './Card.css';

const ItemCard = ({ item, onDelete, showActions = true }) => {
  return (
    <div className="item-card">
      <div className="item-card-header">
        <div className="item-card-image">
          {item.logoUrl ? (
            <img src={item.logoUrl} alt={item.title} />
          ) : (
            <div className="item-card-placeholder">
              {item.title.charAt(0)}
            </div>
          )}
        </div>
        
        <div className="item-card-title-section">
          <h3 className="item-card-title">{item.title}</h3>
          {item.shortDescription && (
            <p className="item-card-short-desc">{item.shortDescription}</p>
          )}
        </div>
        
        {showActions && (
          <button 
            className="btn-icon btn-delete"
            onClick={() => onDelete(item.id)}
            title="Delete Item"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
      
      {item.descriptionHtml && (
        <div 
          className="item-card-description"
          dangerouslySetInnerHTML={{ __html: item.descriptionHtml }}
        />
      )}
      
      {item.tags && item.tags.length > 0 && (
        <div className="item-card-tags">
          {item.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemCard;