import { StaticText } from './leafs';
import { A11yTreeForDiff, A11yTreeNode, A11yTreeState } from './types/types';

export const containerAttributeValues: Omit<
  A11yTreeNode,
  'element' | 'state' | 'children'
> = {
  name: '',
  role: 'generic',
  description: '',
};

export const defaultState: A11yTreeState = {
  busy: false,
  checked: undefined,
  current: false,
  disabled: undefined,
  expanded: undefined,
  pressed: undefined,
  selected: undefined,
};

export const isDefaultState = (state: A11yTreeState): boolean => {
  return Object.entries(state).every(
    ([key, value]) => value === defaultState[key as keyof A11yTreeState]
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
  return isDefaultAttributeValues(node) && isDefaultState(node.state);
};

export function hasSingleStaticTextChild(tree: A11yTreeForDiff): boolean {
  return tree?.children?.length === 1 && tree.children[0] instanceof StaticText;
}

export const getExpectedStringMatch = (
  receivedValue: string,
  expectedValue: string | RegExp | undefined
): string | RegExp => {
  // return expectedValue ? expectedValue : receivedValue;
  if (expectedValue === undefined) {
    return receivedValue;
  }

  if (expectedValue instanceof RegExp) {
    return expectedValue.test(receivedValue) ? receivedValue : expectedValue;
  }

  return expectedValue;
};
