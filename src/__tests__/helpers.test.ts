import { getExpectedStringMatch } from '../helpers';

describe('getExpectedStringMatch', () => {
  test('returns receivedValue if expectedValue is undefined', () => {
    // return the received because the expected is undefined it means
    // that the user didn't pass the value and doesn't care about it
    expect(getExpectedStringMatch('foo', undefined)).toBe('foo');
  });

  test('returns expectedValue if it is a string', () => {
    // return the expected because that's what the user expects to get
    expect(getExpectedStringMatch('foo', 'bar')).toBe('bar');
  });

  test('returns receivedValue if it is a RegExp and receivedValue matches it', () => {
    // return the received to not show the user in the diff
    // that it didn't match, when in reality it did
    expect(getExpectedStringMatch('foo', /foo/)).toBe('foo');
  });

  test('returns expectedValue if expectedValue is a RegExp and receivedValue does not match it', () => {
    const regexp = /bar/;
    // return the expected if the received doesn't match it
    expect(getExpectedStringMatch('foo', regexp)).toBe(regexp);
  });
});
