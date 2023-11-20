import { getImplicitAriaRoles } from './role-helpers';
import { isOptionElement, isDetailsElement } from '../type-guards';
import { A11yTreeNodeContext } from '../types/types';

function checkBooleanAttribute(element: HTMLElement, attribute: string) {
  const attributeValue = element.getAttribute(attribute);
  if (attributeValue === 'true') {
    return true;
  }
  if (attributeValue === 'false') {
    return false;
  }
  return undefined;
}

// type guards
/**
 * @param {Element} element -
 * @returns {boolean | undefined} - false/true if (not)selected, undefined if not selectable
 */
function computeAriaSelected(element: HTMLElement) {
  // implicit value from html-aam mappings: https://www.w3.org/TR/html-aam-1.0/#html-attribute-state-and-property-mappings
  // https://www.w3.org/TR/html-aam-1.0/#details-id-97
  if (isOptionElement(element)) {
    return element.selected;
  }

  // explicit value
  return checkBooleanAttribute(element, 'aria-selected');
}

/**
 * @param {Element} element -
 * @returns {boolean} -
 */
function computeAriaBusy(element: HTMLElement) {
  // https://www.w3.org/TR/wai-aria-1.1/#aria-busy
  return element.getAttribute('aria-busy') === 'true';
}

/**
 * @param {Element} element -
 * @returns {boolean | undefined} - false/true if (not)checked, undefined if not checked-able
 */
function computeAriaChecked(element: HTMLElement) {
  // implicit value from html-aam mappings: https://www.w3.org/TR/html-aam-1.0/#html-attribute-state-and-property-mappings
  // https://www.w3.org/TR/html-aam-1.0/#details-id-56
  // https://www.w3.org/TR/html-aam-1.0/#details-id-67
  if ('indeterminate' in element && element.indeterminate) {
    return undefined;
  }
  if ('checked' in element) {
    return element.checked as boolean;
  }

  // explicit value
  return checkBooleanAttribute(element, 'aria-checked');
}

/**
 * @param {Element} element -
 * @returns {boolean | undefined} - false/true if (not)pressed, undefined if not press-able
 */
function computeAriaPressed(element: HTMLElement) {
  // https://www.w3.org/TR/wai-aria-1.1/#aria-pressed
  return checkBooleanAttribute(element, 'aria-pressed');
}

/**
 * @param {Element} element -
 * @returns {boolean | string | null} -
 */
function computeAriaCurrent(element: HTMLElement) {
  // https://www.w3.org/TR/wai-aria-1.1/#aria-current
  return (
    checkBooleanAttribute(element, 'aria-current') ??
    element.getAttribute('aria-current') ??
    false
  );
}

/**
 * @param {Element} element -
 * @returns {boolean | undefined} - false/true if (not)expanded, undefined if not expand-able
 */
function computeAriaExpanded(element: HTMLElement) {
  // FIXME: this is not standard
  if (isDetailsElement(element)) {
    return element.open;
  }

  // https://www.w3.org/TR/wai-aria-1.1/#aria-expanded
  return checkBooleanAttribute(element, 'aria-expanded');
}

/**
 * @param {Element} element -
 * @returns {number | undefined} - number if implicit heading or aria-level present, otherwise undefined
 */
function computeHeadingLevel(element: HTMLElement) {
  // https://w3c.github.io/html-aam/#el-h1-h6
  const implicitHeadingLevels: Record<string, number> = {
    H1: 1,
    H2: 2,
    H3: 3,
    H4: 4,
    H5: 5,
    H6: 6,
  };
  // explicit aria-level value
  // https://www.w3.org/TR/wai-aria-1.2/#aria-level
  const ariaLevelAttribute =
    element.getAttribute('aria-level') &&
    Number(element.getAttribute('aria-level'));

  return ariaLevelAttribute || implicitHeadingLevels[element.tagName];
}

/**
 * @param {Element} element -
 * @returns {number | undefined} -
 */
function computeAriaValueNow(element: HTMLElement) {
  const valueNow = element.getAttribute('aria-valuenow');
  return valueNow === null ? undefined : +valueNow;
}

/**
 * @param {Element} element -
 * @returns {number | undefined} -
 */
function computeAriaValueMax(element: HTMLElement) {
  const valueMax = element.getAttribute('aria-valuemax');
  return valueMax === null ? undefined : +valueMax;
}

/**
 * @param {Element} element -
 * @returns {number | undefined} -
 */
function computeAriaValueMin(element: HTMLElement) {
  const valueMin = element.getAttribute('aria-valuemin');
  return valueMin === null ? undefined : +valueMin;
}

/**
 * @param {Element} element -
 * @returns {string | undefined} -
 */
function computeAriaValueText(element: HTMLElement) {
  const valueText = element.getAttribute('aria-valuetext');
  return valueText === null ? undefined : valueText;
}

function computeRoles(
  element: HTMLElement,
  context: Pick<A11yTreeNodeContext, 'isListSubtree' | 'isNonLandmarkSubtree'>
) {
  let roles = [];
  // TODO: This violates html-aria which does not allow any role on every element
  if (element.hasAttribute('role')) {
    roles = element.getAttribute('role')!.split(' ').slice(0, 1);
  } else {
    roles = getImplicitAriaRoles(element, context);
  }

  return roles;
}

export {
  computeAriaSelected,
  computeAriaBusy,
  computeAriaChecked,
  computeAriaPressed,
  computeAriaCurrent,
  computeAriaExpanded,
  computeAriaValueNow,
  computeAriaValueMax,
  computeAriaValueMin,
  computeAriaValueText,
  computeHeadingLevel,
  computeRoles,
};
