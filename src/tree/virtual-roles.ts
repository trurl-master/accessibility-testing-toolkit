import { RoleMatcher } from '../types/types';

// if child of <main>, <nav>, <aside>, <article>, or <section>
export const nonLandmarkVirtualRoles: RoleMatcher[] = [
  // https://w3c.github.io/html-aria/#el-header
  // header: 'HeaderAsNonLandmark',
  {
    match: (node: HTMLElement) => {
      return node.tagName.toLowerCase() === 'header';
    },
    roles: ['HeaderAsNonLandmark'],
    specificity: 1,
  },
  // https://w3c.github.io/html-aria/#el-footer
  // footer: 'FooterAsNonLandmark',
  {
    match: (node: HTMLElement) => node.tagName.toLowerCase() === 'footer',
    roles: ['FooterAsNonLandmark'],
    specificity: 1,
  },
];

export const nonListListItemRoles: RoleMatcher[] = [
  // li: 'generic',
  // https://www.w3.org/TR/wai-aria-1.2/#listitem
  {
    match: (node: HTMLElement) => node.tagName.toLowerCase() === 'li',
    roles: ['generic'],
    specificity: 1,
  },
];

/**
 * Override certain roles to be more specific.
 * Similar to how Google Chrome devtools does it.
 */
export const virtualRoles: RoleMatcher[] = [
  // details: 'Details',
  {
    match: (node: HTMLElement) => node.tagName.toLowerCase() === 'details',
    roles: ['Details'],
    specificity: 1,
  },
  // dd: 'DescriptionListDetails',
  {
    match: (node: HTMLElement) => node.tagName.toLowerCase() === 'dd',
    roles: ['DescriptionListDetails'],
    specificity: 1,
  },
  // dl: 'DescriptionList',
  {
    match: (node: HTMLElement) => node.tagName.toLowerCase() === 'dl',
    roles: ['DescriptionList'],
    specificity: 1,
  },
  // dt: 'DescriptionListTerm',
  {
    match: (node: HTMLElement) => node.tagName.toLowerCase() === 'dt',
    roles: ['DescriptionListTerm'],
    specificity: 1,
  },
  // embed: 'EmbeddedObject',
  {
    match: (node: HTMLElement) => node.tagName.toLowerCase() === 'embed',
    roles: ['EmbeddedObject'],
    specificity: 1,
  },
  // object: 'PluginObject',
  {
    match: (node: HTMLElement) => node.tagName.toLowerCase() === 'object',
    roles: ['PluginObject'],
    specificity: 1,
  },
  // label: 'LabelText',
  {
    match: (node: HTMLElement) => node.tagName.toLowerCase() === 'label',
    roles: ['LabelText'],
    specificity: 1,
  },
  // summary: 'DisclosureTriangle',
  {
    match: (node: HTMLElement) => node.tagName.toLowerCase() === 'summary',
    roles: ['DisclosureTriangle'],
    specificity: 1,
  },
];
