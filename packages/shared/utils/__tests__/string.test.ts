import { isValidUrl, isEmptyString } from '../src/index';

describe('String Validation', () => {
  describe('isValidUrl', () => {
    it('should return true for valid URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://sub.domain.com/path')).toBe(true);
      expect(isValidUrl('https://domain.co.uk/path?query=1')).toBe(true);
    });

    it('should return false for invalid URLs', () => {
      expect(isValidUrl('')).toBe(false);
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('http://')).toBe(false);
      expect(isValidUrl('https://')).toBe(false);
    });
  });

  describe('isEmptyString', () => {
    it('should return true for empty strings', () => {
      expect(isEmptyString('')).toBe(true);
      expect(isEmptyString(' ')).toBe(true);
      expect(isEmptyString('\t')).toBe(true);
      expect(isEmptyString('\n')).toBe(true);
    });

    it('should return false for non-empty strings', () => {
      expect(isEmptyString('text')).toBe(false);
      expect(isEmptyString(' text ')).toBe(false);
      expect(isEmptyString('123')).toBe(false);
    });
  });
});
