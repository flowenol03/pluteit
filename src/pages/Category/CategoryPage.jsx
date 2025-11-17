import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCategories } from '../../hooks/useCategories';
import { useItems } from '../../hooks/useItems';
import { useUIContext } from '../../context/UIContext';
import CategoryHeader from './CategoryHeader';
import CategoryItemList from './CategoryItemList';
import AddItemModal from '../../components/modals/AddItemModal';
// Remove the unused Loader import
import './Category.css';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { categories } = useCategories();
  const { addItem, loading: itemsLoading } = useItems(categoryId);
  const { activeModal, openModal, closeModal } = useUIContext();

  const category = categories.find(cat => cat.id === categoryId);

  if (!category) {
    return (
      <div className="category-page">
        <div className="not-found">
          <h2>Category not found</h2>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddItem = async (itemData) => {
    await addItem(itemData);
  };

  return (
    <div className="category-page">
      <CategoryHeader 
        category={category} 
        onAddItem={() => openModal('addItem')}
      />
      
      <main className="category-main">
        <CategoryItemList categoryId={categoryId} />
      </main>

      <AddItemModal
        isOpen={activeModal === 'addItem'}
        onClose={closeModal}
        onSubmit={handleAddItem}
        loading={itemsLoading}
      />
    </div>
  );
};

export default CategoryPage;