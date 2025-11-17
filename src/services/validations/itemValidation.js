export const validateItem = (itemData) => {
  const errors = {};

  if (!itemData.title?.trim()) {
    errors.title = 'Item title is required';
  }

  if (!itemData.shortDescription?.trim()) {
    errors.shortDescription = 'Short description is required';
  }

  if (!itemData.descriptionHtml?.trim()) {
    errors.descriptionHtml = 'Description is required';
  }

  if (!itemData.categoryId) {
    errors.categoryId = 'Category is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};