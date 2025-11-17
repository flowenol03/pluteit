export const validateCategory = (categoryData) => {
  const errors = {};

  if (!categoryData.title?.trim()) {
    errors.title = 'Category title is required';
  } else if (categoryData.title.length < 2) {
    errors.title = 'Title must be at least 2 characters long';
  }

  if (!categoryData.subtitle?.trim()) {
    errors.subtitle = 'Category subtitle is required';
  }

  if (!categoryData.uiType) {
    errors.uiType = 'UI type is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};