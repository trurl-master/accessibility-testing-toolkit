import { A11yTreeNodeMatch } from './types/types';

type NameDescriptionState = Omit<A11yTreeNodeMatch, 'role' | 'children'> &
  A11yTreeNodeMatch['state'];

function byRole(
  role: A11yTreeNodeMatch['role'],
  properties: NameDescriptionState
): A11yTreeNodeMatch;
function byRole(
  role: A11yTreeNodeMatch['role'],
  properties: NameDescriptionState,
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
    | NameDescriptionState
    | A11yTreeNodeMatch['children'],
  childrenIfProvided?: A11yTreeNodeMatch['children']
): A11yTreeNodeMatch {
  const a11yNode: A11yTreeNodeMatch = {
    role: role,
  };

  if (typeof nameOrPropertiesOrChildren === 'undefined') {
    // byRole with only role
    return a11yNode;
  } else if (
    // byRole with role and name
    typeof nameOrPropertiesOrChildren === 'string' ||
    nameOrPropertiesOrChildren instanceof RegExp
  ) {
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
    const { name, description, ...state } = nameOrPropertiesOrChildren;
    a11yNode.name = name;
    a11yNode.description = description;
    a11yNode.state = state;

    if (Array.isArray(childrenIfProvided)) {
      a11yNode.children = childrenIfProvided;
    }
  }

  return a11yNode;
}

export { byRole };
