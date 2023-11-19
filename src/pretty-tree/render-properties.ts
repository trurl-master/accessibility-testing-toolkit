import { NestedObject, PropertyValue } from './types';

const renderPropertyValue = (value: PropertyValue): string => {
  switch (typeof value) {
    case 'function':
      return 'Function';
    case 'number':
    case 'boolean':
      return String(value);
    case 'undefined':
      return '';
    case 'object':
      if (value instanceof RegExp) {
        return value.toString();
      }
      return '';
    default:
      return `"${value}"`;
  }
};

export const renderProperties = (obj: NestedObject, prefix = ''): string => {
  const keyValuePairs = Object.entries(obj).flatMap(([key, value]) => {
    if (value === undefined) {
      // Skip undefined values
      return [];
    }
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (
      typeof value === 'object' &&
      !(value instanceof RegExp) &&
      !(value instanceof Function)
    ) {
      // Recursively call renderProperties for nested objects
      return renderProperties(value as NestedObject, fullKey);
    } else {
      // Render non-object values
      const renderedValue = renderPropertyValue(value);
      return renderedValue ? `${fullKey}=${renderedValue}` : [];
    }
  });
  return keyValuePairs.join(' ');
};
