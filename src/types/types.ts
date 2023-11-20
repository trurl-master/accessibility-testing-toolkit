import type { ARIARoleDefinitionKey } from 'aria-query';
import type { StaticText } from '../tree/leafs';
import type { IsInaccessibleOptions } from 'dom-accessibility-api';

export type AsNonLandmarkRoles = 'HeaderAsNonLandmark' | 'FooterAsNonLandmark';
export type VirtualRoles =
  | 'Abbr'
  | 'Audio'
  | 'Canvas'
  | 'Details'
  | 'DescriptionListDetails'
  | 'DescriptionList'
  | 'DescriptionListTerm'
  | 'DisclosureTriangle'
  | 'EmbeddedObject'
  | 'Figcaption'
  | 'PluginObject'
  | 'LabelText'
  | 'LineBreak'
  | 'Video';

export type ARIARoleDefinitionKeyExtended =
  | ARIARoleDefinitionKey
  | AsNonLandmarkRoles
  | VirtualRoles;

export type RoleMatcher = {
  match: (node: HTMLElement) => boolean;
  roles: ARIARoleDefinitionKeyExtended[];
  specificity: number;
};

export type TextMatcherFunction = (
  content: string,
  element: Element | null
) => boolean;

export type TextMatcher = string | number | RegExp | TextMatcherFunction;

export type A11yTreeNodeContext = {
  isListSubtree?: boolean;
  isNonLandmarkSubtree?: boolean;
  isInaccessibleOptions?: IsInaccessibleOptions;
};

export type A11yTreeNodeState = {
  busy: boolean;
  checked?: boolean;
  current: string | boolean;
  disabled: boolean;
  expanded?: boolean;
  pressed?: boolean;
  selected?: boolean;
};

export type A11yTreeNodeQueries = {
  level?: number;
  value: {
    min?: number;
    max?: number;
    now?: number;
    text?: string;
  };
};

export type A11yTreeNode = {
  element: HTMLElement;
  role: HTMLElement['role'] | undefined;
  name: string;
  description: string;
  state: A11yTreeNodeState;
  queries: A11yTreeNodeQueries;
  children?: (A11yTreeNode | StaticText)[];
};

export type A11yTreeNodeStateMatch = Partial<A11yTreeNodeState>;

export type A11yTreeNodeQueriesMatch = {
  level?: number;
  value?: {
    min?: number;
    max?: number;
    now?: number;
    text?: TextMatcher;
  };
};

export type A11yTreeNodeMatch = {
  role?: HTMLElement['role'];
  name?: TextMatcher;
  description?: TextMatcher;
  state?: A11yTreeNodeStateMatch;
  queries?: A11yTreeNodeQueriesMatch;
  children?: (A11yTreeNodeMatch | string | RegExp)[];
};

export type A11yTreeNodeStateForDiff = A11yTreeNodeState;

export type A11yTreeNodeQueriesForDiff = {
  level?: number;
  value: {
    min?: number;
    max?: number;
    now?: number;
    text?: TextMatcher;
  };
};

export type A11yTreeForDiff = {
  name?: TextMatcher;
  role?: HTMLElement['role'] | undefined;
  description?: TextMatcher;
  state?: A11yTreeNodeStateForDiff;
  queries?: A11yTreeNodeQueriesForDiff;
  children?: (
    | A11yTreeForDiff
    | StaticText
    | Exclude<TextMatcher, 'string' | 'number'>
    | undefined
  )[];
};
