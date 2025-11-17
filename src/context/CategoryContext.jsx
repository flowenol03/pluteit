import React, { createContext, useContext } from 'react';
import { useCategories } from '../hooks/useCategories';

const CategoryContext = createContext();

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategoryContext must be used within a CategoryProvider');
  }
  return context;
};

export const CategoryProvider = ({ children }) => {
  const categoryData = useCategories();

  return (
    <CategoryContext.Provider value={categoryData}>
      {children}
    </CategoryContext.Provider>
  );
};