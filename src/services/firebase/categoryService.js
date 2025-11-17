import { database } from './firebaseConfig';
import { ref, push, set, update, remove, onValue, off } from 'firebase/database';

export const categoryService = {
  createCategory: async (categoryData) => {
    try {
      const categoriesRef = ref(database, 'categories');
      const newCategoryRef = push(categoriesRef);
      const categoryId = newCategoryRef.key;
      
      const categoryWithId = {
        ...categoryData,
        id: categoryId,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      
      await set(newCategoryRef, categoryWithId);
      return categoryId;
    } catch (error) {
      throw new Error(`Failed to create category: ${error.message}`);
    }
  },

  getCategories: (callback, errorCallback) => {
    const categoriesRef = ref(database, 'categories');
    
    const onData = (snapshot) => {
      const data = snapshot.val();
      const categories = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      })) : [];
      callback(categories);
    };
    
    const onError = (error) => {
      errorCallback(error);
    };
    
    onValue(categoriesRef, onData, onError);
    
    return () => off(categoriesRef);
  },

  updateCategory: async (categoryId, categoryData) => {
    try {
      const categoryRef = ref(database, `categories/${categoryId}`);
      await update(categoryRef, {
        ...categoryData,
        updatedAt: Date.now()
      });
    } catch (error) {
      throw new Error(`Failed to update category: ${error.message}`);
    }
  },

  deleteCategory: async (categoryId) => {
    try {
      const categoryRef = ref(database, `categories/${categoryId}`);
      await remove(categoryRef);
    } catch (error) {
      throw new Error(`Failed to delete category: ${error.message}`);
    }
  }
};