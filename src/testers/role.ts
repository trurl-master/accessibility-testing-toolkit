import { A11yTreeNode, A11yTreeNodeMatch } from '../types/types';

export const roleTester = (
  received: A11yTreeNode['role'],
  expected: A11yTreeNodeMatch['role']
) => {
  if (typeof expected === 'undefined') {
    return true;
  }

  if (typeof expected === 'string') {
    return received === expected;
  }

  return false;
};
