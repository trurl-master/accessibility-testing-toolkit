import { textTester } from '../../testers/text';

describe('textTester', () => {
  it('returns true if expected is undefined', () => {
    expect(textTester('foo', undefined, null)).toBe(true);
  });

  it('returns true if received is a string, and expected is a string and they are equal', () => {
    expect(textTester('foo', 'foo', null)).toBe(true);
  });

  it('returns false if received is a string, and expected is a string and they are not equal', () => {
    expect(textTester('foo', 'bar', null)).toBe(false);
  });

  it('returns true if received is a string, and expected is a number and they are equal', () => {
    expect(textTester('1', 1, null)).toBe(true);
  });

  it('returns false if received is a string, and expected is a number and they are not equal', () => {
    expect(textTester('1', 2, null)).toBe(false);
  });

  it('returns true if received is a string, and expected is a RegExp and they match', () => {
    expect(textTester('foo', /foo/, null)).toBe(true);
  });

  it('returns false if received is a string, and expected is a RegExp and they do not match', () => {
    expect(textTester('foo', /bar/, null)).toBe(false);
  });

  it('returns true if received is a string, and expected is a function and it returns true', () => {
    expect(textTester('foo', (text) => text === 'foo', null)).toBe(true);
  });

  it('returns false if received is a string, and expected is a function and it returns false', () => {
    expect(textTester('foo', (text) => text === 'bar', null)).toBe(false);
  });
});
