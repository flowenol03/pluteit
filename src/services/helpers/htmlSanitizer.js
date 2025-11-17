export const sanitizeHTML = (html) => {
  // Basic HTML sanitization - in production, use a library like DOMPurify
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.innerHTML;
};