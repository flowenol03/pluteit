import { database } from './firebaseConfig';
import { ref, push, set, update, remove, onValue, off } from 'firebase/database';

export const itemService = {
  // Create new item
  createItem: async (categoryId, itemData) => {
    try {
      const itemsRef = ref(database, `items/${categoryId}`);
      const newItemRef = push(itemsRef);
      const itemId = newItemRef.key;
      
      const itemWithId = {
        ...itemData,
        id: itemId,
        categoryId,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      
      await set(newItemRef, itemWithId);
      return itemId;
    } catch (error) {
      throw new Error(`Failed to create item: ${error.message}`);
    }
  },

  // Get items by category
  getItemsByCategory: (categoryId, callback) => {
    const itemsRef = ref(database, `items/${categoryId}`);
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const items = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      })) : [];
      callback(items);
    });
    
    return () => off(itemsRef);
  },

  // Update item
  updateItem: async (categoryId, itemId, itemData) => {
    try {
      const itemRef = ref(database, `items/${categoryId}/${itemId}`);
      await update(itemRef, {
        ...itemData,
        updatedAt: Date.now()
      });
    } catch (error) {
      throw new Error(`Failed to update item: ${error.message}`);
    }
  },

  // Delete item
  deleteItem: async (categoryId, itemId) => {
    try {
      const itemRef = ref(database, `items/${categoryId}/${itemId}`);
      await remove(itemRef);
    } catch (error) {
      throw new Error(`Failed to delete item: ${error.message}`);
    }
  }
};