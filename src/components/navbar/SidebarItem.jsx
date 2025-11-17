import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const SidebarItem = ({ category }) => {
  return (
    <Link 
      to={`/category/${category.id}`} 
      className="sidebar-item"
    >
      <div className="sidebar-item-icon">
        {category.imageUrl ? (
          <img src={category.imageUrl} alt={category.title} />
        ) : (
          <div className="sidebar-item-placeholder">
            {category.title.charAt(0)}
          </div>
        )}
      </div>
      <div className="sidebar-item-content">
        <div className="sidebar-item-title">{category.title}</div>
        <div className="sidebar-item-subtitle">{category.subtitle}</div>
      </div>
    </Link>
  );
};

export default SidebarItem;