import { A11yTreeNode } from './types/types';
import { StaticText } from './leafs';
import { isContainer } from './helpers';

/**
 * Removes container nodes from the tree, flattening the tree.
 */
export const pruneContainerNodes = (node: A11yTreeNode): A11yTreeNode => {
  // Inner helper function to recursively flatten the tree except the root node
  const flatten = (
    children: (A11yTreeNode | StaticText)[]
  ): (A11yTreeNode | StaticText)[] => {
    return children.flatMap(
      (child: A11yTreeNode | StaticText): (A11yTreeNode | StaticText)[] => {
        if (child instanceof StaticText) {
          // StaticText is always preserved
          return [child];
        } else if (isContainer(child) && child.children) {
          // Replace container node with its children
          return flatten(child.children);
        } else if (child.children) {
          // The non-container node has children; it's preserved but its children are flattened
          return [{ ...child, children: flatten(child.children) }];
        } else {
          // A non-container node without children is preserved as is
          return [child];
        }
      }
    );
  };

  // The root node is always preserved, but its children are flattened
  return { ...node, children: node.children ? flatten(node.children) : [] };
};
