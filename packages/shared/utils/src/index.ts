/**
 * Validates an email address
 * @param email The email address to validate
 * @returns true if the email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a URL string
 * @param url The URL to validate
 * @returns true if the URL is valid, false otherwise
 */
export const isValidUrl = (url: string): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Checks if a string is empty or only whitespace
 * @param str The string to check
 * @returns true if the string is empty or only whitespace, false otherwise
 */
export const isEmptyString = (str: string): boolean => {
  return !str || str.trim().length === 0;
};
