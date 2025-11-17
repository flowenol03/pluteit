import { useState, useEffect } from 'react';
import { itemService } from '../services/firebase/itemService';

export const useItems = (categoryId) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryId) {
      setItems([]);
      setLoading(false);
      return;
    }

    const unsubscribe = itemService.getItemsByCategory(
      categoryId,
      (itemsData) => {
        setItems(itemsData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [categoryId]);

  const addItem = async (itemData) => {
    try {
      setLoading(true);
      await itemService.createItem(categoryId, itemData);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (itemId, itemData) => {
    try {
      setLoading(true);
      await itemService.updateItem(categoryId, itemId, itemData);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      setLoading(true);
      await itemService.deleteItem(categoryId, itemId);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem
  };
};