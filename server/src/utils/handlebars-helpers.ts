/**
 * Custom Handlebars helpers
 */

/**
 * Format a date to a readable string
 * @param date Date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString();
};

/**
 * Capitalize the first letter of a string
 * @param text Text to capitalize
 * @returns Capitalized text
 */
export const capitalize = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Check if two values are equal
 * @param a First value
 * @param b Second value
 * @returns True if equal, false otherwise
 */
export const eq = (a: unknown, b: unknown): boolean => {
  return a === b;
};

/**
 * Join an array of items with a separator
 * @param items Array to join
 * @param separator Separator to use
 * @returns Joined string
 */
export const join = (items: unknown[], separator = ', '): string => {
  if (!Array.isArray(items)) return '';
  return items.join(separator);
};
