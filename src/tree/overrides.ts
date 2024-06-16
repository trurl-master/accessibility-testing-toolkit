import { isSummaryElement } from '../type-guards';
import { isClosedDetails } from './context';

/**
 * When an element is inside a closed details element, it is not exposed in the accessibility tree.
 * Except if it's the summary element.
 */
export const isContentInsideClosedDetails = (element: HTMLElement | Text) => {
  const parent = element.parentElement;

  if (!parent) {
    return false;
  }

  return (
    isClosedDetails(parent) &&
    (element instanceof HTMLElement ? !isSummaryElement(element) : true)
  );
};

export const isInaccessibleOverride = (element: HTMLElement | Text) => {
  return isContentInsideClosedDetails(element);
};
