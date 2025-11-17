import React from 'react';
import { useCategories } from '../../hooks/useCategories';
import SidebarItem from './SidebarItem';
import './Sidebar.css';

const Sidebar = () => {
  const { categories, loading } = useCategories();

  const mainCategories = categories.slice(0, 5);
  const otherCategories = categories.slice(5);

  if (loading) {
    return (
      <div className="sidebar">
        <div className="sidebar-loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Tech Categories</h2>
      </div>
      
      <div className="sidebar-content">
        <nav className="sidebar-nav">
          {mainCategories.map(category => (
            <SidebarItem 
              key={category.id} 
              category={category} 
            />
          ))}
          
          {otherCategories.length > 0 && (
            <div className="sidebar-scroll-section">
              <div className="sidebar-section-title">More Categories</div>
              {otherCategories.map(category => (
                <SidebarItem 
                  key={category.id} 
                  category={category} 
                />
              ))}
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;