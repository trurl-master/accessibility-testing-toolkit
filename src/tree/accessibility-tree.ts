import {
  computeAriaBusy,
  computeAriaChecked,
  computeAriaCurrent,
  computeAriaExpanded,
  computeAriaPressed,
  computeAriaSelected,
  computeAriaValueMax,
  computeAriaValueMin,
  computeAriaValueNow,
  computeAriaValueText,
  computeHeadingLevel,
  computeRoles,
} from './compute-properties';

import { A11yTreeNode, A11yTreeNodeContext } from '../types/types';
import {
  computeAccessibleDescription,
  computeAccessibleName,
  isInaccessible,
  isDisabled,
} from 'dom-accessibility-api';
import { isDefined } from '../type-guards';
import { StaticText } from './leafs';
import { MatcherOptions } from '../types/matchers';
import { getConfig } from '../config';
import { isClosedDetails, isList, isNonLandmarkRole } from './context';
import { isInaccessibleOverride } from './overrides';

const defaultOptions = {
  isListSubtree: false,
  isClosedDetailsSubtree: false,
  isNonLandmarkSubtree: false,
} satisfies MatcherOptions;

export const getAccessibilityTree = (
  element: HTMLElement,
  {
    isListSubtree: userListSubtree = defaultOptions.isListSubtree,
    isClosedDetailsSubtree:
      userIsClosedDetailsSubtree = defaultOptions.isClosedDetailsSubtree,
    isNonLandmarkSubtree:
      userNonLandmarkSubtree = defaultOptions.isNonLandmarkSubtree,
    isInaccessibleOptions = getConfig().isInaccessibleOptions,
  }: MatcherOptions = defaultOptions
): A11yTreeNode | null => {
  function assembleTree(
    element: HTMLElement,
    context: A11yTreeNodeContext
  ): A11yTreeNode | null {
    if (
      isInaccessible(element, context.isInaccessibleOptions) ||
      isInaccessibleOverride(element)
    ) {
      return null;
    }

    const [role] = computeRoles(element, context);

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
        disabled: isDisabled(element),
        expanded: computeAriaExpanded(element),
        pressed: computeAriaPressed(element),
        selected: computeAriaSelected(element),
      },
      queries: {
        level: computeHeadingLevel(element),
        value: {
          min: computeAriaValueMin(element),
          max: computeAriaValueMax(element),
          now: computeAriaValueNow(element),
          text: computeAriaValueText(element),
        },
      },
      children: (childNodes ?? [])
        .map((child) => {
          if (child instanceof HTMLElement) {
            return assembleTree(child, {
              isListSubtree: context.isListSubtree || isList(role),
              isClosedDetailsSubtree:
                context.isClosedDetailsSubtree || isClosedDetails(element),
              isNonLandmarkSubtree:
                context.isNonLandmarkSubtree ||
                isNonLandmarkRole(element, role),
              isInaccessibleOptions,
            });
          }

          if (child instanceof Text) {
            if (child.textContent === null || isInaccessibleOverride(child)) {
              return undefined;
            }

            return new StaticText(child.textContent);
          }

          return undefined;
        })
        .filter(isDefined),
    };
  }

  return assembleTree(element, {
    isListSubtree: userListSubtree,
    isClosedDetailsSubtree: userIsClosedDetailsSubtree,
    isNonLandmarkSubtree: userNonLandmarkSubtree,
    isInaccessibleOptions,
  });
};
