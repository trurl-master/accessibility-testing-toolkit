import { A11yTreeNode, A11yTreeNodeMatch } from './types/types';
import { getAccessibilityTree } from './tree/accessibility-tree';
import { pruneContainerNodes } from './tree/prune-container-nodes';

import { matchToNode } from './prepare-diff';
import { getPrettyTree } from './pretty-tree';
import { MatcherOptions } from './types/matchers';
import { nodeTester } from './testers/node';

expect.extend({
  toHaveA11yTree(
    received: HTMLElement | A11yTreeNode,
    expected: A11yTreeNodeMatch,
    options?: MatcherOptions
  ) {
    if (received instanceof HTMLElement) {
      const tree = getAccessibilityTree(received, options);

      if (tree === null) {
        return {
          message: () => 'Failed to get accessible tree',
          pass: false,
        };
      }

      const flatTree = pruneContainerNodes(tree);

      if (flatTree === null) {
        return {
          message: () => 'Failed to flatten accessible tree',
          pass: false,
        };
      }

      received = flatTree;
    }

    const pass = nodeTester(received, expected);

    const expectedPreparedForDiff = matchToNode(received, expected);

    const receivedPrettyTree = getPrettyTree(received);
    const expectedPrettyTree = getPrettyTree(expectedPreparedForDiff);

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
