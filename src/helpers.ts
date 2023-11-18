import { StaticText } from './tree/leafs';
import {
  A11yTreeForDiff,
  A11yTreeNode,
  A11yTreeNodeQueries,
  A11yTreeNodeQueriesForDiff,
  A11yTreeNodeState,
  TextMatcher,
} from './types/types';

export const containerAttributeValues: Omit<
  A11yTreeNode,
  'element' | 'state' | 'queries' | 'children'
> = {
  name: '',
  role: 'generic',
  description: '',
};

export const defaultState: A11yTreeNodeState = {
  busy: false,
  checked: undefined,
  current: false,
  disabled: false,
  expanded: undefined,
  pressed: undefined,
  selected: undefined,
};

export const defaultQueries: A11yTreeNodeQueries = {
  level: undefined,
  value: {
    min: undefined,
    max: undefined,
    now: undefined,
    text: undefined,
  },
};

export const isDefaultState = (state: A11yTreeNodeState): boolean => {
  return Object.entries(state).every(
    ([key, value]) => value === defaultState[key as keyof A11yTreeNodeState]
  );
};

export const isDefaultQueries = (
  queries: A11yTreeNodeQueries | A11yTreeNodeQueriesForDiff
): boolean => {
  // deep equal queries
  return (
    queries.level === defaultQueries.level &&
    queries.value.min === defaultQueries.value.min &&
    queries.value.max === defaultQueries.value.max &&
    queries.value.now === defaultQueries.value.now &&
    queries.value.text === defaultQueries.value.text
  );
};

export const isDefaultAttributeValues = (
  node: A11yTreeNode | A11yTreeForDiff
): boolean => {
  return Object.entries(containerAttributeValues).every(
    ([key, value]) =>
      value === node[key as keyof typeof containerAttributeValues]
  );
};

export const isContainer = (node: A11yTreeNode | A11yTreeForDiff): boolean => {
  return (
    isDefaultAttributeValues(node) &&
    isDefaultState(node.state) &&
    isDefaultQueries(node.queries)
  );
};

export function hasSingleStaticTextChild(tree: A11yTreeForDiff): boolean {
  return tree?.children?.length === 1 && tree.children[0] instanceof StaticText;
}

export const getExpectedStringMatch = (
  receivedValue: string | undefined,
  expectedValue: TextMatcher | undefined,
  element: HTMLElement | null
): TextMatcher | undefined => {
  if (receivedValue === undefined) {
    return expectedValue;
  }

  if (expectedValue === undefined) {
    return receivedValue;
  }

  if (expectedValue instanceof RegExp) {
    return expectedValue.test(receivedValue) ? receivedValue : expectedValue;
  }

  if (typeof expectedValue === 'function') {
    return expectedValue(receivedValue, element)
      ? receivedValue
      : expectedValue;
  }

  return expectedValue;
};
