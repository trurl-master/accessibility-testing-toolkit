import { type ARIARoleRelationConcept, elementRoles } from 'aria-query';
import { isInputElement } from '../type-guards';
import {
  RoleMatcher,
  ARIARoleDefinitionKeyExtended,
  A11yTreeNodeContext,
} from '../types/types';
import {
  nonLandmarkVirtualRoles,
  nonListListItemRoles,
  virtualRoles,
} from './virtual-roles';

const elementRoleList = buildElementRoleList(elementRoles);

function getImplicitAriaRoles(
  currentNode: HTMLElement,
  {
    isListSubtree,
    isNonLandmarkSubtree,
  }: Pick<A11yTreeNodeContext, 'isListSubtree' | 'isNonLandmarkSubtree'>
) {
  let result: ARIARoleDefinitionKeyExtended[] = [];

  // calculate implicit roles
  for (const { match, roles } of elementRoleList) {
    if (match(currentNode)) {
      result = [...roles];
      break;
    }
  }

  // override roles if list subtree
  if (!isListSubtree) {
    for (const { match, roles } of nonListListItemRoles) {
      if (match(currentNode)) {
        result = [...roles];
        break;
      }
    }
  }

  // override roles if non-landmark subtree
  if (isNonLandmarkSubtree) {
    for (const { match, roles } of nonLandmarkVirtualRoles) {
      if (match(currentNode)) {
        result = [...roles];
        break;
      }
    }
  }

  if (result.length === 0) {
    for (const { match, roles } of virtualRoles) {
      if (match(currentNode)) {
        result = [...roles];
        break;
      }
    }
  }

  return result;
}

type FixedConstraints = Array<'undefined' | 'unset' | '>1'>;

function buildElementRoleList(elementRolesMap: typeof elementRoles) {
  function makeElementSelector({ name, attributes }: ARIARoleRelationConcept) {
    return `${name}${(attributes ?? [])
      .map(({ name: attributeName, value, constraints = [] }) => {
        //
        const shouldNotExist =
          (constraints as FixedConstraints).indexOf('undefined') !== -1;
        if (shouldNotExist) {
          return `:not([${attributeName}])`;
        } else if (value) {
          return `[${attributeName}="${value}"]`;
        } else {
          return `[${attributeName}]`;
        }
      })
      .join('')}`;
  }

  function getSelectorSpecificity({
    attributes = [],
  }: ARIARoleRelationConcept) {
    return attributes.length;
  }

  function bySelectorSpecificity(
    { specificity: leftSpecificity }: { specificity: number },
    { specificity: rightSpecificity }: { specificity: number }
  ) {
    return rightSpecificity - leftSpecificity;
  }

  function match(element: ARIARoleRelationConcept) {
    let { attributes = [] } = element;

    // https://github.com/testing-library/dom-testing-library/issues/814
    const typeTextIndex = attributes.findIndex(
      (attribute) =>
        attribute.value &&
        attribute.name === 'type' &&
        attribute.value === 'text'
    );

    if (typeTextIndex >= 0) {
      // not using splice to not mutate the attributes array
      attributes = [
        ...attributes.slice(0, typeTextIndex),
        ...attributes.slice(typeTextIndex + 1),
      ];
    }

    const selector = makeElementSelector({ ...element, attributes });

    return (node: HTMLElement) => {
      if (typeTextIndex >= 0 && isInputElement(node) && node.type !== 'text') {
        return false;
      }

      return node.matches(selector);
    };
  }

  let result: RoleMatcher[] = [];

  // eslint bug here:
  // eslint-disable-next-line no-unused-vars
  for (const [element, roles] of elementRolesMap.entries()) {
    result = [
      ...result,
      {
        match: match(element),
        roles: Array.from(roles),
        specificity: getSelectorSpecificity(element),
      },
    ];
  }

  return result.sort(bySelectorSpecificity);
}

export { getImplicitAriaRoles };
