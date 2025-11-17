import React from 'react';
import './Layout.css';

const ScrollSection = ({ children, maxHeight = '400px', className = '' }) => {
  return (
    <div 
      className={`scroll-section ${className}`}
      style={{ maxHeight }}
    >
      {children}
    </div>
  );
};

export default ScrollSection;