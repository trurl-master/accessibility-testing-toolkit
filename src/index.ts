export { MatcherOptions } from './types/matchers.d';
import './matchers';
export * from './test-helpers';
export {
  AsNonLandmarkRoles,
  VirtualRoles,
  ARIARoleDefinitionKeyExtended,
  A11yTreeNodeState as A11yTreeState,
  A11yTreeNode,
  A11yTreeNodeMatch,
} from './types/types';
export { getAccessibilityTree } from './tree/accessibility-tree';
export { pruneContainerNodes as flattenAccessibilityTree } from './tree/prune-container-nodes';
