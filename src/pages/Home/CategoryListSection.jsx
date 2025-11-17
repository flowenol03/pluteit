import React, { useState } from 'react';
import { useCategoryContext } from '../../context/CategoryContext';
import CategoryCard from '../../components/cards/CategoryCard';
import Loader from '../../components/common/Loader';
import './Home.css';

const CategoryListSection = ({ onEditCategory }) => { // Add onEditCategory prop
  const { categories, deleteCategory, loading } = useCategoryContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (loading) {
    return <Loader text="Loading categories..." />;
  }

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCategories = categories.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (category) => {
    onEditCategory(category); // Pass to parent
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await deleteCategory(categoryId);
    }
  };

  return (
    <section className="category-section">
      <div className="section-header">
        <h2>All Categories</h2>
        <div className="section-actions">
          <span className="category-count">
            {categories.length} categories
          </span>
        </div>
      </div>

      {categories.length === 0 ? (
        <div className="empty-state">
          <h3>No categories yet</h3>
          <p>Create your first category to get started</p>
        </div>
      ) : (
        <>
          <div className="categories-grid">
            {currentCategories.map(category => (
              <CategoryCard
                key={category.id}
                category={category}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default CategoryListSection;