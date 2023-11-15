export { MatcherOptions } from './types/matchers.d';
import './matchers';
export * from './test-helpers';
export {
  AsNonLandmarkRoles,
  VirtualRoles,
  ARIARoleDefinitionKeyExtended,
  A11yTreeState,
  A11yTreeNode,
  A11yTreeNodeMatch,
} from './types/types';
export { getAccessibilityTree } from './accessibility-tree';
export { pruneContainerNodes as flattenAccessibilityTree } from './prune-container-nodes';
