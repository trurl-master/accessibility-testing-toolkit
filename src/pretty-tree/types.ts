import { TextMatcher } from '../types/types';

export type PropertyValue = boolean | undefined | TextMatcher | NestedObject;

export type NestedObject = {
  [key: string]: PropertyValue;
};
