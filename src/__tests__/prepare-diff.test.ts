import {
  getDefaultQueries,
  getDefaultState,
  getNonDefaultQueries,
  getNonDefaultState,
} from '../helpers';
import { StaticText } from '../tree/leafs';
import {
  computeDiffState,
  computeDiffQueries,
  computeTextValue,
  matchToNode,
} from '../prepare-diff';

describe('prepare-diff', () => {
  describe('computeTextValue', () => {
    it('returns undefined if received is undefined, and expected is undefined', () => {
      expect(computeTextValue(undefined, undefined, null)).toBeUndefined();
    });

    it('returns received if received is defined, and expected is undefined', () => {
      expect(computeTextValue('foo', undefined, null)).toBe('foo');
    });

    it('returns expected if received is undefined, and expected is defined', () => {
      expect(computeTextValue(undefined, 'foo', null)).toBe('foo');
    });

    it('returns expected if received is defined, and expected is defined', () => {
      expect(computeTextValue('foo', 'bar', null)).toBe('bar');
    });

    it('returns expected if received is defined, and expected is a RegExp', () => {
      const regexp = /bar/;
      expect(computeTextValue('foo', regexp, null)).toBe(regexp);
    });

    it('returns received if received is defined, and expected is a RegExp and received matches it', () => {
      expect(computeTextValue('foo', /foo/, null)).toBe('foo');
    });

    it('returns expected if received is defined, and expected is a function and it returns true', () => {
      expect(computeTextValue('foo', (text) => text === 'foo', null)).toBe(
        'foo'
      );
    });

    it('returns expected if received is defined, and expected is a function and it returns false', () => {
      const fn = (text: string) => text === 'bar';

      expect(computeTextValue('foo', fn, null)).toBe(fn);
    });
  });

  describe('computeDiffState', () => {
    it('returns undefined if received is undefined, and expected is undefined', () => {
      expect(computeDiffState(undefined, undefined)).toBeUndefined();
    });

    it('returns undefined if received is StaticText, and expected is undefined', () => {
      expect(
        computeDiffState(new StaticText('foo'), undefined)
      ).toBeUndefined();
    });

    it('returns expected if received is undefined and expected is defined', () => {
      expect(
        computeDiffState(undefined, {
          state: {
            busy: true,
            checked: true,
            current: 'page',
            disabled: true,
            expanded: true,
            pressed: true,
            selected: true,
          },
        })
      ).toEqual({
        busy: true,
        checked: true,
        current: 'page',
        disabled: true,
        expanded: true,
        pressed: true,
        selected: true,
      });
    });

    it('returns expected if received is StaticText and expected is defined', () => {
      expect(
        computeDiffState(new StaticText('foo'), {
          state: {
            busy: true,
            checked: true,
            current: 'page',
            disabled: true,
            expanded: true,
            pressed: true,
            selected: true,
          },
        })
      ).toEqual({
        busy: true,
        checked: true,
        current: 'page',
        disabled: true,
        expanded: true,
        pressed: true,
        selected: true,
      });
    });

    it('returns received if received is A11yTreeNode and expected is undefined', () => {
      expect(
        computeDiffState(
          {
            element: document.createElement('button'),
            role: 'button',
            name: '',
            description: '',
            state: getDefaultState(),
            queries: {
              level: 1,
              value: {
                min: 0,
                max: 100,
                now: 50,
                text: 'foo',
              },
            },
          },
          undefined
        )
      ).toEqual(getDefaultState());
    });

    it('replaces values from received with values from expected', () => {
      expect(
        computeDiffState(
          {
            element: document.createElement('button'),
            role: 'button',
            name: '',
            description: '',
            state: getDefaultState(),
            queries: getDefaultQueries(),
          },
          {
            state: {
              busy: true,
              checked: true,
              current: 'page',
              disabled: true,
              expanded: true,
              pressed: true,
              selected: true,
            },
          }
        )
      ).toEqual({
        busy: true,
        checked: true,
        current: 'page',
        disabled: true,
        expanded: true,
        pressed: true,
        selected: true,
      });
    });
  });

  describe('computeDiffQueries', () => {
    it('returns undefined if received is undefined, and expected is undefined', () => {
      expect(computeDiffQueries(undefined, undefined, null)).toBeUndefined();
    });

    it('returns undefined if received is StaticText, and expected is undefined', () => {
      expect(
        computeDiffQueries(new StaticText('foo'), undefined, null)
      ).toBeUndefined();
    });

    it('returns expected if received is undefined and expected is defined', () => {
      expect(
        computeDiffQueries(undefined, { queries: getNonDefaultQueries() }, null)
      ).toEqual({
        level: 1,
        value: {
          min: 1,
          max: 1,
          now: 1,
          text: 'text',
        },
      });
    });

    it('returns expected if received is StaticText and expected is defined', () => {
      expect(
        computeDiffQueries(
          new StaticText('foo'),
          { queries: { level: 1 } },
          null
        )
      ).toEqual({
        level: 1,
        value: {
          min: undefined,
          max: undefined,
          now: undefined,
          text: undefined,
        },
      });
    });

    it('returns received if received is A11yTreeNode and expected is undefined', () => {
      expect(
        computeDiffQueries(
          {
            element: document.createElement('button'),
            role: 'button',
            name: '',
            description: '',
            state: getDefaultState(),
            queries: {
              level: 1,
              value: {
                min: 0,
                max: 100,
                now: 50,
                text: 'foo',
              },
            },
          },
          undefined,
          null
        )
      ).toStrictEqual({
        level: 1,
        value: {
          min: 0,
          max: 100,
          now: 50,
          text: 'foo',
        },
      });
    });

    it('replaces values from received with values from expected', () => {
      expect(
        computeDiffQueries(
          {
            element: document.createElement('button'),
            role: 'button',
            name: '',
            description: '',
            state: getDefaultState(),
            queries: {
              level: 1,
              value: {
                min: 0,
                max: 100,
                now: 50,
                text: 'foo',
              },
            },
          },
          {
            queries: {
              level: 2,
              value: {
                min: 10,
                max: 200,
                now: 100,
                text: 'bar',
              },
            },
          },
          null
        )
      ).toEqual({
        level: 2,
        value: {
          min: 10,
          max: 200,
          now: 100,
          text: 'bar',
        },
      });
    });
  });

  describe('matchToNode', () => {
    it('returns undefined if received is undefined, and expected is undefined', () => {
      expect(matchToNode(undefined, undefined)).toBeUndefined();
    });

    it('returns expected if received is undefined and expected is defined', () => {
      expect(
        matchToNode(undefined, {
          role: 'button',
          name: 'Click me',
          description: 'A button that can be clicked',
          state: getNonDefaultState(),
          queries: getNonDefaultQueries(),
        })
      ).toEqual({
        role: 'button',
        name: 'Click me',
        description: 'A button that can be clicked',
        state: getNonDefaultState(),
        queries: getNonDefaultQueries(),
        children: [],
      });
    });

    it('returns received if received is A11yTreeNode and expected is undefined', () => {
      expect(
        matchToNode(
          {
            element: document.createElement('button'),
            role: 'button',
            name: '',
            description: '',
            state: getDefaultState(),
            queries: getDefaultQueries(),
          },
          undefined
        )
      ).toStrictEqual({
        role: 'button',
        name: '',
        description: '',
        state: getDefaultState(),
        queries: getDefaultQueries(),
        children: [],
      });
    });

    it('replaces values from received with values from expected', () => {
      expect(
        matchToNode(
          {
            element: document.createElement('button'),
            role: 'button',
            name: '',
            description: '',
            state: getDefaultState(),
            queries: getDefaultQueries(),
          },
          {
            role: 'button',
            name: 'Click me',
            description: 'A button that can be clicked',
            state: {
              busy: true,
              checked: true,
              current: 'page',
              disabled: true,
              expanded: true,
              pressed: true,
              selected: true,
            },
            queries: {
              level: 2,
              value: {
                min: 10,
                max: 200,
                now: 100,
                text: 'bar',
              },
            },
          }
        )
      ).toEqual({
        role: 'button',
        name: 'Click me',
        description: 'A button that can be clicked',
        state: {
          busy: true,
          checked: true,
          current: 'page',
          disabled: true,
          expanded: true,
          pressed: true,
          selected: true,
        },
        queries: {
          level: 2,
          value: {
            min: 10,
            max: 200,
            now: 100,
            text: 'bar',
          },
        },
        children: [],
      });
    });
  });
});
