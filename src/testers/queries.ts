import { A11yTreeNodeQueries, A11yTreeNodeQueriesMatch } from '../types/types';
import { textTester } from './text';

export const queriesTester = (
  received: A11yTreeNodeQueries,
  expected: A11yTreeNodeQueriesMatch | undefined
) => {
  if (typeof expected === 'undefined') {
    return true;
  }

  let result = true;

  if (expected.level !== undefined) {
    result &&= received.level === expected.level;
  }

  if (expected.value !== undefined) {
    if (expected.value.min !== undefined) {
      result &&= received.value.min === expected.value.min;
    }

    if (expected.value.max !== undefined) {
      result &&= received.value.max === expected.value.max;
    }

    if (expected.value.now !== undefined) {
      result &&= received.value.now === expected.value.now;
    }

    if (expected.value.text !== undefined) {
      if (received.value.text === undefined) {
        result &&= received.value.text === expected.value.text;
      } else {
        result &&= textTester(received.value.text, expected.value.text, null);
      }
    }
  }

  return result;
};
