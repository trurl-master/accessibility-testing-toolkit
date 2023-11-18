import { roleTester } from '../../testers/role';

describe('roleTester', () => {
  it('returns true if expected is undefined', () => {
    expect(roleTester('foo', undefined)).toBe(true);
  });

  it('returns false if received is undefined, and expected is a string', () => {
    expect(roleTester(undefined, 'foo')).toBe(false);
  });

  it('returns true if received is a string, and expected is a string and they are equal', () => {
    expect(roleTester('foo', 'foo')).toBe(true);
  });

  it('returns false if received is a string, and expected is a string and they are not equal', () => {
    expect(roleTester('foo', 'bar')).toBe(false);
  });
});
