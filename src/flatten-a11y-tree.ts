import { A11yTreeNode } from './types/types';
import { StaticText } from './leafs';
import { isContainer } from './helpers';

/**
 * Removes container nodes from the tree, flattening the tree.
 */
export const flattenA11yTree = (node: A11yTreeNode): A11yTreeNode => {
  // Inner helper function to recursively flatten the tree except the root node
  const flatten = (
    children: (A11yTreeNode | StaticText)[],
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
      },
    );
  };

  // The root node is always preserved, but its children are flattened
  return { ...node, children: node.children ? flatten(node.children) : [] };
};

// export const flattenA11yTree = (node: A11yTreeNode): A11yTreeNode => {
//   // Use a helper function to flatten the tree recursively
//   const flattenChildren = (
//     node: Omit<A11yTreeNode, 'children'>,
//     children: (A11yTreeNode | StaticText)[],
//   ): (A11yTreeNode | StaticText)[] => {
//     return children.reduce(
//       (
//         acc: (A11yTreeNode | StaticText)[],
//         child: A11yTreeNode | StaticText,
//       ) => {
//         if (child instanceof StaticText) {
//           console.log('child instanceof StaticText', child);
//           acc.push(child);
//         } else if (isContainer(child) && !hasSingleStaticTextChild(child)) {
//           // If the child is a container and has more than one StaticText child, we only keep its children
//           acc.push(...flattenChildren(child, child.children ?? []));
//         } else {
//           // For non-container nodes, or containers with a single StaticText child, include the node with its flattened children
//           acc.push({
//             ...child,
//             children: child.children
//               ? flattenChildren(child, child.children)
//               : [],
//           });
//         }
//         return acc;
//       },
//       [],
//     );
//   };

//   // If node is an A11yTreeNode with children, flatten them
//   if (node.children) {
//     return {
//       ...node,
//       children: flattenChildren(node, node.children),
//     };
//   }

//   // If node has no children or is not a container, return as is
//   return node;
// };
