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
  isInaccessible,
} from 'dom-accessibility-api';
import { isDefined } from './type-guards';
import { StaticText } from './leafs';
import { MatcherOptions } from './types/matchers';

// if a descendant of an article, aside, main, nav or section element, or an element with role=article, complementary, main, navigation or region
const isNonLandmarkRole = (element: HTMLElement, role: string) =>
  ['article', 'aside', 'main', 'nav', 'section'].includes(
    element.tagName.toLowerCase()
  ) ||
  ['aricle', 'complementary', 'main', 'navigation', 'region'].includes(role);

const defaultOptions = {
  isNonLandmarkSubtree: false,
} satisfies MatcherOptions;

export const getAccessibilityTree = (
  element: HTMLElement,
  {
    isNonLandmarkSubtree:
      userNonLandmarkSubtree = defaultOptions.isNonLandmarkSubtree,
  }: MatcherOptions = defaultOptions
): A11yTreeNode | null => {
  function assembleTree(
    element: HTMLElement,
    { nonLandmarkSubtree }: { nonLandmarkSubtree: boolean }
  ): A11yTreeNode | null {
    if (isInaccessible(element)) {
      return null;
    }

    const [role] = computeRoles(element, nonLandmarkSubtree);

    const childNodes = Array.from(element.childNodes);

    return {
      element,
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
              nonLandmarkSubtree:
                nonLandmarkSubtree || isNonLandmarkRole(element, role),
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
