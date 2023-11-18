import {
  A11yTreeNodeQueries,
  A11yTreeNodeQueriesMatch,
  TextMatcher,
} from './types/types';

export const textMatcherTester = (
  received: string | undefined,
  expected: TextMatcher | undefined,
  element: HTMLElement | null
): boolean => {
  if (received === undefined) {
    if (expected === undefined) {
      return true;
    }

    return false;
  }

  if (typeof expected === 'string' || typeof expected === 'number') {
    return received === expected.toString();
  }

  if (expected instanceof RegExp) {
    return expected.test(received);
  }

  if (typeof expected === 'function') {
    return expected(received, element);
  }

  return false;
};

export const queriesTester = (
  received: A11yTreeNodeQueries,
  expected: A11yTreeNodeQueriesMatch
): boolean => {
  let isEqual = true;

  if (expected.level !== undefined) {
    isEqual &&= received.level === expected.level;
  }

  if (expected.value !== undefined) {
    isEqual &&= received.value.min === expected.value.min;
    isEqual &&= received.value.max === expected.value.max;
    isEqual &&= received.value.now === expected.value.now;
    isEqual &&= textMatcherTester(
      received.value.text,
      expected.value.text,
      null
    );
  }

  return isEqual;
};
