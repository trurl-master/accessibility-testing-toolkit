import { StaticText } from './tree/leafs';
import {
  A11yTreeForDiff,
  A11yTreeNode,
  A11yTreeNodeQueries,
  A11yTreeNodeQueriesForDiff,
  A11yTreeNodeState,
} from './types/types';
import _deepClone from 'lodash.clonedeep';
import _isEqual from 'lodash.isequal';

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

export const nonDefaultState: A11yTreeNodeState = {
  busy: true,
  checked: true,
  current: true,
  disabled: true,
  expanded: true,
  pressed: true,
  selected: true,
};

export const getDefaultState = (): A11yTreeNodeState =>
  _deepClone(defaultState);

export const getNonDefaultState = (): A11yTreeNodeState =>
  _deepClone(nonDefaultState);

export const defaultQueries: A11yTreeNodeQueries = {
  level: undefined,
  value: {
    min: undefined,
    max: undefined,
    now: undefined,
    text: undefined,
  },
};

export const nonDefaultQueries: A11yTreeNodeQueries = {
  level: 1,
  value: {
    min: 1,
    max: 1,
    now: 1,
    text: 'text',
  },
};

export const getDefaultQueries = (): A11yTreeNodeQueries =>
  _deepClone(defaultQueries);

export const getNonDefaultQueries = (): A11yTreeNodeQueries =>
  _deepClone(nonDefaultQueries);

export const isDefaultState = (state: A11yTreeNodeState): boolean => {
  return _isEqual(state, defaultState);
};

export const isDefaultQueries = (
  queries: A11yTreeNodeQueries | A11yTreeNodeQueriesForDiff
): boolean => {
  return _isEqual(queries, defaultQueries);
};

export const isDefaultAttributeValues = (
  node: A11yTreeNode | A11yTreeForDiff
): boolean => {
  return Object.entries(containerAttributeValues).every(
    ([key, value]) =>
      value === node[key as keyof typeof containerAttributeValues]
  );
};

export const isContainer = (node: A11yTreeNode): boolean => {
  return (
    isDefaultAttributeValues(node) &&
    isDefaultState(node.state) &&
    isDefaultQueries(node.queries)
  );
};

export function hasSingleStaticTextChild(tree: A11yTreeForDiff): boolean {
  return tree?.children?.length === 1 && tree.children[0] instanceof StaticText;
}
