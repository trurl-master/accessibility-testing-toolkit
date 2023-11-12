import { A11yTreeNode, A11yTreeNodeMatch } from './types/types';
import { StaticText } from './leafs';
import { getAccessibleTree } from './accessibility-tree';
import { flattenA11yTree } from './flatten-a11y-tree';
import { type Tester, type TesterContext } from '@jest/expect-utils';
import {
  isA11yTreeNode,
  isA11yTreeNodeMatch,
  // isStaticTextMatcher,
} from './type-guards';
import { matchToNode } from './prepare-diff';
import { getPrettyTree } from './pretty-tree';

function staticTextMatcher(
  this: TesterContext,
  a: unknown,
  b: unknown,
): boolean | undefined {
  const isAStaticText = a instanceof StaticText;
  const isBStringMatcher = b instanceof RegExp || typeof b === 'string';

  const isSuitableMatcher = isAStaticText && isBStringMatcher;

  if (!isSuitableMatcher) {
    return undefined;
  }

  if (a.text === null) {
    return false;
  }

  if (b instanceof RegExp) {
    return b.test(a.text);
  }

  return a.text === b;
}

function treeNodeMatcher(
  this: TesterContext,
  a: unknown,
  b: unknown,
  customTesters?: Tester[],
): boolean | undefined {
  const isAA11yTreeNode = isA11yTreeNode(a);
  const isBA11yTreeNodeMatch = isA11yTreeNodeMatch(b);

  const isSuitableMatcher = isAA11yTreeNode && isBA11yTreeNodeMatch;

  if (!isSuitableMatcher) {
    return undefined;
  }

  let isEqual = true;

  if (b.name !== undefined) {
    isEqual &&=
      b.name instanceof RegExp ? b.name.test(a.name) : a.name === b.name;
  }

  if (b.role !== undefined) {
    isEqual &&= a.role === b.role;
  }

  if (b.description !== undefined) {
    isEqual &&=
      b.description instanceof RegExp
        ? b.description.test(a.description)
        : a.description === b.description;
  }

  if (b.state !== undefined) {
    isEqual &&= this.equals(a.state, b.state, customTesters);
  }

  // console.log('what', !b.children!.every(isStaticTextMatcher));

  if (
    b.children !== undefined
    // &&
    // b.children.length > 0 &&
    // This is not correct
    // (!b.children.every(isStaticTextMatcher) || b.name === undefined)
  ) {
    // console.log('matching children');
    if (a.children === undefined) {
      throw new Error('treeNodeMatcher: a.children is undefined');
      // return false;
    }

    if (a.children.length !== b.children.length) {
      return false;
    }

    for (let i = 0; i < a.children.length; i++) {
      const child = a.children[i];
      const childMatcher = b.children[i];

      isEqual &&= this.equals(child, childMatcher, customTesters);
    }
  }

  return isEqual;
}

const prepareA11yTreeNodeMatch = ({
  children,
  state,
  ...matchTreeObject
}: A11yTreeNodeMatch): A11yTreeNodeMatch => {
  const result: A11yTreeNodeMatch = {
    ...matchTreeObject,
  };

  if (state) {
    result.state = expect.objectContaining(state);
  }

  if (children) {
    result.children = children.map((child) => {
      if (typeof child === 'string' || child instanceof RegExp) {
        return child;
      }

      return prepareA11yTreeNodeMatch(child);
    });
  }

  return result;
};

expect.extend({
  toHaveA11yTree(
    received: HTMLElement | A11yTreeNode,
    expected: A11yTreeNodeMatch,
  ) {
    if (received instanceof HTMLElement) {
      const tree = getAccessibleTree(received);

      if (tree === null) {
        return {
          message: () => 'Failed to get accessible tree',
          pass: false,
        };
      }

      const flatTree = flattenA11yTree(tree);

      if (flatTree === null) {
        return {
          message: () => 'Failed to flatten accessible tree',
          pass: false,
        };
      }

      received = flatTree;
    }

    const expectedResult = prepareA11yTreeNodeMatch(expected);

    // console.log('expected', expected.children[0]);
    // console.log('expected', matchToNode(received, expected)?.children);
    // console.log('received', received.children);

    // console.log('expected', expectedResult.children);
    // console.log('received', received.children);

    const pass = this.equals(received, expectedResult, [
      staticTextMatcher,
      treeNodeMatcher,
    ]);

    // console.log('pass', pass);

    const expectedPreparedForDiff = matchToNode(received, expected);

    // console.log('expected', expectedPreparedForDiff);

    const expectedPrettyTree = getPrettyTree(expectedPreparedForDiff);
    const receivedPrettyTree = getPrettyTree(received);

    // console.log('expected', expectedPrettyTree);
    // console.log('received', receivedPrettyTree);

    if (pass) {
      return {
        message: () =>
          `${this.utils.diff(expectedPrettyTree, receivedPrettyTree)}`,
        pass: true,
      };
    }

    return {
      message: () =>
        `${this.utils.diff(expectedPrettyTree, receivedPrettyTree)}`,
      pass: false,
    };
  },
});
