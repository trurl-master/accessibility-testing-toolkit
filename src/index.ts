export { MatcherOptions } from './types/matchers.d';
import './matchers';
export * from './helpers/by-role';
export {
  AsNonLandmarkRoles,
  VirtualRoles,
  ARIARoleDefinitionKeyExtended,
  A11yTreeNodeState,
  A11yTreeNode,
  A11yTreeNodeMatch,
} from './types/types';
export { getAccessibilityTree } from './tree/accessibility-tree';
export { pruneContainerNodes } from './tree/prune-container-nodes';
