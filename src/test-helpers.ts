import { isTextMatcher } from './type-guards';
import {
  A11yTreeNodeMatch,
  A11yTreeNodeQueriesMatch,
  A11yTreeNodeStateMatch,
} from './types/types';

type NameDescriptionStateQueries = Omit<
  A11yTreeNodeMatch,
  'role' | 'children'
> &
  A11yTreeNodeStateMatch &
  A11yTreeNodeQueriesMatch;

function anyObjectPropertiesAreDefined<
  ObjectTypeTemplate extends Record<string, unknown>,
>(obj: ObjectTypeTemplate): boolean {
  return Object.values(obj).some((value) => value !== undefined);
}

function byRole(
  role: A11yTreeNodeMatch['role'],
  properties: NameDescriptionStateQueries
): A11yTreeNodeMatch;
function byRole(
  role: A11yTreeNodeMatch['role'],
  properties: NameDescriptionStateQueries,
  children: A11yTreeNodeMatch['children']
): A11yTreeNodeMatch;
function byRole(
  role: A11yTreeNodeMatch['role'],
  children: A11yTreeNodeMatch['children']
): A11yTreeNodeMatch;
function byRole(
  role: A11yTreeNodeMatch['role'],
  name: string | RegExp
): A11yTreeNodeMatch;
function byRole(
  role: A11yTreeNodeMatch['role'],
  name: string | RegExp,
  children: A11yTreeNodeMatch['children']
): A11yTreeNodeMatch;
function byRole(role: A11yTreeNodeMatch['role']): A11yTreeNodeMatch;
function byRole(
  role: A11yTreeNodeMatch['role'],
  nameOrPropertiesOrChildren?:
    | string
    | RegExp
    | NameDescriptionStateQueries
    | A11yTreeNodeMatch['children'],
  childrenIfProvided?: A11yTreeNodeMatch['children']
): A11yTreeNodeMatch {
  const a11yNode: A11yTreeNodeMatch = {
    role: role,
  };

  if (typeof nameOrPropertiesOrChildren === 'undefined') {
    // byRole with only role
    return a11yNode;
  } else if (isTextMatcher(nameOrPropertiesOrChildren)) {
    a11yNode.name = nameOrPropertiesOrChildren;
    // Only assign children if they are provided
    if (Array.isArray(childrenIfProvided)) {
      a11yNode.children = childrenIfProvided;
    }
  }
  // byRole with role and children
  else if (Array.isArray(nameOrPropertiesOrChildren)) {
    a11yNode.children = nameOrPropertiesOrChildren;
  }
  // byRole with role and name/description/state or with role, name/description/state, and children
  else if (typeof nameOrPropertiesOrChildren === 'object') {
    const { name, description, ...stateAndQueries } =
      nameOrPropertiesOrChildren;
    a11yNode.name = name;
    a11yNode.description = description;
    const { level, value, ...state } = stateAndQueries;
    const queries = { level, value };
    a11yNode.state = anyObjectPropertiesAreDefined(state) ? state : undefined;
    a11yNode.queries = anyObjectPropertiesAreDefined(queries)
      ? queries
      : undefined;

    if (Array.isArray(childrenIfProvided)) {
      a11yNode.children = childrenIfProvided;
    }
  }

  return a11yNode;
}

export { byRole };
