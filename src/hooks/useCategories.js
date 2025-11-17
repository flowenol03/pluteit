import { useState, useEffect } from 'react';
import { categoryService } from '../services/firebase/categoryService';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = categoryService.getCategories(
      (categoriesData) => {
        setCategories(categoriesData);
        setLoading(false);
      },
      (err) => {
        setError(err?.message || 'Failed to load categories');
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const addCategory = async (categoryData) => {
    try {
      setLoading(true);
      const categoryId = await categoryService.createCategory(categoryData);
      setLoading(false);
      return categoryId;
    } catch (err) {
      setError(err?.message || 'Failed to add category');
      setLoading(false);
      throw err;
    }
  };

  const updateCategory = async (categoryId, categoryData) => {
    try {
      setLoading(true);
      await categoryService.updateCategory(categoryId, categoryData);
      setLoading(false);
    } catch (err) {
      setError(err?.message || 'Failed to update category');
      setLoading(false);
      throw err;
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      setLoading(true);
      await categoryService.deleteCategory(categoryId);
      setLoading(false);
    } catch (err) {
      setError(err?.message || 'Failed to delete category');
      setLoading(false);
      throw err;
    }
  };

  return {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory
  };
};