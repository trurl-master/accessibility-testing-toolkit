import { A11yTreeNode, A11yTreeNodeMatch, TextMatcher } from './types/types';

// Element type guards
const isOptionElement = (element: HTMLElement): element is HTMLOptionElement =>
  element.tagName === 'OPTION';

const isInputElement = (element: HTMLElement): element is HTMLInputElement =>
  element.tagName === 'INPUT';

const isDetailsElement = (
  element: HTMLElement
): element is HTMLDetailsElement => element.tagName.toLowerCase() === 'details';

const isSummaryElement = (element: HTMLElement): element is HTMLElement =>
  element.tagName.toLowerCase() === 'summary';

const isDefined = <T>(value: T | undefined | null): value is T =>
  value !== undefined && value !== null;

const isStaticTextMatcher = (
  value: unknown
): value is string | RegExp | A11yTreeNodeMatch =>
  typeof value === 'string' || value instanceof RegExp;

const isA11yTreeNode = (value: unknown): value is A11yTreeNode =>
  typeof value === 'object' &&
  value !== null &&
  'name' in value &&
  'role' in value;

const isA11yTreeNodeMatch = (value: unknown): value is A11yTreeNodeMatch =>
  typeof value === 'object' &&
  value !== null &&
  ('name' in value ||
    'role' in value ||
    'description' in value ||
    'state' in value ||
    'children' in value);

const isTextMatcher = (value: unknown): value is TextMatcher =>
  typeof value === 'string' ||
  typeof value === 'number' ||
  value instanceof RegExp ||
  typeof value === 'function';

export {
  isOptionElement,
  isInputElement,
  isDetailsElement,
  isSummaryElement,
  isDefined,
  isStaticTextMatcher,
  isA11yTreeNode,
  isA11yTreeNodeMatch,
  isTextMatcher,
};
