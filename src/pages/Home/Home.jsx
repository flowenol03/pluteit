import React, { useState } from 'react';
import { useUIContext } from '../../context/UIContext';
import { useCategoryContext } from '../../context/CategoryContext';
import Sidebar from '../../components/navbar/Sidebar';
import CategoryListSection from './CategoryListSection';
import AddCategoryModal from '../../components/modals/AddCategoryModal';
import EditCategoryModal from '../../components/modals/EditCategoryModal'; // Add this import
import Button from '../../components/common/Button';
import { Plus, Menu } from 'lucide-react';
import './Home.css';

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null); // Add state for editing
  const { activeModal, openModal, closeModal } = useUIContext();
  const { addCategory, updateCategory, loading, error } = useCategoryContext();

  const handleAddCategory = async (categoryData) => {
    try {
      await addCategory(categoryData);
    } catch (err) {
      console.error('Failed to add category:', err);
    }
  };

  // Add edit handler
  const handleEditCategory = async (categoryData) => {
    try {
      await updateCategory(editingCategory.id, categoryData);
      setEditingCategory(null); // Clear editing state
    } catch (err) {
      console.error('Failed to update category:', err);
    }
  };

  // Add function to open edit modal
  const handleOpenEditModal = (category) => {
    setEditingCategory(category);
  };

  // Add function to close edit modal
  const handleCloseEditModal = () => {
    setEditingCategory(null);
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="header-content">
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={20} />
          </button>
          <h1>Tech Category Manager</h1>
          <Button
            onClick={() => openModal('addCategory')}
            className="add-category-btn"
          >
            <Plus size={16} />
            Add Category
          </Button>
        </div>
      </header>

      {error && (
        <div className="error-banner">
          Error: {error}
        </div>
      )}

      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      <main className="home-main">
        <CategoryListSection onEditCategory={handleOpenEditModal} />
      </main>

      <AddCategoryModal
        isOpen={activeModal === 'addCategory'}
        onClose={closeModal}
        onSubmit={handleAddCategory}
        loading={loading}
      />

      {/* Add Edit Category Modal */}
      <EditCategoryModal
        isOpen={!!editingCategory}
        onClose={handleCloseEditModal}
        category={editingCategory}
        onSubmit={handleEditCategory}
        loading={loading}
      />
    </div>
  );
};

export default Home;