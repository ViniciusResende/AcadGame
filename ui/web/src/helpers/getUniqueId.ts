export const getUniqueId = (prefix = 'id') => {
  // Convert it to base 36 (numbers + letters), and grab the first 5 characters
  // after the decimal.
  return `${prefix}_${Math.random().toString(36).slice(2, 5)}`;
};
