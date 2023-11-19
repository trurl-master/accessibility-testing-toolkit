import { NestedObject, PropertyValue } from './types';

function isNestedObject(value: PropertyValue): value is NestedObject {
  return (
    typeof value === 'object' && value !== null && !(value instanceof RegExp)
  );
}

// Function to filter non-default properties generically
export function omitDefaultValues<T extends NestedObject>(
  target: T,
  defaults: T
): Partial<T> {
  const filteredObject: NestedObject = {};

  Object.keys(target).forEach((key) => {
    const targetValue = target[key];
    const defaultValue = defaults[key];

    // Direct comparison for non-object types or if key is not in defaults
    if (targetValue !== defaultValue && targetValue !== undefined) {
      filteredObject[key] = targetValue;
    } else if (isNestedObject(targetValue) && isNestedObject(defaultValue)) {
      // If both values are objects, we need a recursive call
      // Note: The recursive call is cast to any because TypeScript can't infer the recursive type correctly here
      const result = omitDefaultValues(targetValue, defaultValue);
      if (Object.keys(result).length > 0) {
        filteredObject[key] = result; // Casting to any since TypeScript cannot infer that this is a correct subtype
      }
    }
  });

  return filteredObject as Partial<T>;
}

// import { NestedObject, PropertyValue } from './types';

// function isNestedObject(value: PropertyValue): value is NestedObject {
//   return (
//     typeof value === 'object' && value !== null && !(value instanceof RegExp)
//   );
// }

// function doValuesMatch(value1: PropertyValue, value2: PropertyValue): boolean {
//   if (isNestedObject(value1) && isNestedObject(value2)) {
//     return (
//       JSON.stringify(value1) ===
//       JSON.stringify(omitDefaultValues(value1, value2))
//     );
//   } else if (typeof value1 === 'function' || typeof value2 === 'function') {
//     // Functions are considered equal only if they are the same reference
//     return value1 === value2;
//   } else {
//     return value1 === value2;
//   }
// }

// export function omitDefaultValues(
//   target: NestedObject,
//   defaults: NestedObject
// ): NestedObject {
//   const filtered: NestedObject = {};
//   for (const key of Object.keys(target)) {
//     const targetValue = target[key];
//     const defaultValue = defaults[key];

//     if (!doValuesMatch(targetValue, defaultValue)) {
//       if (isNestedObject(targetValue) && isNestedObject(defaultValue)) {
//         const nestedFiltered = omitDefaultValues(targetValue, defaultValue);
//         if (Object.keys(nestedFiltered).length > 0) {
//           filtered[key] = nestedFiltered;
//         }
//       } else {
//         filtered[key] = targetValue;
//       }
//     }
//   }
//   return filtered;
// }
