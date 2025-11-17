import React from 'react';
import { useItems } from '../../hooks/useItems';
import ItemCard from '../../components/cards/ItemCard';
import Loader from '../../components/common/Loader';
import './Category.css';

const CategoryItemList = ({ categoryId }) => {
  const { items, deleteItem, loading } = useItems(categoryId);

  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteItem(itemId);
    }
  };

  if (loading) {
    return <Loader text="Loading items..." />;
  }

  return (
    <div className="category-items">
      <div className="items-header">
        <h2>Items ({items.length})</h2>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <h3>No items yet</h3>
          <p>Add the first item to this category</p>
        </div>
      ) : (
        <div className="items-list">
          {items.map(item => (
            <ItemCard
              key={item.id}
              item={item}
              onDelete={handleDeleteItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryItemList;