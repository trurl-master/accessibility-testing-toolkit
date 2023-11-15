import { type ARIARoleRelationConcept, elementRoles } from 'aria-query';
import { isInputElement } from './type-guards';
import { RoleMatcher, ARIARoleDefinitionKeyExtended } from './types/types';
import { nonLandmarkVirtualRoles, virtualRoles } from './virtual-roles';

const elementRoleList = buildElementRoleList(elementRoles);

function getImplicitAriaRoles(
  currentNode: HTMLElement,
  isNonLandmarkSubtree: boolean
) {
  let result: ARIARoleDefinitionKeyExtended[] = [];

  // calculate implicit roles
  for (const { match, roles } of elementRoleList) {
    if (match(currentNode)) {
      result = [...roles];
      break;
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

// function getRoles(container: HTMLElement, { hidden = false } = {}) {
//   function flattenDOM(node) {
//     return [
//       node,
//       ...Array.from(node.children).reduce(
//         (acc, child) => [...acc, ...flattenDOM(child)],
//         [],
//       ),
//     ];
//   }

//   return flattenDOM(container)
//     .filter((element) => {
//       return hidden === false ? isInaccessible(element) === false : true;
//     })
//     .reduce((acc, node) => {
//       let roles = [];
//       // TODO: This violates html-aria which does not allow any role on every element
//       if (node.hasAttribute('role')) {
//         roles = node.getAttribute('role').split(' ').slice(0, 1);
//       } else {
//         roles = getImplicitAriaRoles(node);
//       }

//       return roles.reduce(
//         (rolesAcc, role) =>
//           Array.isArray(rolesAcc[role])
//             ? { ...rolesAcc, [role]: [...rolesAcc[role], node] }
//             : { ...rolesAcc, [role]: [node] },
//         acc,
//       );
//     }, {});
// }

// function prettyRoles(dom, { hidden, includeDescription }) {
//   const roles = getRoles(dom, { hidden });
//   // We prefer to skip generic role, we don't recommend it
//   return Object.entries(roles)
//     .filter(([role]) => role !== 'generic')
//     .map(([role, elements]) => {
//       const delimiterBar = '-'.repeat(50);
//       const elementsString = elements
//         .map((el) => {
//           const nameString = `Name "${computeAccessibleName(el, {
//             computedStyleSupportsPseudoElements:
//               getConfig().computedStyleSupportsPseudoElements,
//           })}":\n`;

//           const domString = prettyDOM(el.cloneNode(false));

//           if (includeDescription) {
//             const descriptionString = `Description "${computeAccessibleDescription(
//               el,
//               {
//                 computedStyleSupportsPseudoElements:
//                   getConfig().computedStyleSupportsPseudoElements,
//               },
//             )}":\n`;
//             return `${nameString}${descriptionString}${domString}`;
//           }

//           return `${nameString}${domString}`;
//         })
//         .join('\n\n');

//       return `${role}:\n\n${elementsString}\n\n${delimiterBar}`;
//     })
//     .join('\n');
// }

export {
  // getRoles,
  getImplicitAriaRoles,
  // isSubtreeInaccessible,
  // prettyRoles,
  // isInaccessible,
};
