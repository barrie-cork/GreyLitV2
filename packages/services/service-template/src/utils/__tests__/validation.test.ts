import { validateInput } from '../validation';

describe('Input Validation', () => {
  it('should validate string input', () => {
    expect(validateInput('test')).toBe(true);
    expect(validateInput('')).toBe(false);
  });

  it('should validate number input', () => {
    expect(validateInput(123)).toBe(true);
    expect(validateInput(-1)).toBe(false);
  });

  it('should validate object input', () => {
    expect(validateInput({ key: 'value' })).toBe(true);
    expect(validateInput({})).toBe(false);
  });

  it('should handle null and undefined', () => {
    expect(validateInput(null)).toBe(false);
    expect(validateInput(undefined)).toBe(false);
  });
});
