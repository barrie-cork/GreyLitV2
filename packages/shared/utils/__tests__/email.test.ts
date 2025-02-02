import { isValidEmail } from '../src';

describe('isValidEmail', () => {
  it('should return true for valid email addresses', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    expect(isValidEmail('user+tag@domain.com')).toBe(true);
    expect(isValidEmail('numbers123@domain.com')).toBe(true);
    expect(isValidEmail('domain@subdomain.domain.com')).toBe(true);
  });

  it('should return false for invalid email addresses', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('missing@domain')).toBe(false);
    expect(isValidEmail('@domain.com')).toBe(false);
    expect(isValidEmail('spaces in@domain.com')).toBe(false);
    expect(isValidEmail('multiple@@domain.com')).toBe(false);
    expect(isValidEmail('no-at-sign')).toBe(false);
    expect(isValidEmail('incomplete@')).toBe(false);
  });

  it('should handle edge cases', () => {
    expect(isValidEmail(' ')).toBe(false);
    expect(isValidEmail('\t')).toBe(false);
    expect(isValidEmail('null')).toBe(false);
    expect(isValidEmail('undefined')).toBe(false);
  });
});
