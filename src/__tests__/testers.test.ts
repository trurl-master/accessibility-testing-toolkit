import { textMatcherTester } from '../testers';

describe('Testers', () => {
  describe('textMatcherTester', () => {
    it('returns true if received is a string and expected is a string and they match', () => {
      expect(textMatcherTester('foo', 'foo', null)).toBe(true);
    });

    it('returns false if received is a string and expected is a string and they do not match', () => {
      expect(textMatcherTester('foo', 'bar', null)).toBe(false);
    });

    it('returns true if received is a string and expected is a number and they match', () => {
      expect(textMatcherTester('1', 1, null)).toBe(true);
    });

    it('returns false if received is a string and expected is a number and they do not match', () => {
      expect(textMatcherTester('1', 2, null)).toBe(false);
    });

    it('returns true if received is a string and expected is a RegExp and they match', () => {
      expect(textMatcherTester('foo', /foo/, null)).toBe(true);
    });

    it('returns false if received is a string and expected is a RegExp and they do not match', () => {
      expect(textMatcherTester('foo', /bar/, null)).toBe(false);
    });

    it('returns true if received is a string and expected is a function and they match', () => {
      expect(textMatcherTester('foo', (text) => text === 'foo', null)).toBe(
        true
      );
    });

    it('returns false if received is a string and expected is a function and they do not match', () => {
      expect(textMatcherTester('foo', (text) => text === 'bar', null)).toBe(
        false
      );
    });
  });
});
