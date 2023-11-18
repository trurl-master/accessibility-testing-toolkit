import {
  A11yTreeForDiff,
  A11yTreeNode,
  A11yTreeNodeMatch,
  A11yTreeNodeQueriesForDiff,
  A11yTreeNodeStateForDiff,
  TextMatcher,
} from './types/types';
import { StaticText } from './tree/leafs';
import {
  defaultQueries,
  defaultState,
  getExpectedStringMatch,
} from './helpers';
import { isA11yTreeNode } from './type-guards';

const getReceivedName = (
  node: A11yTreeNode | StaticText | undefined
): string | undefined => {
  if (node instanceof StaticText || !node) {
    return undefined;
  }

  return node.name;
};

const getReceivedRole = (
  node: A11yTreeNode | StaticText | undefined
): string | undefined => {
  if (node instanceof StaticText || !node) {
    return '';
  }

  return node.role ?? undefined;
};

const getReceivedDescription = (
  node: A11yTreeNode | StaticText | undefined
): string | undefined => {
  if (node instanceof StaticText || !node) {
    return undefined;
  }

  return node.description;
};

const getReceivedChildren = (
  node: A11yTreeNode | StaticText | undefined
): (A11yTreeNode | StaticText)[] | undefined => {
  if (node instanceof StaticText || !node) {
    return undefined;
  }

  return node.children;
};

export const computeTextValue = (
  received: string | undefined,
  expected: TextMatcher | undefined,
  element: HTMLElement | null
): TextMatcher | undefined => {
  if (received === undefined) {
    return expected;
  }

  if (expected === undefined) {
    return received;
  }

  if (expected instanceof RegExp) {
    return expected.test(received) ? received : expected;
  }

  if (typeof expected === 'function') {
    return expected(received, element) ? received : expected;
  }

  if (typeof expected === 'string' || typeof expected === 'number') {
    return received === expected.toString() ? received : expected;
  }

  return undefined;
};

export const computeDiffState = (
  received: A11yTreeNode | StaticText | undefined,
  expected: A11yTreeNodeMatch | undefined
): A11yTreeNodeStateForDiff | undefined => {
  let state: A11yTreeNodeStateForDiff | undefined =
    received instanceof StaticText || !received
      ? undefined
      : {
          ...received.state,
        };

  if (expected?.state) {
    if (state === undefined) {
      state = {
        ...defaultState,
      };
    }

    state.busy = expected.state.busy ?? state.busy;
    state.checked = expected.state.checked ?? state.checked;
    state.current = expected.state.current ?? state.current;
    state.disabled = expected.state.disabled ?? state.disabled;
    state.expanded = expected.state.expanded ?? state.expanded;
    state.pressed = expected.state.pressed ?? state.pressed;
    state.selected = expected.state.selected ?? state.selected;
  }

  return state;
};

export const computeDiffQueries = (
  received: A11yTreeNode | StaticText | undefined,
  expected: A11yTreeNodeMatch | undefined,
  element: HTMLElement | null
): A11yTreeNodeQueriesForDiff | undefined => {
  let queries: A11yTreeNodeQueriesForDiff | undefined =
    received instanceof StaticText || !received
      ? undefined
      : {
          ...received.queries,
        };

  if (expected?.queries) {
    if (queries === undefined) {
      queries = {
        ...defaultQueries,
      };
    }

    queries.level = expected.queries.level;

    if (expected.queries.value !== undefined) {
      if (expected.queries.value.min !== undefined) {
        queries.value.min = expected.queries.value.min;
      }

      if (expected.queries.value.max !== undefined) {
        queries.value.max = expected.queries.value.max;
      }

      if (expected.queries.value.now !== undefined) {
        queries.value.now = expected.queries.value.now;
      }

      if (
        isA11yTreeNode(received) &&
        expected.queries.value.text !== undefined
      ) {
        queries.value.text = getExpectedStringMatch(
          received?.queries.value.text,
          expected.queries.value.text,
          element
        );
      }
    }
  }

  return queries;
};

// Recursively replaces values from received tree with values from expected tree
// where expected tree has a value for a given key. Replaces text by StaticText nodes where possible
export const matchToNode = (
  received: A11yTreeNode | StaticText | undefined,
  expected: A11yTreeNodeMatch | undefined
): A11yTreeForDiff | undefined => {
  if (!received && !expected) {
    return undefined;
  }

  const element = isA11yTreeNode(received) ? received.element : null;

  const role = expected?.role ?? getReceivedRole(received);

  const name = computeTextValue(
    getReceivedName(received),
    expected?.name,
    element
  );

  const description = computeTextValue(
    getReceivedDescription(received),
    expected?.description,
    element
  );

  const state = computeDiffState(received, expected);
  const queries = computeDiffQueries(received, expected, element);

  const receivedChildren = getReceivedChildren(received);
  const expectedChildren = expected?.children;

  const maxOfChildrenLengths = Math.max(
    expected?.children?.length ?? 0,
    receivedChildren?.length ?? 0
  );

  const children = Array.from({ length: maxOfChildrenLengths })
    .map((_, index) => {
      const receivedChild = receivedChildren?.[index];
      const expectedChild = expectedChildren?.[index];

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
          if (name instanceof RegExp || typeof name === 'function') {
            return name;
          }

          return new StaticText(
            typeof name === 'string' ? name : name.toString()
          );
        }

        return undefined;
      }

      return matchToNode(receivedChild, expectedChild);
    })
    .filter(Boolean);

  if (
    role === undefined ||
    name === undefined ||
    description === undefined ||
    state === undefined ||
    queries === undefined
  ) {
    return undefined;
  }

  const result: A11yTreeForDiff | undefined = expected
    ? {
        role,
        name,
        description,
        state,
        queries,
        children,
      }
    : undefined;

  return result;
};
