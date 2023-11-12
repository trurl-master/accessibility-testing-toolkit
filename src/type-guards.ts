import { A11yTreeNode, A11yTreeNodeMatch } from './types/types';

// Element type guards
const isOptionElement = (element: HTMLElement): element is HTMLOptionElement =>
  element.tagName === 'OPTION';

const HEADING_TAGS = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'] as const;
type HeadingTag = (typeof HEADING_TAGS)[number];
const isHeadingElement = (
  element: HTMLElement,
): element is HTMLHeadingElement =>
  HEADING_TAGS.includes(element.tagName as HeadingTag);

const isInputElement = (element: HTMLElement): element is HTMLInputElement =>
  element.tagName === 'INPUT';

const isDetailsElement = (
  element: HTMLElement,
): element is HTMLDetailsElement => element.tagName === 'DETAILS';

const isDefined = <T>(value: T | undefined | null): value is T =>
  value !== undefined && value !== null;

const isStaticTextMatcher = (
  value: unknown,
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

export {
  isOptionElement,
  HEADING_TAGS,
  HeadingTag,
  isHeadingElement,
  isInputElement,
  isDetailsElement,
  isDefined,
  isStaticTextMatcher,
  isA11yTreeNode,
  isA11yTreeNodeMatch,
};
