/**
 * Date formatting utilities
 */

/**
 * Formats a date string to Dutch locale format
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {string} Formatted date string
 */
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("nl-BE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Gets the year from a date string
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {string} Year as string
 */
export function getYear(dateString) {
  return new Date(dateString).getFullYear().toString();
}

/**
 * Checks if a date is in the future
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {boolean} True if date is in the future
 */
export function isFutureDate(dateString) {
  return new Date(dateString) >= new Date();
}

