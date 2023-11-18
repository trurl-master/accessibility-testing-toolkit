import { A11yTreeNodeState, A11yTreeNodeStateMatch } from '../types/types';

export const stateTester = (
  received: A11yTreeNodeState,
  expected: A11yTreeNodeStateMatch | undefined
) => {
  // if expected is undefined, the user doesn't care about the state
  if (typeof expected === 'undefined') {
    return true;
  }

  const expectedKeys = Object.keys(
    expected
  ) as (keyof A11yTreeNodeStateMatch)[];

  return expectedKeys.every((key) => {
    if (typeof expected[key] === 'undefined') {
      return true;
    }

    if (typeof expected[key] === 'boolean') {
      return received[key] === expected[key];
    }

    if (typeof expected[key] === 'string') {
      return received[key] === expected[key];
    }

    return false;
  });
};
