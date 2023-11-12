import { defaultState } from './helpers';
import { StaticText } from './leafs';
import { A11yTreeForDiff, A11yTreeState } from './types/types';

const getStateDetails = (state: A11yTreeState): string => {
  const nonDefaultEntries = Object.entries(state).filter(
    ([key, value]) => value !== defaultState[key as keyof A11yTreeState],
  );
  return nonDefaultEntries.length > 0
    ? `{ ${nonDefaultEntries
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ')} }`
    : '';
};

const renderStringMatcher = (str: string | RegExp): string => {
  if (str instanceof RegExp) {
    return str.toString();
  }
  return `"${str}"`;
};

export const getPrettyTree = (
  tree: A11yTreeForDiff | StaticText | string | RegExp | undefined,
  depth = 0,
): string => {
  const indentation = '  '.repeat(depth);

  // Handling StaticText and string directly
  if (typeof tree === 'string') {
    return `${indentation}"${tree}"\n`;
  }
  if (tree instanceof RegExp) {
    return `${indentation}${tree.toString()}\n`;
  }
  if (tree instanceof StaticText) {
    return `${indentation}StaticText "${tree.text}"\n`;
  }
  if (tree === undefined) {
    return `${indentation}undefined\n`;
  }

  // If it's just a container wrapping a single StaticText child, print it as StaticText
  // if (isContainer(tree) && hasSingleStaticTextChild(tree)) {
  //   const childText = (tree.children?.[0] as StaticText).text;
  //   return `${indentation}StaticText "${childText}"\n`;
  // }

  // Omitting the name if it's empty
  const nameString = tree.name ? ` ${renderStringMatcher(tree.name)}` : '';
  const stateString = getStateDetails(tree.state);

  let output = `${indentation}${tree.role}${nameString}${
    stateString ? ' ' + stateString : ''
  }\n`;

  // Only including the description if it's present
  if (tree.description) {
    output += `${indentation}  description: ${renderStringMatcher(
      tree.description,
    )}\n`;
  }

  // Handling children, excluding the scenario where it's just a StaticText child that matches the container node's name
  if (tree.children /* && !hasSingleStaticTextChild(tree) */) {
    tree.children.forEach((child) => {
      output += getPrettyTree(child, depth + 1);
    });
  }

  return output;
};

// const getPrettyTree = (
//   tree: A11yTreeForDiff | StaticText | string | undefined,
//   depth = 0,
// ): string => {
//   if (typeof tree === 'string' || tree === undefined) {
//     return `${'  '.repeat(depth)}"${tree}"\n`;
//   }
//   if (tree instanceof StaticText) {
//     return `${'  '.repeat(depth)}StaticText "${tree.text}"\n`;
//   }

//   // Omitting the name if it's empty
//   const nameString = tree.name ? ` "${tree.name}"` : '';
//   const stateString = getStateDetails(tree.state);
//   const role = tree.role || 'generic'; // Assuming 'generic' as a default role if undefined
//   const indentation = '  '.repeat(depth);
//   let output = `${indentation}${role}${nameString}${
//     stateString ? ' ' + stateString : ''
//   }\n`;

//   // Only including the description if it's present
//   if (tree.description) {
//     output += `${indentation}  description: "${tree.description}"\n`;
//   }

//   // Handling children, excluding single StaticText that matches the node's name
//   const hasSingleStaticTextChildMatchingName =
//     tree.children?.length === 1 &&
//     tree.children[0] instanceof StaticText &&
//     tree.children[0].text === tree.name;

//   if (tree.children && !hasSingleStaticTextChildMatchingName) {
//     tree.children.forEach((child) => {
//       output += getPrettyTree(child, depth + 1);
//     });
//   }

//   return output;
// };
