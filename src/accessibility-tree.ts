import { isInaccessible } from '@testing-library/dom';
import {
  computeAriaBusy,
  computeAriaChecked,
  computeAriaCurrent,
  computeAriaExpanded,
  computeAriaPressed,
  computeAriaSelected,
  computeRoles,
} from './compute-properties';

import { A11yTreeNode } from './types/types';
import {
  computeAccessibleDescription,
  computeAccessibleName,
} from 'dom-accessibility-api';
import { isDefined } from './type-guards';
import { StaticText } from './leafs';

// if a descendant of an article, aside, main, nav or section element, or an element with role=article, complementary, main, navigation or region
const isNonLandmarkRole = (role: string) =>
  ['aricle', 'complementary', 'main', 'navigation', 'region'].includes(role);

type Options = {
  isNonLandmarkSubtree?: boolean;
};

const defaultOptions = {
  isNonLandmarkSubtree: false,
} satisfies Options;

export const getAccessibleTree = (
  element: HTMLElement,
  {
    isNonLandmarkSubtree:
      userNonLandmarkSubtree = defaultOptions.isNonLandmarkSubtree,
  }: Options = defaultOptions,
): A11yTreeNode | null => {
  // console.log(
  //   'node',
  //   isInaccessible(element) ? 'inaccessible' : 'accessible',
  //   computeRoles(element),
  //   element.childNodes.entries(),
  // );

  function assembleTree(
    element: HTMLElement,
    { nonLandmarkSubtree }: { nonLandmarkSubtree: boolean },
  ): A11yTreeNode | null {
    if (isInaccessible(element)) {
      return null;
    }

    const [role] = computeRoles(element, nonLandmarkSubtree);

    const childNodes = Array.from(element.childNodes);

    return {
      role,
      name: computeAccessibleName(element),
      description: computeAccessibleDescription(element),
      state: {
        busy: computeAriaBusy(element),
        checked: computeAriaChecked(element),
        current: computeAriaCurrent(element),
        disabled: (element as HTMLInputElement)?.disabled,
        expanded: computeAriaExpanded(element),
        pressed: computeAriaPressed(element),
        selected: computeAriaSelected(element),
      },
      children: (childNodes ?? [])
        .map((child) => {
          if (child instanceof HTMLElement) {
            return assembleTree(child, {
              nonLandmarkSubtree: nonLandmarkSubtree || isNonLandmarkRole(role),
            });
          }

          if (child instanceof Text) {
            return new StaticText(child.textContent);
          }
        })
        .filter(isDefined),
    };
  }

  return assembleTree(element, { nonLandmarkSubtree: userNonLandmarkSubtree });
};
