import {
  A11yTreeForDiff,
  A11yTreeNode,
  A11yTreeNodeMatch,
} from './types/types';
import { StaticText } from './leafs';
import { getExpectedStringMatch } from './helpers';

const getReceivedName = (
  node: A11yTreeNode | StaticText | undefined,
): string => {
  if (node instanceof StaticText || !node) {
    return '';
  }

  return node.name;
};

const getReceivedRole = (
  node: A11yTreeNode | StaticText | undefined,
): string | undefined => {
  if (node instanceof StaticText || !node) {
    return '';
  }

  return node.role ?? undefined;
};

const getReceivedDescription = (
  node: A11yTreeNode | StaticText | undefined,
): string => {
  if (node instanceof StaticText || !node) {
    return '';
  }

  return node.description;
};

const getReceivedState = (
  node: A11yTreeNode | StaticText | undefined,
): A11yTreeNode['state'] => {
  if (node instanceof StaticText || !node) {
    return {};
  }

  return node.state;
};

const getReceivedChildren = (
  node: A11yTreeNode | StaticText | undefined,
): (A11yTreeNode | StaticText)[] => {
  if (node instanceof StaticText || !node) {
    return [];
  }

  return node.children ?? [];
};

// Recursively replaces values from received tree with values from expected tree
// where expected tree has a value for a given key. Replaces text by StaticText nodes where possible
export const matchToNode = (
  received: A11yTreeNode | StaticText | undefined,
  expected: A11yTreeNodeMatch | undefined,
): A11yTreeForDiff | undefined => {
  // const name = expected?.name ? expected.name : getReceivedName(received);
  const name = getExpectedStringMatch(
    getReceivedName(received),
    expected?.name,
  );

  const role = expected?.role ?? getReceivedRole(received);

  // const description = expected?.description
  //   ? expected.description
  //   : getReceivedDescription(received);
  const description = getExpectedStringMatch(
    getReceivedDescription(received),
    expected?.description,
  );

  const state = {
    ...getReceivedState(received),
    ...expected?.state,
  };

  const receivedChildren = getReceivedChildren(received);
  const expectedChildren = expected?.children;

  if (!expectedChildren) {
    return {
      role,
      name,
      description,
      state,
      children: receivedChildren,
    };
  }

  const maxOfChildrenLengths = Math.max(
    expected?.children?.length ?? 0,
    receivedChildren.length ?? 0,
  );

  const children = Array.from({ length: maxOfChildrenLengths })
    .map((_, index) => {
      const receivedChild = receivedChildren[index];
      const expectedChild = expected?.children?.[index];

      // console.log('receivedChild', receivedChild);
      // console.log('expectedChild', expectedChild);

      if (typeof expectedChild === 'string') {
        return new StaticText(expectedChild);
      }

      if (expectedChild instanceof RegExp) {
        if (
          receivedChild instanceof StaticText &&
          receivedChild.text &&
          expectedChild.test(receivedChild.text)
        ) {
          return receivedChild;
        }

        return expectedChild;
      }

      if (expectedChild === undefined) {
        if (name && maxOfChildrenLengths === 1) {
          if (name instanceof RegExp) {
            return name;
          }

          return new StaticText(name);
        }

        return undefined;
      }

      return matchToNode(receivedChild, expectedChild);
    })
    .filter(Boolean);

  const result: A11yTreeForDiff | undefined = expected
    ? {
        role,
        name,
        description,
        state,
        children,
      }
    : undefined;

  return result;
};
