import { StaticText } from '../tree/leafs';
import {
  isA11yTreeNode,
  isA11yTreeNodeMatch,
  isTextMatcher,
} from '../type-guards';
import { A11yTreeNode, A11yTreeNodeMatch } from '../types/types';
import { queriesTester } from './queries';
import { roleTester } from './role';
import { stateTester } from './state';
import { textTester } from './text';

export function nodeTester(
  received: A11yTreeNode,
  expected: A11yTreeNodeMatch
): boolean {
  if (!roleTester(received.role, expected.role)) {
    return false;
  }

  if (!textTester(received.name, expected.name, received.element)) {
    return false;
  }

  if (
    !textTester(received.description, expected.description, received.element)
  ) {
    return false;
  }

  if (!stateTester(received.state, expected.state)) {
    return false;
  }

  if (!queriesTester(received.queries, expected.queries)) {
    return false;
  }

  let isEqual = true;

  if (expected.children !== undefined) {
    if (received.children === undefined) {
      throw new Error('treeNodeMatcher: a.children is undefined');
    }

    if (received.children.length !== expected.children.length) {
      return false;
    }

    for (let i = 0; i < received.children.length; i++) {
      if (!isEqual) {
        break;
      }

      const child = received.children[i];
      const childMatcher = expected.children[i];

      if (isA11yTreeNode(child) && isA11yTreeNodeMatch(childMatcher)) {
        isEqual &&= nodeTester(child, childMatcher);
        continue;
      }

      if (child instanceof StaticText && isTextMatcher(childMatcher)) {
        isEqual &&= textTester(child.text, childMatcher, null);
        continue;
      }

      isEqual = false;
    }
  }

  return isEqual;
}
