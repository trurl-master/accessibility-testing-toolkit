import { omitDefaultValues } from './omit-default-values';
import { NestedObject } from './types';

describe('omitDefaultValues', () => {
  it('should omit default values', () => {
    const targetObject: NestedObject = {
      a: 'value1',
      b: true,
      c: {
        d: 'subvalue1',
        e: 123,
      },
      f: /\d+/g,
      g: (content: string) => content.includes('match'),
      h: undefined,
    };

    const defaultObject: NestedObject = {
      a: 'default',
      b: false,
      c: {
        d: 'default',
        e: 0,
      },
      f: /\d+/,
      g: undefined,
      h: undefined,
    };

    expect(
      JSON.stringify(omitDefaultValues(targetObject, defaultObject))
    ).toEqual(
      JSON.stringify({
        a: 'value1',
        b: true,
        c: {
          d: 'subvalue1',
          e: 123,
        },
        f: /\d+/g,
        g: (content: string) => content.includes('match'),
      })
    );
  });
});
