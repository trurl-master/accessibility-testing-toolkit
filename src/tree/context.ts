import { isDetailsElement } from '../type-guards';

// if a descendant of an article, aside, main, nav or section element, or an element with role=article, complementary, main, navigation or region
export const isNonLandmarkRole = (element: HTMLElement, role: string) =>
  ['article', 'aside', 'main', 'nav', 'section'].includes(
    element.tagName.toLowerCase()
  ) ||
  ['aricle', 'complementary', 'main', 'navigation', 'region'].includes(role);

export const isList = (role: HTMLElement['role']) => role === 'list';

export const isClosedDetails = (element: HTMLElement) =>
  isDetailsElement(element) && !element.open;
