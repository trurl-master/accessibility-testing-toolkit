import { TextMatcher } from '../types/types';

export const textTester = (
  received: string,
  expected: TextMatcher | undefined,
  element: HTMLElement | null
) => {
  if (typeof expected === 'undefined') {
    return true;
  }

  if (typeof expected === 'string') {
    return received === expected;
  }

  if (typeof expected === 'number') {
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
