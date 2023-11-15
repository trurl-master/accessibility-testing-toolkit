import { ARIARoleDefinitionKey } from 'aria-query';
import { StaticText } from '../leafs';

export type AsNonLandmarkRoles = 'HeaderAsNonLandmark' | 'FooterAsNonLandmark';
export type VirtualRoles =
  | 'Details'
  | 'DescriptionListDetails'
  | 'DescriptionList'
  | 'DescriptionListTerm'
  | 'EmbeddedObject'
  | 'PluginObject'
  | 'LabelText'
  | 'DisclosureTriangle';

export type ARIARoleDefinitionKeyExtended =
  | ARIARoleDefinitionKey
  | AsNonLandmarkRoles
  | VirtualRoles;

export type RoleMatcher = {
  match: (node: HTMLElement) => boolean;
  roles: ARIARoleDefinitionKeyExtended[];
  specificity: number;
};

export type A11yTreeState = {
  busy?: boolean;
  checked?: boolean;
  current?: string | boolean;
  disabled?: boolean;
  expanded?: boolean;
  pressed?: boolean;
  selected?: boolean;
};

export type A11yTreeNode = {
  element: HTMLElement;
  name: string;
  role: HTMLElement['role'] | undefined;
  description: string;
  state: A11yTreeState;
  children?: (A11yTreeNode | StaticText)[];
};

export type A11yTreeNodeMatch = {
  name?: string | RegExp;
  role?: HTMLElement['role'];
  description?: string | RegExp;
  state?: Partial<A11yTreeState>;
  children?: (A11yTreeNodeMatch | string | RegExp)[];
};

export type A11yTreeForDiff = {
  name: string | RegExp;
  role: HTMLElement['role'] | undefined;
  description: string | RegExp;
  state: A11yTreeState;
  children?: (A11yTreeForDiff | StaticText | string | RegExp | undefined)[];
};
