/**
 * Validates input based on type and content
 * @param input - The input to validate
 * @returns boolean indicating if input is valid
 */
export function validateInput(input: unknown): boolean {
  if (input === null || input === undefined) {
    return false;
  }

  if (typeof input === 'string') {
    return input.length > 0;
  }

  if (typeof input === 'number') {
    return input >= 0;
  }

  if (typeof input === 'object') {
    return Object.keys(input as object).length > 0;
  }

  return false;
}
