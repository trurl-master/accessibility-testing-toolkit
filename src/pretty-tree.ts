import { defaultState } from './helpers';
import { StaticText } from './tree/leafs';
import { A11yTreeForDiff, A11yTreeNodeState, TextMatcher } from './types/types';

const getStateDetails = (state: A11yTreeNodeState): string => {
  const nonDefaultEntries = Object.entries(state).filter(
    ([key, value]) => value !== defaultState[key as keyof A11yTreeNodeState]
  );

  return nonDefaultEntries.length > 0
    ? `{ ${nonDefaultEntries
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ')} }`
    : '';
};

const renderStringMatcher = (textMatcher: TextMatcher): string => {
  if (textMatcher instanceof RegExp || typeof textMatcher === 'number') {
    return textMatcher.toString();
  }

  if (typeof textMatcher === 'function') {
    return textMatcher.toString();
  }

  return `"${textMatcher}"`;
};

export const getPrettyTree = (
  tree: A11yTreeForDiff | StaticText | TextMatcher | undefined,
  depth = 0
): string => {
  const indentation = '  '.repeat(depth);

  if (typeof tree === 'string' || typeof tree === 'number') {
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

  if (typeof tree === 'function') {
    return `${indentation}${tree.toString()}\n`;
  }

  // Omitting the name if it's empty
  const nameString = tree.name ? ` ${renderStringMatcher(tree.name)}` : '';
  const stateString = getStateDetails(tree.state);

  let output = `${indentation}${tree.role}${nameString}${
    stateString ? ' ' + stateString : ''
  }\n`;

  // Only including the description if it's present
  if (tree.description) {
    output += `${indentation}  description: ${renderStringMatcher(
      tree.description
    )}\n`;
  }

  // Handling children, excluding the scenario where it's just a StaticText child that matches the container node's name
  if (tree.children) {
    tree.children.forEach((child) => {
      output += getPrettyTree(child, depth + 1);
    });
  }

  return output;
};
